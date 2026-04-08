# AGENTS.md

Agent routing and plugin skill guide for Claude Code sessions on this portfolio project.

---

## Core Principle

Claude orchestrates. Codex implements. Specialist subagents review, research, and design.

Claude should pull from the installed plugin ecosystem rather than doing everything inline. Skipping available agents to do the work manually is slower and produces lower-quality output.

---

## Plugin Skill Invocation Rules

Invoke these skills with the `/skill-name` syntax in the Claude Code prompt.

| Skill | Invoke when | Command |
|---|---|---|
| `codex:rescue` | Any source file creation or modification | `/codex:rescue` |
| `ce:plan` | Non-trivial features requiring design before implementation | `/ce:plan` |
| `update-docs` | After work that changes project state or adds a completed milestone | `/update-docs` |

### Compound-Engineering Subagents

These are available via the `Agent` tool with `subagent_type`. Claude should use them proactively — do not wait for the user to ask.

#### Research (run before implementing)

| Subagent | Use when |
|---|---|
| `compound-engineering:research:learnings-researcher` | **Always run before starting a non-trivial task.** Searches for past fixes on the same topic. |
| `compound-engineering:research:repo-research-analyst` | Exploring an unfamiliar area of the codebase before planning. |
| `compound-engineering:research:framework-docs-researcher` | Fetching version-specific docs for React, Vite, Tailwind, React Router, etc. |
| `compound-engineering:research:best-practices-researcher` | External guidance on patterns not established in this codebase. |

#### Review (run after Codex implements)

| Subagent | Use when |
|---|---|
| `compound-engineering:review:correctness-reviewer` | **Default post-implementation pass.** Logic errors, edge cases, intent-vs-implementation gaps. |
| `compound-engineering:review:kieran-typescript-reviewer` | Any TypeScript change — type safety, generics, inference. |
| `compound-engineering:review:security-reviewer` | Touches forms, env vars, Formspree, or any external API integration. |
| `compound-engineering:review:performance-reviewer` | Touches data-heavy list views, carousels, or intersection-heavy scroll effects. |
| `compound-engineering:review:testing-reviewer` | If/when tests are added to this project. |

#### Design (UI work)

| Subagent | Use when |
|---|---|
| `compound-engineering:design:design-iterator` | A UI change isn't visually right after 1–2 attempts. Let it iterate. |
| `compound-engineering:design:design-implementation-reviewer` | After implementing a component from a reference — verify it matches the Kinetic Cobalt spec. |

#### Planning and workflow

| Subagent | Use when |
|---|---|
| `compound-engineering:workflow:spec-flow-analyzer` | New page or feature has non-obvious user flows or edge states. |
| `compound-engineering:document-review:feasibility-reviewer` | Before implementing a plan that touches data model or routing. |

---

## Standard Session Workflow

```
1. Orient      → Read CLAUDE.md + docs/Project_Status.md
2. Research    → Run learnings-researcher for the topic
3. Plan        → /ce:plan for anything beyond a trivial edit
4. Implement   → /codex:rescue (never write source files directly)
5. Review      → correctness-reviewer + relevant specialist reviewer
6. Update      → /update-docs when milestone state changes
```

---

## Agent Ownership Map

| Agent | Owns |
|---|---|
| Claude (orchestrator) | Session orientation, routing, review synthesis, decision capture |
| Codex (`codex:rescue`) | All source file writes and edits |
| Retro agent | Session learnings and institutional knowledge capture |
| `/update-docs` skill | `docs/Project_Status.md` and `docs/Changelog.md` sync |
| `ce:plan` skill | Plans written to `docs/plans/YYYY-MM-DD-NNN-*.md` |

---

## What Claude Must NOT Do

- Write source files directly when Codex is available (exception: single-line data edits)
- Skip `learnings-researcher` before a complex task
- Mark work complete without at minimum a `correctness-reviewer` pass on Codex output
- Start implementation before planning when the change touches routing, types, or the data layer

---

## Plugin Ecosystem Reference

Installed plugins surfaced in this environment:

- **`codex`** — OpenAI Codex for file implementation (`/codex:rescue`)
- **`compound-engineering`** — Specialist subagent library: research, review, design, workflow, document-review
- **`ecc`** — Additional specialist agents: architect, planner, code-reviewer, typescript-reviewer, security-reviewer, performance-optimizer

When the compound-engineering equivalent exists, prefer it. Fall back to `ecc:*` agents when a compound-engineering agent does not cover the domain.
