/*
 * Edit this file to change the site's words and add entries.
 * The renderer automatically builds navigation and sections from this object.
 * See CONTENT.md for item examples.
 */
window.SITE_CONTENT = {
  identity: {
    name: 'Henry Millison',
    firstName: 'Henry',
    lastName: 'Millison',
    command: 'henry@new-york:~$ whoami',
    headline: 'Hello! My name is Henry!',
    introduction:
      'I’m a software engineer in the greatest city in the world, New York, working with businesses of all shapes and sizes to solve their problems with technology.',
    note: 'This site is intentionally under construction forever.',
  },

  links: [
    {label: 'Email', href: 'mailto:me@henrymillison.com'},
    {label: 'GitHub', href: 'https://github.com/hmillison', external: true},
    {label: 'LinkedIn', href: 'https://www.linkedin.com/in/hmillison/', external: true},
  ],

  work: {
    id: 'work',
    navLabel: 'Work',
    title: 'Things I built for money',
    items: [
      {
        title: 'Distributed systems',
        summary: 'High-performance interfaces for monitoring systems at scale.',
      },
      {
        title: 'Financial software',
        summary: 'Anti-money-laundering applications for investment banks.',
      },
      {
        title: 'Planning tools',
        summary: 'Social campaign software for some of the world’s biggest brands.',
      },
    ],
  },

  about: {
    id: 'about',
    navLabel: 'About',
    title: 'Design and development belong in the same room.',
    paragraphs: [
      'I like the part where design and development overlap: making complicated systems understandable, useful, and maybe even pleasant. My academic background is in Human–Computer Interaction and Computer Science, which means I have opinions about both the interface and the code underneath it.',
      'I specialize in React, Vue, and TypeScript, plus the surrounding front-end ecosystem. I also work across the stack when that is what getting the job done requires.',
    ],
    technologies: ['React', 'Vue', 'TypeScript', 'HCI', 'Design systems', 'The web'],
  },

  streetSigns: {
    label: 'Henry’s municipal typography watch',
    instructions: 'Click the signs to tour several fictional intersections.',
    aside: 'If your street sign uses Comic Sans or Papyrus, I would genuinely like to see it.',
    intersections: [
      ['HENRY ST', 'COMIC SANS WAY'],
      ['MILLISON AV', 'PAPYRUS PLAZA'],
      ['HCI BLVD', 'VIEW SOURCE LN'],
      ['QUEENS', 'THE GREATEST CITY'],
    ],
  },

  notes: {
    id: 'notes',
    navLabel: 'Notes',
    title: 'Notes',
    emptyMessage: 'Nothing published here yet.',
    items: [],
  },

  recipes: {
    id: 'recipes',
    navLabel: 'Recipes',
    title: 'Recipes',
    emptyMessage: 'Nothing published here yet.',
    items: [],
  },

  contact: {
    id: 'contact',
    navLabel: 'Contact',
    title: 'Sign my guestbook*',
    copy: 'Want to talk about technology, design, New York, or a badly typeset street sign?',
    linkLabel: 'Send electronic mail',
    finePrint: '*There is no database. This opens your email client, as nature intended.',
    href: 'mailto:me@henrymillison.com',
  },

  footer: {
    location: 'Hand-coded in New York',
    legal: 'All wrongs reserved.',
    disclaimer: 'No cookies. No tracking. No inspirational newsletter.',
  },
};
