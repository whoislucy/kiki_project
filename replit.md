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
- **portfolio** (port 21113, `/`) — React + Vite single-page portfolio site reproducing a 3-slide PPTX (`Portfolio-Kristina-Ermilova-Light_upd_1777995759940.pptx`). Russian content, 3 embedded MP4 videos. Light theme (#F4F1EB bg, #E03018 accent). Desktop uses PNG slide PNGs as background with absolute-positioned hotspot overlays; mobile/tablet uses native HTML/CSS Grid layout. Fonts: Unbounded (titles), JetBrains Mono (tags), Onest (body).
- **portfolio-dark** (port 21524, `/dark`) — Dark-themed mirror of `/`. Same `image2-13.*` and `media1-3.mp4` content as light, plus extra slide-2 card "BOTANICAL INFUSION" (`dimg-2-7.png`) and a fridge-door video (`fridge.mp4`). Desktop uses `slide-1/2/3.png` (1655×2340 dark PNGs) as full-bleed slide background with absolute-positioned overlays: fridge video centered on slide 1's empty middle, real botanical-lab video on slide 2's INSPIRO position, plus clickable photo hotspots on slides 2 & 3 that open the lightbox. Mobile/tablet uses native grid (`useIsDesktop()` ≥768px breakpoint). Theme: #0E0D0C bg, #F0EDE8 fg, #6A6460 muted, #E03018 accent.
