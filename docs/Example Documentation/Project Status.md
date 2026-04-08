# Project Status - DCSE Companion App

# DCS Companion App — Project Status

> Last Updated: 2026-03-31
> Current Phase: MVP
> Overall Status: ✅ MVP Complete — import pipeline stable; magic-byte detection, sequential processing, and startup scan all verified

---

## Milestone Overview

| Version | Focus | Status |
|---|---|---|
| Pre-Dev | Planning & Specification | ✅ Complete |
| MVP | Career & Stat Tracker | ✅ Complete |
| V1 | Interactive Checklists | 🔲 Not Started |
| V2 | Live Session Stats + F10 Map Phase 1 | 🔲 Not Started |
| V3 | Waypoint Planning + F10 Map Phase 2 | 🔲 Not Started |

---

## Pre-Development ✅

Planning and specification work completed before any code is written.

| Task | Status | Notes |
|---|---|---|
| Initial brainstorm & feature scope | ✅ Done | Covered all four versions + future ideas |
| Tech stack decisions | ✅ Done | Tauri v2, React, Redux Toolkit, SQLite, Tailwind |
| DCS integration strategy | ✅ Done | gRPC primary, Export.lua fallback, abstracted via hook |
| Folder structure & architecture | ✅ Done | Feature-based, Tauri bridge pattern, one Redux slice per feature |
| Versioned roadmap | ✅ Done | MVP → V1 → V2 → V3 defined with clear scope boundaries |
| Product_Spec.md | ✅ Done | Full spec covering features, flows, stack, architecture, decisions |
| Constraints & decisions log | ✅ Done | All major tradeoffs documented |

---

## MVP — Career & Stat Tracker ✅

**Goal:** A working desktop app that watches the ACMI folder, parses flight files, and displays career stats. No live sim connection required.

| Task | Status | Notes |
|---|---|---|
| Repo initialised (Tauri + React scaffold) | ✅ | Tauri v2 + React 19 + TypeScript + Vite |
| Folder structure created per spec | ✅ | src/ui/ feature-based layout, src-tauri/ backend |
| SQLite schema defined (`schema.sql`) | ✅ | flights, events, config tables with migrations; v2 adds pilot_name, mission_name, file_size_bytes |
| ACMI folder watcher (Rust backend) | ✅ | notify v7 + notify-debouncer-mini; WatcherState managed state; start/stop/get_pending commands; useACMIWatcher hook |
| ACMI parser — extract kills, deaths, duration, aircraft | ✅ | Rust parser complete; wired via `parse_acmi` Tauri command; full import pipeline in tauri.ts |
| Tauri bridge layer (`/lib/tauri.ts`) | ✅ | Single invoke() entry point + SQL plugin + import pipeline + 6 stat queries + watcher commands + folder picker |
| Multi-pilot support + `PilotPickerDialog` | 🟡 | Parser returns all pilots; `PilotPickerDialog` built but pilot-name matching removed for MVP stability — uses `pilots[0]` directly; full pilot selection deferred to post-MVP |
| Career Dashboard UI | ✅ | StatCard, KillBreakdownChart, DeathBreakdownChart, RecentFlights; onboarding→empty→dashboard flow |
| Per-aircraft stats view | ✅ | AircraftSelector + AircraftStatsView at /stats/aircraft/:name |
| Session history log | ✅ | SessionHistory + FlightRow with expand/collapse + pagination at /stats/history |
| First launch onboarding (set ACMI folder path + pilot name) | ✅ | OnboardingDialog (pilot name + folder picker); SettingsPanel at /settings |
| Empty states (no flights yet) | ✅ | EmptyState component on stats page |
| Basic app shell — sidebar nav, routing | ✅ | Sidebar restructured with grouped nav + Settings; 4 new routes added |
| Stats query layer + Redux async thunks | ✅ | statsSlice rewritten; fetchCareerStats, fetchFlightHistory, fetchAircraftList, fetchAircraftStats |
| MVP usable end-to-end | ✅ | Import pipeline stable: magic-byte zip detection, sequential SQLite writes, startup folder scan, all verified. Pilot selection simplified to `pilots[0]` for MVP. |

---

## V1 — Interactive Checklists 🔲

**Goal:** Checklists that auto-tick from live DCS state. Community-shareable via JSON import/export.

**Dependency:** MVP must be complete and stable first.

| Task | Status | Notes |
|---|---|---|
| DCS-gRPC integration (Rust backend) | 🔲 | — |
| Export.lua UDP listener (fallback) | 🔲 | — |
| `useDCSConnection` hook (abstracts both) | 🔲 | — |
| Checklist data model (JSON schema defined) | 🔲 | — |
| Bundled default checklists (F/A-18C, F-16C, etc.) | 🔲 | — |
| Checklist library UI — browse by aircraft & type | 🔲 | — |
| Active checklist view — manual tick | 🔲 | — |
| Sim-state auto-tick logic | 🔲 | — |
| Import checklist from file | 🔲 | — |
| Export checklist to file | 🔲 | — |
| V1 usable end-to-end | 🔲 | — |

---

## V2 — Live Session Stats + F10 Map Phase 1 🔲

**Goal:** Live in-session data overlay. Real-time player position on the theatre map.

**Dependency:** V1 DCS connection layer must be complete.

| Task | Status | Notes |
|---|---|---|
| Live session overlay UI | 🔲 | Time elapsed, K/D, server name |
| Session data stream from DCS | 🔲 | — |
| F10 map — theatre map rendering | 🔲 | — |
| F10 map — real-time player position | 🔲 | — |
| Discord Rich Presence integration | 🔲 | Optional stretch goal |
| V2 usable end-to-end | 🔲 | — |

---

## V3 — Waypoint Planning + F10 Map Phase 2 🔲

**Goal:** Full tactical map. Plan routes externally, export directly to DCS.

**Dependency:** V2 map foundation must be complete.

| Task | Status | Notes |
|---|---|---|
| Waypoint creation & editing on map | 🔲 | — |
| Waypoint export to DCS (gRPC/scripting) | 🔲 | — |
| All-contacts view on map | 🔲 | — |
| Multi-user groundwork (architecture only) | 🔲 | No UI yet — just structural prep |
| V3 usable end-to-end | 🔲 | — |

---


## Status Key

| Symbol | Meaning |
|---|---|
| ✅ | Complete |
| 🟡 | In Progress |
| 🔲 | Not Started |
| ⛔ | Blocked |