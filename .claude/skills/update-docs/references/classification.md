# Change Classification Rules

Use these rules in Step 2 to classify git changes before touching any docs.

---

## Change types

### Feature
A new capability has been added that wasn't there before.

Signals:
- New component, hook, slice, or screen added
- New Tauri command added and wired up
- New route added to `router.tsx`
- New table or query added to the database layer
- New section of UI visible to the user

### Fix
An existing capability has been corrected.

Signals:
- Change to an existing file that corrects a bug
- Logic correction without adding new files
- Test passing that previously failed

### Structural change
The architecture, layout, or dependencies of the project have changed in a way that affects how contributors understand or extend the codebase.

Signals (ANY of these = structural):
- New folder or file added under `src/ui/features/`, `src-tauri/src/commands/`, `src-tauri/src/integrations/`, `src-tauri/src/db/`, or any new top-level module under `src-tauri/src/` (e.g. `src-tauri/src/acmi/`)
- New file added to `src/ui/hooks/` or `src/ui/components/` (shared, not feature-specific)
- New Redux slice created
- `Cargo.toml` or `package.json` — dependency added or removed
- `schema.sql` modified or new migration file added
- New top-level directory created in the repo
- `src/lib/tauri.ts` modified (bridge layer changes)
- `src/ui/store/index.ts` modified (store configuration changes)

NOT structural:
- Modifying files within an existing feature folder
- Styling changes only (Tailwind classes, CSS)
- Adding tests
- README edits

### Major feature
A complete, user-facing feature has been fully implemented. Use this classification to trigger Step 6 (feature doc creation).

A major feature must meet ALL of:
1. It is listed as a task row in `docs/project_status.md`
2. The diff shows the implementation is complete, not just started
3. It is user-facing OR it is a core infrastructure piece that other features depend on (e.g., ACMI parser, Tauri bridge, DCS connection hook)

Examples of things that qualify:
- ACMI folder watcher — complete (watcher + parser + DB write all present)
- Career dashboard — complete (UI rendering real data from DB)
- `useDCSConnection` hook — complete (detects gRPC vs Export.lua, exposes unified interface)
- SQLite schema — defined and migrations in place
- Checklist engine — complete (manual tick + auto-tick logic present)

Examples of things that do NOT qualify:
- A single component added
- A bug fix
- Styling improvements
- Partial implementation (files exist but feature not end-to-end working based on diff)

---

## Classification output

After classifying, hold:

```
change_types: [feature, fix, structural]   ← list, can be multiple
major_features: ["acmi-ingestion"]          ← list of slugs, often empty
summary: "Added ACMI folder watcher and parser, wired to SQLite write"
```

Use this to decide which of Steps 3–6 to execute.