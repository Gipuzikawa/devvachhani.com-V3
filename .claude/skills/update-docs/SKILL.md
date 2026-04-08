---
name: update-docs
description: >
  Analyses git changes and automatically keeps project documentation in sync.
  Use this skill whenever the user wants to update docs after writing code, commits changes,
  finishes a feature, says "update the docs", "sync the docs", "log what I just built",
  "update changelog", "update project status", or any similar phrase. Also trigger when
  the user says they've finished a feature, fixed a bug, or made structural changes and
  wants the project docs to reflect it. This skill handles: changelog entries, architecture
  doc updates, project_status.md progress tracking, and auto-generating feature docs for
  major features. Always use this skill rather than manually editing docs one by one.
---

# Docs Sync

Analyses git changes (status + diff) and synchronises all project documentation in one pass.

## What this skill does

Given the current git state of the repo, it:

1. **Reads git changes** — `git status` + `git diff` (staged and unstaged)
2. **Updates `docs/changelog.md`** — adds a new versioned entry for features/fixes
3. **Updates `docs/architecture.md`** — only if structural changes are detected (new files, new modules, changed folder layout, new dependencies)
4. **Updates `docs/project_status.md`** — moves completed tasks to ✅, updates 🟡 in-progress items, adjusts milestone status
5. **Creates a feature doc** — only if a major feature has been fully implemented; writes to `docs/feature-docs/<feature-name>.md`

---

## Step-by-step workflow

### Step 1 — Read git state

Run both commands and hold the output:

```bash
git status
git diff HEAD
```

If the repo has staged-but-not-committed changes, also run:
```bash
git diff --cached
```

If there are no changes at all, tell the user and stop.

---

### Step 2 — Classify the changes

Before touching any file, classify what you're looking at. Use the reference file for classification rules:

> 📄 Read `references/classification.md` now — it defines how to categorise changes as feature / fix / structural / major-feature.

Build a mental model:
- List of files changed
- Which features/modules they belong to (use the folder structure — `src/ui/features/stats/` = stats feature, etc.)
- Whether any structural changes occurred (see classification rules)
- Whether a full major feature has landed (see classification rules)
- A one-line plain-English summary of the overall change

---

### Step 3 — Update `docs/changelog.md`

> 📄 Read `references/changelog-format.md` for the exact format to follow.

- Insert a new entry at the top of the changelog (below the title, above previous entries)
- Use today's date
- Group changes under `### Added`, `### Fixed`, `### Changed` as appropriate
- Keep entries concise — one line per change
- Do not touch previous entries

---

### Step 4 — Update `docs/architecture.md` (conditional)

**Only do this step if structural changes were detected in Step 2.**

Structural changes include:
- New folders or modules added to `src/`
- New Tauri commands added (`src/core/commands/`)
- New integrations added (`src/core/integrations/`)
- New Redux slices added
- New shared hooks added
- Dependencies added/removed (`Cargo.toml`, `package.json`)
- Database schema changes (`schema.sql`, new migrations)

If structural changes occurred:
- Read the current `docs/architecture.md`
- Add or update only the sections that changed
- Do not rewrite sections that weren't affected
- If a new module was added, add it to the folder structure section and note its responsibility

If no structural changes: skip this step entirely.

---

### Step 5 — Update `docs/project_status.md`

> 📄 Read `references/status-rules.md` for the exact rules on how to move tasks.

Key rules:
- A task moves to ✅ only when its implementation files are present and the diff shows the work is complete, not just started
- A task moves to 🟡 when related files exist but the feature is partially done
- Never move a task backwards (🟡 → 🔲) unless you have clear evidence it was reverted
- Update the `Last Updated` date at the top of the file
- If all tasks in a milestone are ✅, mark the milestone row in the overview table as ✅ and update its status
- If some tasks are ✅ and some 🔲, mark the milestone as 🟡 In Progress

---

### Step 6 — Create feature doc (conditional)

**Only do this step if a major feature has been fully implemented.**

A major feature is fully implemented when:
- All (or nearly all) tasks for a milestone section in `project_status.md` are now ✅
- OR a self-contained, user-facing feature is complete (e.g. ACMI parser, checklist engine, DCS gRPC connection)

If a major feature has landed:

1. Choose a filename: `docs/feature-docs/<feature-slug>.md` (e.g. `acmi-ingestion.md`, `checklist-engine.md`)
2. Write the doc using this structure:

```markdown
# Feature Name

> Introduced: [version/date]  
> Status: Complete  
> Milestone: [MVP / V1 / V2 / V3]

## What it does
[Plain-English description — 2–4 sentences. What the user experiences.]

## How it works
[Technical summary — key files, the flow of data, major decisions made.]

## Files involved
| File | Role |
|------|------|
| `path/to/file.ts` | [What this file does in this feature] |
| ... | ... |

## Key decisions
[Any non-obvious choices made in the implementation. Why X over Y.]

## Dependencies
[External libs, Tauri plugins, DCS integrations this feature relies on.]
```

3. Do not create a feature doc for minor fixes or small additions.

---

### Step 7 — Report back

After all updates, give the user a concise summary:

- Which files were updated and what changed in each
- Whether a feature doc was created (and its path)
- Whether architecture.md was updated (and why)
- Any ambiguities you flagged or assumptions you made

Keep this tight — a short bulleted list, not a wall of text.

---

## Important constraints

- **Never delete existing content** from changelog, architecture, or status docs — only add or update
- **Never fabricate completion** — only mark tasks ✅ if the diff provides clear evidence
- **Be conservative on "major feature"** — when in doubt, don't create a feature doc. Better to under-generate than to create a half-baked doc
- **One changelog entry per run** — even if multiple changes are present, group them into a single dated entry
- **Ask before assuming version numbers** — if the changelog uses semantic versions (v0.1, v0.2) and you're unsure what the next version should be, ask the user rather than guessing