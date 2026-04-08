# Architecture

## Folder Structure

```
/
├── src/
│   └── ui/                          # React frontend (all TypeScript)
│       ├── features/                # Feature-based modules
│       │   ├── stats/               # Career dashboard, per-aircraft view
│       │   │   ├── components/
│       │   │   ├── statsSlice.ts    # Redux slice
│       │   │   └── index.tsx
│       │   ├── checklists/          # Checklist library, active checklist view
│       │   │   ├── components/
│       │   │   ├── checklistSlice.ts
│       │   │   └── index.tsx
│       │   ├── live-session/        # V2: session overlay, K/D, server
│       │   │   ├── components/
│       │   │   ├── sessionSlice.ts
│       │   │   └── index.tsx
│       │   └── map/                 # V2/V3: F10 map, waypoints
│       │       ├── components/
│       │       ├── mapSlice.ts
│       │       └── index.tsx
│       ├── components/              # Shared UI components
│       │   ├── AppLayout.tsx        # Root shell: sidebar + <Outlet />
│       │   ├── Sidebar.tsx          # Nav links with active state
│       │   └── ui/                  # Shadcn UI owned components
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       ├── dialog.tsx
│       │       ├── input.tsx
│       │       └── separator.tsx
│       ├── hooks/                   # Shared custom hooks
│       │   ├── store.ts             # Typed useAppDispatch / useAppSelector
│       │   ├── useACMIWatcher.ts    # MVP: listens for watcher events, triggers import pipeline
│       │   └── useDCSConnection.ts  # V1+: abstracts gRPC vs Export.lua
│       ├── store/                   # Redux store configuration
│       │   ├── index.ts             # configureStore, RootState, AppDispatch
│       │   └── appSlice.ts          # Shared state: acmiPath, pilotName, onboardingComplete, configLoaded
│       ├── lib/
│       │   └── tauri.ts             # ONLY file that calls invoke() or SQL plugin
│       ├── router.tsx               # React Router routes (all nested under AppLayout)
│       ├── main.tsx                 # App entry: Provider + RouterProvider
│       └── index.css                # Tailwind directives + dark-default CSS variables
│
├── src-tauri/                       # Tauri Rust backend
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── capabilities/
│   │   └── default.json             # Tauri permissions (core, opener, sql, dialog:allow-open)
│   └── src/
│       ├── main.rs                  # Entry point — calls lib::run()
│       ├── lib.rs                   # Plugin registration, command handler wiring
│       ├── commands/                # Tauri commands (called from frontend via tauri.ts)
│       │   ├── mod.rs
│       │   ├── config.rs            # ping() IPC check
│       │   └── acmi.rs              # parse_acmi command — delegates to acmi::parser
│       ├── acmi/                    # ACMI parsing module
│       │   ├── mod.rs               # Public types: ParsedAcmi, PilotFlight, ParsedEvent
│       │   └── parser.rs            # parse_acmi_file() — Tacview 2.x parser, two-tier kill attribution
│       ├── watcher.rs               # Folder watcher — notify v7 + debouncer-mini, WatcherState managed state
│       └── db/
│           ├── mod.rs               # Migration list for tauri-plugin-sql (v1 + v2)
│           └── schema.sql           # SQLite schema reference (flights, events, config)
│
├── checklists/                      # Bundled default checklist JSON files (V1)
│
├── docs/                            # Project documentation
│   ├── Architecture.md              # This file
│   ├── Changelog.md
│   ├── Project Status.md
│   └── features-docs/               # Per-feature implementation notes
│
└── scripts/                         # Dev tooling and setup scripts (future)
```

---

## Key Architectural Patterns

### Tauri Bridge (`src/ui/lib/tauri.ts`)

All communication between the React frontend and the Rust backend — and all direct plugin access (SQL, opener) — is routed through a single file. No component, hook, or slice calls `invoke()` or accesses `@tauri-apps/plugin-sql` directly.

