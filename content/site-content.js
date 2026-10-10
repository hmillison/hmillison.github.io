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
      'I’m a software engineer living in the greatest city in the world, working with businesses of all shapes and sizes to solve their problems with technology.',
    note: 'Design, development, and the occasionally questionable street sign.',
  },

  links: [
    {label: 'Email', href: 'mailto:me@henrymillison.com'},
    {label: 'GitHub', href: 'https://github.com/hmillison', external: true},
    {label: 'LinkedIn', href: 'https://www.linkedin.com/in/hmillison/', external: true},
  ],

  work: {
    id: 'work',
    navLabel: 'Work',
    eyebrow: 'Selected problem areas',
    title: 'Things I’ve worked on',
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
    eyebrow: 'A little more context',
    title: 'Design and development belong in the same room.',
    paragraphs: [
      'My academic background is in Human–Computer Interaction and Computer Science. I care about the implementation, the interface, and the gap between what a system does and what a person thinks it does.',
      'I specialize in React, Vue, and TypeScript, but I’m happy working across the stack when that is what the problem needs.',
    ],
    technologies: ['React', 'Vue', 'TypeScript', 'HCI', 'Design systems', 'The web'],
  },

  streetSigns: {
    label: 'Municipal typography watch',
    instructions: 'Click the signs to tour fictional intersections.',
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
    eyebrow: 'From the notebook',
    title: 'Notes',
    emptyMessage: 'Nothing published here yet.',
    items: [],
  },

  recipes: {
    id: 'recipes',
    navLabel: 'Recipes',
    eyebrow: 'Things worth making again',
    title: 'Recipes',
    emptyMessage: 'Nothing published here yet.',
    items: [],
  },

  contact: {
    id: 'contact',
    navLabel: 'Contact',
    eyebrow: 'Electronic mail encouraged',
    title: 'Want to talk?',
    copy: 'Technology, design, New York, or a badly typeset street sign are all acceptable reasons to reach out.',
    linkLabel: 'Reach out',
    href: 'mailto:me@henrymillison.com',
  },

  footer: {
    location: 'Hand-coded in New York',
  },
};
