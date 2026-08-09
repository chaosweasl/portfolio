# Portfolio — Personal Site

My personal portfolio built with SvelteKit, mdsvex, and Tailwind CSS. Deployed on Cloudflare Pages.

## Quick Start

```bash
bun install
bun run dev        # starts at http://localhost:5173
bun run build      # production build
```

## Project Structure

```
├── content/
│   ├── posts/              # Blog posts (one folder per post)
│   │   └── my-post-slug/
│   │       └── +page.svx   # TOML frontmatter + Markdown
│   ├── projects/           # Project entries (one .svx per project)
│   │   └── my-project.svx
│   └── tutorials/          # Tutorial entries
├── src/
│   ├── routes/             # SvelteKit page routes
│   │   ├── +page.svelte    # Homepage (bento grid, commits, blog preview)
│   │   ├── +page.server.ts # Server-side data loading (featured projects, commits, posts)
│   │   ├── about/          # About page (bio, hobbies, dog pics)
│   │   ├── blogs/          # Blog listing + individual posts
│   │   ├── projects/       # Project listing + individual projects
│   │   ├── pics/           # Photo gallery (masonry grid + lightbox)
│   │   ├── tutorials/      # Tutorial listing + individual tutorials
│   │   └── socials/        # Social links page
│   ├── lib/
│   │   ├── api/
│   │   │   └── commits.ts  # GitHub Events API → recent commits widget
│   │   ├── config/
│   │   │   ├── common.ts   # Site identity (name, URLs, socials, email)
│   │   │   ├── pages.ts    # Homepage config + experience timeline
│   │   │   ├── navItems.ts # Navigation bar items
│   │   │   └── redirects.ts# Short URL redirects (/github, /linkedin, etc.)
│   │   ├── content/
│   │   │   ├── posts.ts    # Blog post loader + validation
│   │   │   └── projects.ts # Project loader + validation
│   │   ├── hooks/
│   │   │   └── use-lightbox-nav.svelte.ts  # Lightbox keyboard/touch navigation
│   │   └── utils/
│   │       ├── date.ts     # Date formatting utilities
│   │       ├── edge-cache.ts # KV cache helpers (Cloudflare Workers KV)
│   │       ├── jsonld.ts   # Structured data / JSON-LD generation
│   │       ├── pagemeta.ts # Page meta tag generation
│   │       └── performance.ts # Performance measurement helpers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.svelte    # Top navigation bar
│   │   │   ├── Footer.svelte    # Footer with time-on-site, commit SHA, socials
│   │   │   ├── Sidebar.svelte   # Mobile sidebar navigation
│   │   │   ├── Featured.svelte  # Featured project cards
│   │   │   └── Breadcrumb.svelte # Breadcrumb navigation
│   │   ├── bento/
│   │   │   ├── LocationMap.svelte  # Leaflet map on homepage
│   │   │   └── TimeWaster.svelte   # Fun interactive widget
│   │   ├── Lightbox.svelte      # Photo lightbox with EXIF overlay
│   │   ├── Experience.svelte    # Experience timeline component
│   │   ├── BackgroundEffect.svelte  # Animated background
│   │   ├── CommitDiffWidget.svelte  # Language breakdown bar (legacy)
│   │   └── themes/
│   │       ├── ThemeSelector.svelte  # Catppuccin theme picker
│   │       └── ColorSelector.svelte  # Accent color picker
│   └── content/images/
│       ├── manifest.ts       # Auto-generated photo manifest (gen-manifest.ts)
│       └── *.jpg             # Source photos for /pics page
├── static/
│   ├── pics/                 # Photos for /pics gallery (copied by gen-manifest.ts)
│   ├── projects/             # Project images (WebP, one subfolder per project)
│   ├── images/
│   │   ├── avatar.webp       # Your profile picture
│   │   └── lara/             # Dog pictures
│   ├── logos/                # Experience timeline logos (SVG/PNG)
│   ├── css/                  # Theme CSS (Catppuccin + colors)
│   ├── favicon.png           # Site favicon
│   └── ferret.png            # Original favicon source
├── scripts/
│   ├── gen-manifest.ts       # Generates /pics manifest (reads EXIF, copies to static/)
│   ├── sanitize-exif.ts      # Strips GPS data from JPEGs before commit
│   └── project-repos.sh      # Lists GitHub repos for project image generation
├── Makefile                  # Convenience shortcuts for common commands
├── .husky/pre-commit         # Pre-commit hook (EXIF sanitizing + prettier)
└── wrangler.toml             # Cloudflare Pages config
```

## How To…

### Add a Blog Post

1. Create a folder: `content/posts/your-post-slug/`
2. Create `+page.svx` inside it with TOML frontmatter (uses `~~~` not `---`):

