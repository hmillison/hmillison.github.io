# Editing site content

The site is built with Astro. Page markup lives in `src/pages/index.astro`, the shared HTML shell is `src/layouts/BaseLayout.astro`, and editable copy plus collections live in `src/data/site-content.js`.

## Add a work item

Add an object to `work.items`. Use `period` for display dates such as `Fall 2023` or `Present`; use `href` for an optional project link.

```js
{
  title: 'Project or problem area',
  period: 'Fall 2023',
  summary: 'A short, factual description.',
  href: 'https://example.com', // optional
  external: true, // optional; opens in a new tab
  tags: ['TypeScript', 'Maps'], // optional
}
```

## Add a note or recipe

Add an object to the corresponding `notes.items` or `recipes.items` array:

```js
{
  title: 'A short title',
  date: '2026-10-10',
  summary: 'A one- or two-sentence description.',
  href: '/notes/a-short-title.html',
  tags: ['design', 'web'], // optional
}
```

Empty Notes and Recipes sections display their configured `emptyMessage`. Remove that message or set it to an empty string if you want an empty section hidden.

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
