# DCS Companion App — Product Specification

> Version: 0.1 — Pre-Development Spec  
> Status: Draft  
> Scope: MVP through V3 roadmap

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Feature Definitions by Version](#2-feature-definitions-by-version)
3. [User Flows](#3-user-flows)
4. [Engineering Requirements](#4-engineering-requirements)
5. [Project Architecture](#5-project-architecture)
6. [Constraints & Decisions Log](#6-constraints--decisions-log)

---

## 1. Product Overview

A desktop companion application for DCS World pilots. Designed to run on a second monitor alongside the simulator, providing post-flight stat tracking, live checklists, session monitoring, and tactical map planning in a single unified interface.

**Core Principles:**
- Minimal performance footprint — runs alongside DCS without impacting sim performance
- Local-first — all data stored on the user's machine, no account required
- Open source — architecture and code conventions must be legible to contributors
- Progressive — each version is a usable, shippable product. Later versions extend, never break, earlier ones.

---

## 2. Feature Definitions by Version

### MVP — Career & Stat Tracker

**What it does:**
Watches the user's ACMI output folder. When a new `.acmi` file is written after a flight, the app automatically parses it and stores structured data to a local SQLite database. The user can review their career stats and per-aircraft history at any time.

**Features:**
- ACMI folder watcher — user sets folder path on first launch, app monitors it automatically
- Post-flight ingestion — new `.acmi` files are parsed and stored without user action
- Career dashboard — top-level stats across all flights
- Per-aircraft view — filter all stats by airframe
- Stats tracked:
  - Career K/D ratio
  - Hours flown (total and per aircraft)
  - Kill types (Air-to-Air vs Air-to-Ground)
  - Server and mission history
  - Death causes (AAA, SAM, fighter, unknown, etc.)
- Session history log — list of past flights with summary stats per session

**Out of scope for MVP:**
- Real-time or live data
- Accounts or cloud sync
- Any sim integration

---

### V1 — Interactive Checklists

**What it does:**
Provides interactive, sim-aware checklists for use during flight. Checklists auto-tick items based on live aircraft state received from DCS. Users can also manually tick items. Custom checklists can be imported and exported as files for community sharing.

**Features:**
- Checklist library — select aircraft, then checklist type (startup, taxi, fence-in, fence-out, emergency, etc.)
- Manual tick — user can tap/click to mark items complete
- Sim-state auto-tick — items tick automatically when DCS reports the relevant cockpit state
- DCS integration via DCS-gRPC (primary) or Export.lua (fallback)
- Import/export — checklists saved as portable files (JSON format) for sharing
- Bundled defaults — a set of community-standard checklists shipped with the app

**Out of scope for V1:**
- Central checklist repository or community platform
- Checklist creation UI (edit raw JSON for now)

---

### V2 — Live Session Stats & F10 Map (Phase 1)

**What it does:**
Displays live in-session data while the user is actively flying. Introduces the F10 map showing current player position.

**Features:**
- Live session overlay:
  - Time elapsed in current session
  - Live K/D for the session
  - Current server name
- F10 map — real-time player position plotted on the DCS theatre map
- Possible Discord Rich Presence integration (current server, aircraft, session time)

---

### V3 — Waypoint Planning & F10 Map (Phase 2)

**What it does:**
Full tactical map with waypoint planning. Users plan routes and objectives on the F10 map externally, then export them directly into DCS.

**Features:**
- Waypoint creation and editing on the map
- Export waypoints to DCS (via scripting/gRPC)
- All-contacts view — other players and known contacts shown on map
- Shared tactical map groundwork (foundation for future multi-user)

---

### Future Considerations

- Multi-user parties — shared group waypoint planning sessions
- User accounts and cloud sync
- iPad companion support (lower priority, architecture should not block it)
- Central community checklist repository

---

## 3. User Flows

### Flow 1 — First Launch

```
App opens
  → No ACMI path configured
  → Onboarding prompt: "Set your ACMI folder location"
  → User selects folder via file picker
  → Path saved to local config
  → App lands on Career Dashboard (empty state)
  → Empty state shows guidance: "Complete a flight in DCS to see your stats appear"
```

---

### Flow 2 — Post-Flight Stat Ingestion

```
User completes a DCS flight
  → DCS writes .acmi file to watched folder
  → App file watcher detects new file
  → App parses .acmi (extract kills, deaths, duration, aircraft, server)
  → Data written to SQLite
  → Career Dashboard updates automatically
  → New session appears in session history log
  → Per-aircraft stats updated
```

---

### Flow 3 — Checklist Use During Flight (V1)

```
User prepares for a flight
  → Opens Checklists section
  → Selects aircraft type (e.g. F/A-18C)
  → Selects checklist (e.g. Startup)
  → Checklist renders with all items unchecked
  → User starts DCS session
  → App connects to DCS via gRPC / Export.lua
  → Sim state events trigger auto-ticks as conditions are met
  → User can manually tick remaining items
  → Flight begins
  → User switches checklist to Fence In / Taxi / etc. as needed
  → Session ends, checklist state is cleared for next use
```

---

### Flow 4 — Importing a Community Checklist (V1)

```
User receives a .json checklist file (from forum, friend, Discord)
  → Opens Checklists section
  → Clicks "Import Checklist"
  → File picker → selects .json file
  → App validates format
  → Checklist added to library under correct aircraft
  → Available immediately for use
```

---

## 4. Engineering Requirements

### Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| App shell | Tauri (v2) | Native performance, minimal memory footprint, critical for running alongside DCS. Rust backend, web frontend. |
| Frontend framework | React 18 | Component model maps cleanly to feature sections. Large contributor ecosystem. |
| Routing | React Router v6 | Standard SPA routing. One route per major section. |
| State management | Redux Toolkit | Structured, predictable, industry-standard. Enforces consistency across contributors. One slice per feature domain. |
| Styling | Tailwind CSS | Utility-first, ideal for dense tactical UI. No custom design system required for contributors. |
| Local database | SQLite (via Tauri plugin) | Single local file, queryable, handles relational stat data cleanly. Straightforward migration path to cloud DB in future versions. |
| DCS integration | DCS-gRPC (primary) | Modern, maintained, exposes a proper API. Used for sim-state events (V1 checklists) and live data (V2+). |
| DCS integration fallback | Export.lua (UDP) | Built into DCS, no plugin required. Fallback if gRPC is unavailable or for specific data types. |
| Build tooling | Vite | Fast dev server and build pipeline, standard with Tauri projects. |

---

### DCS Integration Notes

Two integration methods are supported:

**DCS-gRPC**
- Requires user to install the gRPC DCS plugin
- Exposes a structured API for querying and subscribing to sim state
- Preferred for checklist auto-ticking, live session data, and map position
- Documentation: https://github.com/DCS-gRPC/rust-server

**Export.lua**
- Built into DCS, activated via a Lua script in the user's Scripts folder
- Streams cockpit and world state over UDP to a local port
- Lower barrier to entry (no extra plugin), less structured data
- Fallback for users who cannot or will not install gRPC

The app should detect which method is available and adapt accordingly. Both paths should share the same internal data interface so the rest of the app is integration-agnostic.

---

### Deployment & Distribution (MVP)

- Local install only — user clones repo and runs dev build, or builds from source
- No auto-updater required for MVP
- Windows only — DCS is Windows-exclusive
- Architecture should not technically block Mac/Linux builds for contributors who want to work on non-DCS-dependent features (UI, stat parsing, etc.)

---

### Future Infrastructure Considerations

When accounts and cloud sync arrive (V3+):
- Backend API: likely a lightweight Node.js or Rust service
- Database: PostgreSQL (migration from SQLite schemas should be designed with this in mind)
- Auth: standard JWT or OAuth
- Hosting: TBD — keep stateless API design to keep options open

iPad support (future):
- Tauri's web frontend can be served as a web app
- Keep frontend free of Windows-specific APIs
- Tauri bridge calls should be abstracted behind a service layer so they can be swapped for HTTP calls when running in browser/iPad context

---

## 5. Project Architecture

### Folder Structure

```
/
├── src/
│   ├── ui/                          # React frontend
│   │   ├── features/                # Feature-based modules
│   │   │   ├── stats/               # Career dashboard, per-aircraft view
│   │   │   │   ├── components/
│   │   │   │   ├── statsSlice.ts    # Redux slice
│   │   │   │   └── index.tsx
│   │   │   ├── checklists/          # Checklist library, active checklist view
│   │   │   │   ├── components/
│   │   │   │   ├── checklistSlice.ts
│   │   │   │   └── index.tsx
│   │   │   ├── live-session/        # V2: session overlay, K/D, server
│   │   │   │   ├── components/
│   │   │   │   ├── sessionSlice.ts
│   │   │   │   └── index.tsx
│   │   │   └── map/                 # V2/V3: F10 map, waypoints
│   │   │       ├── components/
│   │   │       ├── mapSlice.ts
│   │   │       └── index.tsx
│   │   ├── components/              # Shared UI components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── hooks/                   # Shared custom hooks
│   │   │   ├── useDCSConnection.ts  # Abstracts gRPC vs Export.lua
│   │   │   ├── useACMIWatcher.ts
│   │   │   └── ...
│   │   ├── store/                   # Redux store configuration
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   └── tauri.ts             # Single Tauri bridge layer — all backend calls go here
│   │   ├── router.tsx               # React Router routes
│   │   └── main.tsx                 # App entry point
│   │
│   └── core/                        # Tauri Rust backend
│       ├── commands/                # Tauri commands (called from frontend via tauri.ts)
│       │   ├── acmi.rs              # ACMI parsing and ingestion
│       │   ├── stats.rs             # Stat queries
│       │   ├── checklists.rs        # Checklist CRUD
│       │   └── config.rs            # App config (folder paths etc.)
│       ├── integrations/            # DCS connection handlers
│       │   ├── grpc.rs              # DCS-gRPC client
│       │   └── export_lua.rs        # Export.lua UDP listener
│       ├── db/                      # Database layer
│       │   ├── schema.sql           # SQLite schema
│       │   ├── migrations/          # Schema migrations
│       │   └── queries.rs           # Typed query functions
│       └── main.rs
│
├── checklists/                      # Bundled default checklist JSON files
│   ├── fa18c/
│   ├── f16c/
│   └── ...
│
├── docs/                            # Project documentation
│   ├── Product_Spec.md              # This document
│   ├── CONTRIBUTING.md
│   └── architecture/
│
└── scripts/                         # Dev tooling and setup scripts
```

---

### Key Architectural Patterns

**Tauri Bridge (`/lib/tauri.ts`)**
All communication between the React frontend and the Rust backend is routed through a single file. No component calls Tauri directly. This makes backend calls easy to mock, test, and replace if the transport layer changes.

```ts
// Example pattern
export const getCareerStats = () => invoke<CareerStats>('get_career_stats')
export const setAcmiPath = (path: string) => invoke<void>('set_acmi_path', { path })
```

**DCS Integration Abstraction (`useDCSConnection`)**
The frontend never knows whether it's talking to gRPC or Export.lua. The hook detects available integration, connects, and exposes a unified stream of sim state events. Feature slices subscribe to this hook.

**Redux Slices — One Per Feature**
Each feature owns its own slice. Stats, Checklists, LiveSession, and Map are fully independent. Shared app state (connection status, config) lives in an `appSlice`.

---

## 6. Constraints & Decisions Log

| Decision | Choice | Reasoning |
|---|---|---|
| App framework | Tauri v2 | Performance footprint critical — runs alongside DCS. Electron ruled out. |
| Frontend | React + Redux Toolkit | Contributor legibility, structure, scale. Redux chosen over Zustand for open source consistency. |
| Styling | Tailwind CSS | Tactical/dark UI, fast iteration, no custom design system burden. |
| Database | SQLite | Local-first MVP. Schema designed with future PostgreSQL migration in mind. |
| DCS integration | gRPC primary, Export.lua fallback | gRPC is modern and maintained. Export.lua ensures accessibility for users who can't install plugins. |
| Platform | Windows only (MVP) | DCS is Windows-exclusive. Non-DCS features should remain cross-platform where possible. |
| Distribution | Local build only (MVP) | No installer or auto-update needed until community release. |
| Accounts | Not in MVP | Fully local. Cloud sync and auth scoped to V3+. |
| iPad support | Not in MVP, architecture aware | Frontend must avoid Windows-only APIs. Tauri bridge abstracted for future HTTP swap. |
| Checklist sharing | File import/export (JSON) | Community platform deferred. JSON format chosen for readability and portability. |
