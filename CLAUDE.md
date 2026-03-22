# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is a Next.js 16 (App Router) personal teaching site in Spanish. Content is stored as Markdown files — there is no database.

### Content model

All content lives in `content/clases/`. Each `.md` file is a "clase" (lesson) with required frontmatter:

```markdown
---
title: Titulo de la clase
date: 2026-02-14
tema: nombre-del-tema
---
```

**Temas (topics) are derived automatically** from the `tema` frontmatter field — there is no separate topic registry. A new tema appears on the site the moment any clase references it. The `tema` value must be a kebab-case slug (e.g. `gestion-agil`); it is converted to a display name by capitalizing each word.

### Data layer

`lib/clases.ts` contains all server-side data access functions (Node.js runtime only):

- `getClases()` — reads all `.md` files, parses frontmatter, returns sorted by date desc
- `getClaseBySlug(slug)` — finds a single clase by filename slug
- `getClasesByTema(tema)` — filters clases by tema slug
- `getTemas()` — derives unique temas with class counts and latest date

### Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Grid of all temas |
| `/temas/[tema]` | `app/temas/[tema]/page.tsx` | Grid of clases for a tema |
| `/clases/[slug]` | `app/clases/[slug]/page.tsx` | Individual clase rendered from Markdown |

Both dynamic routes use `generateStaticParams()` for static generation at build time.

### Markdown rendering

The clase detail page uses `react-markdown` with `remark-gfm` (GitHub Flavored Markdown) and `rehype-slug` (anchor IDs on headings). Custom component overrides for `ul`/`ol` are defined inline in `app/clases/[slug]/page.tsx`.

### Styling

Tailwind CSS v4 with a stone/amber color palette. Dark mode is supported via the `dark:` variant. Styles are written inline as Tailwind utility classes — there are no separate CSS modules.

### Deployment

Deployed on Vercel (connected to GitHub). Push to `main` triggers automatic deployment.

## Development rules

- Use Next.js App Router patterns (server components by default, `"use client"` only when needed).
- When adding new routes, components, or content structures, update `README.md` to reflect the changes.