```toml
~~~
title = { text = "Your Post Title" }
description = "A short description for SEO and cards."
published_at = "2026-01-15"
tags = ["tag1", "tag2"]
~~~

Write your post in Markdown here.
```

- `title` must be `{ text = "..." }` (an object with a `text` key)
- `published_at` controls visibility — if missing, the post stays as a draft
- Tags appear as clickable badges on the post page

### Add a Project

Create `content/projects/my-project.svx`:

```toml
~~~
title = "My Project"
description = "Short description for cards and SEO."
date = "2026-01-15"
published = true
featured = true          # set true to show on homepage
tags = ["react", "typescript"]
links = [
  { text = "GitHub", url = "https://github.com/...", icon = "github" },
  { text = "Live Demo", url = "https://...", icon = "external" },
]
~~~
```

Available link icons: `github`, `external`, `docs`, `code`, `devpost`

### Add Project Images

1. Save images to `static/projects/project-name/` (WebP recommended)
2. Reference them in the project's `.svx` with standard Markdown:
   ```md
   ![Screenshot](/projects/project-name/screenshot.webp)
   ```

### Add Photos to /pics

1. Drop photos (JPEG) into `src/content/images/`
2. Run the manifest generator:
   ```bash
   bun run scripts/gen-manifest.ts
   ```
3. This copies photos to `static/pics/` and regenerates `src/content/images/manifest.ts` with EXIF data (camera, date, aperture, ISO)
4. The /pics page shows a masonry grid with a lightbox — no filters, no tags
5. Delete old photos from both `src/content/images/` and `static/pics/`, then re-run the script

> The old `sync-pics.ts` was a heavy R2 upload pipeline that crashed on large photo collections. The new `gen-manifest.ts` only reads metadata — no resizing, no uploads.

### Change Site Identity

Edit [`src/lib/config/common.ts`](src/lib/config/common.ts):

- `name` — Your display name
- `url` — Production URL
- `description` — Meta description / tagline
- `seo` — Author name, birth date, location
- `out` — GitHub, LinkedIn, email, Instagram URLs
- `Socials` array — Which social icons appear in the footer and /socials page

### Change Navigation

Edit [`src/lib/config/navItems.ts`](src/lib/config/navItems.ts):

- `mainNavItems` — Items in the top nav bar
- `moreNavItems` — Items in the sidebar "more" section

### Add Experience Timeline Entries

Edit [`src/lib/config/pages.ts`](src/lib/config/pages.ts) — the `experienceTimeline` array:

```ts
{
    company: 'Company Name',
    role: 'Your Role',
    url: 'https://...',
    logoUrl: '/logos/company-logo.svg',  // put logo in static/logos/
    logoAlt: 'Company Logo',
    startDate: '2025-01-01',
    endDate: '2025-06-01',  // optional — omit for current roles
    details: 'What you did there.',
    logoScale: 1.0  // optional scaling
}
```

### Change the Homepage Hero Text

Edit [`src/routes/+page.svelte`](src/routes/+page.svelte).

### Add Short URL Redirects

Edit [`src/lib/config/redirects.ts`](src/lib/config/redirects.ts):

```ts
{ paths: ['/myalias'], url: 'https://example.com' }
```

## The Makefile

The [`Makefile`](Makefile) is a convenience wrapper — everything in it can be run directly with `bun`:

| Command      | What it does                       |
| ------------ | ---------------------------------- |
| `make dev`   | Starts dev server (`bun run dev`)  |
| `make build` | Production build (`bun run build`) |
| `make help`  | Lists all available targets        |

It also has legacy targets for `generate-project-images` and `sync-pics` that reference scripts no longer used. The Makefile is entirely optional — all commands work without it.

## Pre-commit Hook

[`.husky/pre-commit`](.husky/pre-commit) runs on every commit:

1. Strips GPS EXIF data from staged JPEGs (privacy)
2. Runs Prettier on all staged files

## Tech Stack

- **Framework**: SvelteKit (SSR + static adapter for Cloudflare Pages)
- **Content**: mdsvex (Markdown + Svelte in `.svx` files, TOML frontmatter)
- **Styling**: Tailwind CSS v4 + Catppuccin theme
- **Deployment**: Cloudflare Pages
- **Package Manager**: Bun
- **Image Processing**: Sharp (for manifest generation and avatar optimization)

---

## Credits

This project is a fork of [**nyx**](https://github.com/JasonLovesDoggo/nyx) by [Jason Cameron](https://github.com/JasonLovesDoggo) — a beautifully designed SvelteKit portfolio template. It has been heavily customized for my own needs: replaced the R2 image pipeline with local static serving, swapped katib for GitHub's Events API, removed tags/filters from the photo gallery, added my own content and photography, and tailored the design to fit my personal brand.
