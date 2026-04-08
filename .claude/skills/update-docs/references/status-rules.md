# Project Status Update Rules

These rules govern how `docs/project_status.md` is updated in Step 5.

---

## Task-level rules

**Marking ✅**

A task row moves to ✅ only when ALL of the following are true:
- The relevant files exist (confirmed by diff or `git status`)
- The implementation appears complete — not just a stub or placeholder
- The feature it relates to would work end-to-end from a user perspective

When in doubt: leave it at 🟡, not ✅. Over-marking is worse than under-marking.

**Marking 🟡**

Use 🟡 when:
- A file exists for this feature but it's clearly partial (e.g., component scaffolded but no data, or Tauri command defined but not connected to the DB)
- The diff shows work in progress

**Adding notes**

The Notes column can be updated to reflect what was done:
- `"Added in [date]"` when first completing
- Brief description of current state for 🟡 items: `"Parser complete, UI pending"`
- Leave blank for 🔲 items

---

## Milestone-level rules

The overview table at the top of the file shows milestone status. Update it based on the aggregate state of all tasks in that milestone section:

| Task states in milestone | Milestone status |
|--------------------------|-----------------|
| All ✅ | ✅ Complete |
| Mix of ✅ and 🔲/🟡 | 🟡 In Progress |
| All 🔲 | 🔲 Not Started |
| Any ⛔ blocking progress | ⛔ Blocked |

---

## Date update

Always update the `Last Updated` line at the top of the file to today's date when making any changes.

---

## Mapping git changes to task rows

Use this table to connect changed files to the exact task rows in `project_status.md`.

### MVP tasks

| Task row | File path signals |
|----------|------------------|
| Repo initialised (Tauri + React scaffold) | `tauri.conf.json`, `Cargo.toml`, `package.json`, `src/ui/main.tsx` |
| Folder structure created per spec | presence of `src/ui/features/`, `src-tauri/src/commands/`, `src-tauri/src/db/`, `src/ui/hooks/` directories |
| SQLite schema defined (`schema.sql`) | `src-tauri/src/db/schema.sql`, `src-tauri/src/db/mod.rs` (migration definitions) |
| ACMI folder watcher (Rust backend) | `src-tauri/src/watcher.rs`, `src/ui/hooks/useACMIWatcher.ts` |
| ACMI parser — extract kills, deaths, duration, aircraft | `src-tauri/src/acmi/parser.rs`, `src-tauri/src/commands/acmi.rs` |
| Tauri bridge layer (`/lib/tauri.ts`) | `src/ui/lib/tauri.ts` |
| Career Dashboard UI | `src/ui/features/stats/components/`, `src/ui/features/stats/index.tsx`, `src/ui/features/stats/statsSlice.ts` |
| Per-aircraft stats view | `src/ui/features/stats/` (aircraft filter components) |
| Session history log | `src/ui/features/stats/` (session list components), `src-tauri/src/commands/stats.rs` |
| First launch onboarding (set ACMI folder path) | `src/core/commands/config.rs`, onboarding component in `src/ui/` |
| Empty states (no flights yet) | empty state components within `src/ui/features/stats/` |
| Basic app shell — sidebar nav, routing | `src/ui/components/Sidebar.tsx`, `src/ui/router.tsx` |
| MVP usable end-to-end | all above rows ✅ |

### V1 tasks

| Task row | File path signals |
|----------|------------------|
| DCS-gRPC integration (Rust backend) | `src/core/integrations/grpc.rs` |
| Export.lua UDP listener (fallback) | `src/core/integrations/export_lua.rs` |
| `useDCSConnection` hook (abstracts both) | `src/ui/hooks/useDCSConnection.ts` |
| Checklist data model (JSON schema defined) | `checklists/` directory, JSON schema file |
| Bundled default checklists (F/A-18C, F-16C, etc.) | `checklists/fa18c/`, `checklists/f16c/`, etc. |
| Checklist library UI — browse by aircraft & type | `src/ui/features/checklists/components/`, `src/ui/features/checklists/index.tsx` |
| Active checklist view — manual tick | checklist item components with tick interaction |
| Sim-state auto-tick logic | `src/ui/features/checklists/checklistSlice.ts`, auto-tick logic wired to `useDCSConnection` |
| Import checklist from file | import handler in `src/ui/features/checklists/`, `src/core/commands/checklists.rs` |
| Export checklist to file | export handler in `src/ui/features/checklists/`, `src/core/commands/checklists.rs` |
| V1 usable end-to-end | all above rows ✅ |

### V2 tasks

| Task row | File path signals |
|----------|------------------|
| Live session overlay UI | `src/ui/features/live-session/components/`, `src/ui/features/live-session/index.tsx` |
| Session data stream from DCS | `src/ui/features/live-session/sessionSlice.ts`, wired to `useDCSConnection` |
| F10 map — theatre map rendering | `src/ui/features/map/components/`, `src/ui/features/map/index.tsx` |
| F10 map — real-time player position | `src/ui/features/map/mapSlice.ts`, position update logic |
| Discord Rich Presence integration | Discord RPC calls, likely in `src/core/` |
| V2 usable end-to-end | all above rows ✅ |

### V3 tasks

| Task row | File path signals |
|----------|------------------|
| Waypoint creation & editing on map | waypoint components in `src/ui/features/map/` |
| Waypoint export to DCS (gRPC/scripting) | export command in `src/core/commands/`, gRPC write calls |
| All-contacts view on map | contacts layer in `src/ui/features/map/` |
| Multi-user groundwork (architecture only) | structural additions only, no UI files expected |
| V3 usable end-to-end | all above rows ✅ |

---

## What NOT to do

- Do not add new task rows unless the spec introduced a new task — this file tracks the roadmap, not every code change
- Do not rewrite task descriptions
- Do not delete rows
- Do not change the milestone section names or headings