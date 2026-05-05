# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **api-server** (port 8080) — Express API at `/api`.
- **mockup-sandbox** (port 8081) — Vite preview server for canvas component mockups at `/__mockup`.
- **portfolio** (port 21113) — React + Vite single-page portfolio site reproducing a 3-slide PPTX (`Portfolio-Kristina-Ermilova-Light_upd_1777995759940.pptx`). Russian content, 3 embedded MP4 videos. Fully responsive HTML/CSS Grid layout (no PNG slide fallback). Cards reflow 1 col (≤340px) → 2 col (mobile) → auto-fill (tablet/desktop). Card media uses uniform 3:4 aspect ratio on mobile/tablet, natural ratios on desktop ≥1024px. Bottom-fixed nav pill with page indicator. Fonts: Unbounded (titles), JetBrains Mono (tags), Onest (body). Mobile target: ≤10 viewport scrolls (currently 6).