```ts
// Pattern: typed wrapper functions
export const ping = () => invoke<string>("ping")
export const getConfig = (key: string) => /* SQL plugin query */
export const setConfig = (key: string, value: string) => /* SQL plugin upsert */
```

### ACMI Parser (`src-tauri/src/acmi/`)

Parses Tacview 2.x `.acmi` files on the Rust side. Returns structured data to the frontend via the `parse_acmi` Tauri command — the frontend then writes to SQLite using the TypeScript SQL API.

**Two-tier kill/death attribution:**
1. Explicit `Event=Kill|KillerID|VictimID` lines are processed first (most reliable)
2. Fallback: weapon–parent correlation — traces `Hit` events back through the `Parent` property chain to identify the originating pilot

**Multi-pilot recordings:** Parser returns *all* piloted aircraft (`pilots: Vec<PilotFlight>`). The frontend matches against the user's configured pilot name (case-insensitive). If no match, `PilotPickerDialog` is shown for manual selection.

**Import pipeline (TypeScript side in `tauri.ts`):** `importAcmiFile` → `matchPilot` → `insertFlight` + `insertEvents`. Returns an `ImportResult` discriminated union: `success | duplicate | needs_pilot_selection | error`.

### DCS Integration Abstraction (`useDCSConnection`) — V1+

The frontend never knows whether it is talking to gRPC or Export.lua. The hook detects the available integration, connects, and exposes a unified stream of sim state events. Feature slices subscribe to this hook.

### Folder Watcher (`src-tauri/src/watcher.rs`)

The Rust-side folder watcher uses `notify` v7 + `notify-debouncer-mini` to detect new `.acmi` files. It runs as a backend lifecycle service via Tauri managed state.

- **`WatcherState`** holds a `Mutex<Option<Debouncer<RecommendedWatcher>>>` (the active watcher) and a `Mutex<VecDeque<String>>` (pending file paths for missed-event recovery)
- Registered in the `setup()` hook so it persists across frontend reloads
- Commands: `start_watcher(path)`, `stop_watcher()`, `get_pending_files()`
- On detection: emits `acmi-file-detected` Tauri event to frontend; pushes path to pending queue
- 5-second debounce per file prevents parsing mid-write (DCS appends to ACMI files throughout a flight)
- Frontend hook `useACMIWatcher.ts` listens for events and drains the pending queue on mount

### Redux Slices — One Per Feature

| Slice | Location | State it owns |
|---|---|---|
| `appSlice` | `src/ui/store/appSlice.ts` | ACMI path, pilot name, onboarding state, config loaded flag |
| `statsSlice` | `src/ui/features/stats/statsSlice.ts` | Career stats, kill/death breakdowns, flight history, aircraft list, per-aircraft stats; four async thunks |
| `checklistSlice` | `src/ui/features/checklists/` (V1) | Active checklist, tick state |
| `sessionSlice` | `src/ui/features/live-session/` (V2) | Live K/D, server, elapsed time |
| `mapSlice` | `src/ui/features/map/` (V2/V3) | Player position, waypoints, contacts |

### SQLite / Database Layer

Database is managed by `tauri-plugin-sql`. Schema is applied via migrations on app startup.

- DB file location: resolved at runtime via `app_data_dir()` to `dcs-companion.db`
- Schema defined in `src-tauri/src/db/schema.sql`
- Migrations registered in `src-tauri/src/db/mod.rs`
- All frontend DB calls go through `src/ui/lib/tauri.ts`

### Tech Stack

| Layer | Technology |
|---|---|
| App shell | Tauri v2 |
| Frontend framework | React 19 + TypeScript |
| Routing | React Router v6 |
| State management | Redux Toolkit |
| Styling | Tailwind CSS v3 + Shadcn UI |
| Local database | SQLite via `tauri-plugin-sql` |
| File watching | `notify` v7 + `notify-debouncer-mini` v0.5 |
| Native dialogs | `tauri-plugin-dialog` v2 |
| DCS integration | DCS-gRPC (primary, V1+), Export.lua UDP (fallback, V1+) |
| Build tooling | Vite |
