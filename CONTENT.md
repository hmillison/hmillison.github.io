# Editing site content

All editable copy and section entries live in:

```text
content/site-content.js
```

`index.html` is only the page shell. Navigation and sections are generated automatically.

## Add a work item

Add an object to `work.items`. Use `period` for human date ranges such as `Fall 2023` or `Present`; use `href` for an optional project link.

```js
{
  title: 'Project or problem area',
  period: 'Fall 2023', // optional; use date for machine-readable ISO dates in Notes/Recipes
  summary: 'A short, factual description.',
  href: 'https://example.com', // optional
  external: true, // optional; opens in a new tab
  tags: ['TypeScript', 'Maps'], // optional
}
```

## Add a note

Add an object to `notes.items`:

```js
{
  title: 'Why this interface works',
  date: '2026-10-10',
  summary: 'A one- or two-sentence description.',
  href: '/notes/why-this-interface-works.html',
  tags: ['design', 'web'], // optional
}
```

## Add a recipe

Add an object to `recipes.items`:

```js
{
  title: 'Recipe title',
  date: '2026-10-10',
  summary: 'What it is and why it is worth making.',
  href: '/recipes/recipe-title.html',
  tags: ['dinner', 'seafood'], // optional
}
```

Empty Notes and Recipes sections display their configured `emptyMessage`. Remove that message or set it to an empty string if you want an empty section hidden.

## Homepage notices

The construction note lives in `identity.note`. Its `NEW!` label and the visitor-counter copy live in `homepageExtras`. The counter increments in this browser's `localStorage`; it is not sent to a server.

## Add another collection

1. Copy the shape used by `notes` or `recipes` in `content/site-content.js`.
2. Add the collection key to `COLLECTION_KEYS` in `scripts/render-site.js`.
3. The renderer will add its navigation link and cards.
