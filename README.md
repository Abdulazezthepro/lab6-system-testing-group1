# lab6-system-testing-group1

**INFS4202 — Lab 6: System Testing & Bug Tracking**

System under test: **Swag Labs e-commerce practice site — https://www.saucedemo.com**

> Note: the lab instructions name `https://www.saucedemo.com` as the target application. The other
> practice host mentioned in the lab materials was unreachable from our network throughout the lab
> (the browser returned an error page on every attempt), so all testing was carried out against the
> site named in the instructions.

## Group members

| Member name | GitHub username | Role |
|---|---|---|
| Monir Skik | `<github-username>` | Test lead — scenario design, triage chair |
| Abdulazez Debs | `Abdulazezthepro` | Tester — repository owner, cart and checkout scenarios |
| Khalil | `<github-username>` | Tester — peer review, developer role in the lifecycle simulation |

Instructor: `<instructor-github-username>` (to be invited under **Settings → Collaborators**).

## How this repository is organised

- `.github/ISSUE_TEMPLATE/bug_report.yml` — the structured bug report form every Issue uses.
- `docs/test-scenarios.md` — the agreed test scenarios and the Automate / Keep manual decisions.

## Labels

| Label | Meaning |
|---|---|
| `severity: high` / `medium` / `low` | Impact on the user |
| `priority: P1` / `P2` / `P3` | How soon it must be fixed |
| `type: functional` / `usability` / `compatibility` / `performance` | Kind of defect |
| `status: new` / `assigned` / `fixed` / `retest` / `verified` | Position in the defect lifecycle |

## Test accounts used

All accounts use the password published on the Swag Labs login page. The account is part of the
reproduction steps for every Issue, because several defects only appear for specific accounts:
`standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`.
