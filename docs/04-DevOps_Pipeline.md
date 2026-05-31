# Backpack DevOps Pipeline
## Local Development to Vercel Production

This document describes how the Backpack Job Cost Capture project moves from a developer's machine to production. It covers the local workflow, source control, continuous integration on GitHub Actions, and continuous deployment on Vercel.
---

## 2. Technology and Tooling Stack

| Layer | Technology | Version |
| ----- | ----- | ----- |
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS + PostCSS + Autoprefixer | v4 |
| **Unit Testing** | Vitest | ^4.1.7 |
| **Linting** | ESLint (eslint-config-next) | ^9 |
| **CI Runtime** | Node.js | 20.19.0 |
| **Hosting** | Vercel | Managed (Next.js preset) |

---

## 4. Local Development Workflow

**Prerequisites:** Node.js 20.19.0 (matching CI) and npm.

**First-time setup:**

```bash
git clone <repository-url>
cd backpack
npm ci
```

`npm ci` installs the exact dependency tree from `package-lock.json`, matching CI and Vercel.

**Daily development:**

```bash
npm run dev
```

**Pre-push checks (mirror CI):** run before pushing to catch failures locally.

```bash
npm run type-check   # tsc --noEmit
npm run lint         # eslint .
npm test             # vitest run
npm run build        # next build
```

---

## 5. Git and GitHub Workflow

| Branch | Purpose |
| ----- | ----- |
| **main** | Production source of truth; Vercel deploys production from here |
| **feature branches** | Development work; receive CI checks and Vercel preview URLs |

**Actual flow:**

1. Create a feature branch from `main`.
2. Develop locally and run the pre-push checks.
3. Push the branch to GitHub.
4. Open a Pull Request targeting `main`.
5. Wait for GitHub Actions CI to pass and review the Vercel preview URL.
6. Merge to `main`.
7. Vercel automatically deploys the updated `main` to production.

> Vercel deploys what is on GitHub, not what is only on a local machine. If production shows an outdated page, confirm the latest commits have been pushed to `main`.

---

## 6. Continuous Integration (GitHub Actions)

Defined in [.github/workflows/ci.yml](../.github/workflows/ci.yml).

**Triggers:**

| Event | Scope |
| ----- | ----- |
| `push` | All branches (`**`) |
| `pull_request` | Branches targeting `main` |
| `workflow_dispatch` | Manual run from the Actions tab |

**Job `build-and-test`** runs on `ubuntu-latest` with Node.js 20.19.0 and an npm cache, executing the following steps:

| Step | Command | Catches |
| ----- | ----- | ----- |
| **Install** | `npm ci` | Dependency or lockfile mismatches |
| **Type Check** | `npm run type-check` | TypeScript and type errors |
| **Lint** | `npm run lint` | Style and best-practice violations |
| **Test** | `npm test` | Business logic regressions |
| **Build** | `npm run build` | Production compile and routing errors |

The workflow uses minimal `contents: read` permissions.

---

## 7. Testing Strategy

Tests run with Vitest, configured in [vitest.config.ts](../vitest.config.ts) using a `node` environment and the `tests/**/*.test.ts` include pattern with the `@` path alias.

**Current coverage** focuses on business logic in `lib/costCalculator.ts` (site hours, cost totals, form validation) plus a scaffold sanity test.

---
