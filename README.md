# Backpack — Job Cost Capture

A Next.js prototype for capturing field job costs at source. Field operatives record time on site, vehicles, plant/tools, materials, and notes; QS staff use the structured output to review and calculate completed job costs.

---

## Overview

Backpack helps McCann understand the true cost of a completed job by replacing manual back-and-forth with a single, structured capture screen. The prototype focuses on the **Operative Job Completion and Cost Capture** flow: enter site details, see a live cost summary, and submit for QS review.

| Role | Access | Primary function |
| ----- | ----- | ----- |
| **Field Operative** | Mobile / web | Captures time, resources, and costs on site |
| **QS Office Staff** | Desktop web | Reviews and processes cost submissions |

---

## Tech Stack

| Layer | Technology |
| ----- | ----- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Testing | Vitest |
| CI | GitHub Actions |
| Hosting | Vercel |

---

## Getting Started

**Prerequisites:** Node.js 20.19.0 and npm.

```bash
git clone <repository-url>
cd backpack
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Job Cost Capture screen.

---

## Scripts

| Command | Description |
| ----- | ----- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build locally |
| `npm run type-check` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

Run the full local quality gate before pushing:

```bash
npm run type-check && npm run lint && npm test && npm run build
```

---

## Project Structure

```
backpack/
├── app/              # Next.js App Router (pages, layout, global styles)
├── components/       # UI components (JobCostCaptureScreen, sections, cards)
├── lib/              # Business logic (costCalculator, types, mockData)
├── tests/            # Vitest unit tests
├── docs/             # Requirements, architecture, UI sketch, DevOps pipeline
└── .github/workflows # CI configuration
```

---

## Documentation

| Document | Description |
| ----- | ----- |
| [01 — Requirements](docs/01-Requirements.md) | Business problem, scope, and acceptance criteria |
| [02 — System Architecture](docs/02-System_Architecture.md) | High-level system design |
| [03 — UI Sketch](docs/03-UI_Sketch.md) | Screen layout and component structure |
| [04 — DevOps Pipeline](docs/04-DevOps_Pipeline.md) | Local → GitHub → CI → Vercel workflow |
| [05 — AI Disclosure](docs/05-AI-disclosure.md) | AI-assisted development disclosure |

---

## Deployment

Production deploys automatically to **Vercel** when changes are merged to `main`. GitHub Actions runs type-check, lint, test, and build on every push and pull request.

See [docs/04-DevOps_Pipeline.md](docs/04-DevOps_Pipeline.md) for the full pipeline, environments, and troubleshooting guide.

---
