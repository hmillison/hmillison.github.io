# Editing site content

The site is built with Astro. Page markup lives in `src/pages/`, the shared HTML shell is `src/layouts/BaseLayout.astro`, and editable homepage copy lives in `src/data/site-content.js`.

## Add a work item

Add an object to `work.items` in `src/data/site-content.js`. Use `period` for display dates such as `Fall 2023` or `Present`; use `href` for an optional project link.

```js
{
  title: 'Project or problem area',
  period: 'Fall 2023',
  summary: 'A short, factual description.',
  href: 'https://example.com', // optional
  external: true, // optional; opens in a new tab
}
```

## Add a note

Create a Markdown file in `src/content/notes/`. Its filename becomes the URL slug: `weekend-in-montreal.md` builds `/notes/weekend-in-montreal`.

```md
---
title: A short title
summary: A one- or two-sentence description.
tags:
  - travel
  - montreal
publishedAt: 2026-10-11 # optional
draft: false # optional; defaults to false
---

Write the note in Markdown here.
```

Every tag automatically gets an archive page at `/tags/<tag>`. Keep tags lowercase and URL-safe. Notes marked `draft: true` are excluded from note, tag, and detail pages.

The schema for note frontmatter lives in `src/content.config.ts`. Astro validates it during checks and builds.

## Homepage extras

The construction note, badge and visitor-counter wording are in `src/data/site-content.js`. The counter increments in this browser's `localStorage`; it is not sent to a server.

## Build and preview

```sh
npm ci
npm run check
npm run build
npm test
npm run preview
```

GitHub Actions runs the checks, builds static HTML into `dist/`, then deploys that artifact to GitHub Pages. Keep `public/CNAME` in sync with the domain configured in GitHub Pages.
