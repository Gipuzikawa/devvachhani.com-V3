# Changelog

All notable changes to DCS Companion App are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.3.1] — 2026-03-31

### Fixed
- ACMI file detection: switched from filename-extension detection to **magic-byte detection** (`PK\x03\x04`) so zip-compressed `.acmi` files (Tacview's default format) are correctly decompressed regardless of extension
- Added UTF-16 LE BOM handling for ACMI files written by older Tacview versions (`0xFF 0xFE` prefix)
- Pilot name matching removed: `matchPilot` always returned null when no name was configured, blocking every import; parser now uses `pilots[0]` directly (pilot organisation deferred to a later version)
- SQLite write-lock contention: `useACMIWatcher.handleBatch` changed from concurrent to sequential `for...of` + `await`; prevents `"database is locked"` errors when importing multiple files
- Folder picker button: surfaced previously-swallowed errors with `folderError` state + loading indicator
- ACMI path now persists to SQLite + Redux immediately on pick; no longer lost on page navigation

### Added
- `scan_existing_acmi` Tauri command: reads all `.acmi`/`.acmi.zip` files already in the configured folder and returns their paths; called on hook mount so historical recordings import automatically without requiring a new file event
- `feature-docs/acmi-pipeline.md`: in-depth documentation of the full ACMI import pipeline with ASCII data flow diagram, format spec, object state machine, kill/death attribution logic, DB schema, and 7-step debug checklist
- Inline debug comments throughout `src-tauri/src/acmi/parser.rs` and `src-tauri/src/watcher.rs`

### Changed
- `OnboardingDialog`: stripped to single folder picker; auto-completes onboarding on pick (no manual confirm step)
- `SettingsPanel`: auto-saves folder on pick; no separate save button required
- `appSlice`: removed `pilotName` field; `onboardingComplete` now requires only `acmiPath`
- `src-tauri/capabilities/default.json`: added `sql:allow-execute` (not included in `sql:default`); without this all INSERT/UPDATE calls were silently blocked

---

## [0.3.0] — 2026-03-29

### Added
- Folder watcher (`src-tauri/src/watcher.rs`): Rust backend watches configured ACMI folder using `notify` v7 + `notify-debouncer-mini`; emits `acmi-file-detected` events to frontend with 5-second per-file debounce
- `WatcherState` Tauri managed state: holds debouncer handle + pending file queue for missed-event recovery across frontend hot-reloads
- Three new Tauri commands: `start_watcher`, `stop_watcher`, `get_pending_files`
- `useACMIWatcher` React hook: listens for watcher events, auto-imports detected files, drains pending queue on mount
- `tauri-plugin-dialog` integration: native folder picker via `open({ directory: true })`; `pickAcmiFolder()` wrapper in `tauri.ts`
- `OnboardingDialog` component: first-launch setup — pilot name input + ACMI folder picker; shown when either config value is missing
- `SettingsPanel` page (`/settings`): change pilot name and ACMI folder; restarts watcher on path change
- `appSlice` gains `pilotName` state field and `setPilotName` reducer; `setConfigLoaded` updated to hydrate both `acmiPath` and `pilotName`
- 6 SQL stat query functions in `tauri.ts`: `getCareerStats`, `getKillBreakdown`, `getDeathBreakdown`, `getFlightHistory`, `getAircraftList`, `getAircraftStats`
- `statsSlice` rewritten: full state shape with `career`, `killBreakdown`, `deathBreakdown`, `flights`, `hasMoreFlights`, `aircraftList`, `aircraftStats`; four `createAsyncThunk` thunks — `fetchCareerStats`, `fetchFlightHistory`, `fetchAircraftList`, `fetchAircraftStats`
- Career dashboard UI: `StatCard`, `KillBreakdownChart`, `DeathBreakdownChart`, `RecentFlights` components; dashboard renders stat grid + Tailwind bar charts + recent flights list
- `SessionHistory` page (`/stats/history`): paginated flight list with `FlightRow` expand/collapse; "Load More" pagination
- `AircraftSelector` page (`/stats/aircraft`): grid of aircraft cards derived from DB
- `AircraftStatsView` page (`/stats/aircraft/:name`): per-aircraft stat cards and breakdowns
- Sidebar restructured: Career Stats group with sub-items (Dashboard, Session History, Per-Aircraft) + Settings link at bottom

### Changed
- `StatsPage` (`stats/index.tsx`): now handles three states — config loading, onboarding needed, and full dashboard; auto-starts watcher and hydrates stats on mount
- `Sidebar.tsx`: flat `navItems` array replaced with grouped navigation using section header and indented sub-items
- `router.tsx`: four new routes — `/stats/history`, `/stats/aircraft`, `/stats/aircraft/:name`, `/settings`
- `src-tauri/capabilities/default.json`: added `dialog:allow-open` permission

---

## [0.2.0] — 2026-03-28

### Added
- ACMI parser (Rust): parses Tacview 2.x `.acmi` files — extracts all piloted aircraft, kills, deaths, duration, coalition, aircraft type, server/mission name, reference time
- Multi-pilot support: parser returns all pilots in a recording; frontend auto-matches configured pilot name or shows `PilotPickerDialog` for manual selection
- `parse_acmi` Tauri command registered in backend command handler
- TypeScript import pipeline in `src/ui/lib/tauri.ts`: `parseAcmi`, `insertFlight`, `insertEvents`, `matchPilot`, `importAcmiFile`, `storePilotFlight`
- `ImportResult` discriminated union: `success | duplicate | needs_pilot_selection | error`
- `PilotPickerDialog` component: Shadcn Dialog for selecting pilot from multi-pilot ACMI recording, with "remember as my name" checkbox
- Shadcn UI components added: `Dialog`, `Input`
- SQLite schema migration v2: `pilot_name`, `mission_name`, `file_size_bytes` columns on `flights` table
- `src-tauri/src/acmi/` Rust module: `ParsedAcmi`, `PilotFlight`, `ParsedEvent` types + two-tier kill/death attribution
- Implementation plan for MVP ACMI parsing + career stats (`docs/plans/2026-03-28-002-feat-mvp-acmi-parsing-and-career-stats-plan.md`)

---

## [0.1.0] — 2026-03-28

### Added
- Tauri v2 + React 19 + TypeScript + Vite project scaffold
- Full `src/ui/` feature-based folder structure per architecture spec
- Redux Toolkit store with `appSlice` (shared config state) and `statsSlice` (stub)
- React Router v6 with routes for stats, checklists, live-session, and map
- Tauri bridge layer (`src/ui/lib/tauri.ts`) — single entry point for all `invoke()` calls
- Tailwind CSS v3 with dark-default CSS variables
- Shadcn UI components: Button, Card, Separator
- SQLite database via `tauri-plugin-sql` with migration-based schema init
- Database schema: `flights`, `events`, and `config` tables
- `config` get/set wired through TypeScript SQL API in the Tauri bridge
- App shell: `Sidebar` with nav links, `AppLayout` wrapping all routes via `<Outlet />`
- Career Stats page with `EmptyState` component (shown when no flights exist)
- Stub pages for Checklists (V1), Live Session (V2), and Map (V2/V3)
- Typed `useAppDispatch` / `useAppSelector` hooks
