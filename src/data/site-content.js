/*
 * Edit this file to change the site's words and add entries.
 * Astro builds sections and navigation from this data.
 * See CONTENT.md for examples.
 */
const siteContent = {
  identity: {
    name: 'Henry Millison',
    firstName: 'Henry',
    lastName: 'Millison',
    headline: 'Hello! My name is Henry!',
    introduction:
      'I’m a software engineering consultant in the greatest city in the world, New York, working with businesses of all shapes and sizes to solve their problems with technology.',
    note: 'This site is intentionally under construction forever.',
  },

  links: [
    {label: 'Email', href: 'mailto:me@henrymillison.com'},
    {label: 'GitHub', href: 'https://github.com/hmillison', external: true},
    {label: 'LinkedIn', href: 'https://www.linkedin.com/in/hmillison/', external: true},
  ],

  homepageExtras: {
    constructionBadge: 'NEW!',
    visitorTitle: 'Visitor counter',
    visitorIntro: 'You are visitor from this browser:',
    visitorDisclaimer: 'This number is real, local, and statistically meaningless.',
  },

  work: {
    id: 'work',
    navLabel: 'Work',
    title: 'Things I built for money',
    items: [
      {
        title: 'Citadel Securities Research Platform',
        period: 'July 2023 – July 2025',
        summary: 'Led UI development for a quantitative research platform.',
      },
      {
        title: 'Citadel Securities',
        period: 'Present',
        summary: 'Building a next generation global systematic trading platform.',
      },
      {
        title: 'CreditSights Mobile App Rebuild',
        period: 'Fall 2023',
        href: 'https://apps.apple.com/us/app/creditsights/id1359282941?platform=iphone',
        external: true,
        summary: 'Led a two-developer rebuild of the iOS and Android apps; worked with product stakeholders and the CreditSights team to gather API requirements.',
      },
      {
        title: 'Target 100 Companion App',
        period: 'Summer 2023',
        href: 'https://apps.apple.com/us/app/target100-companion/id1623859588',
        external: true,
        summary: 'Built the React Native apps for iOS and Android, integrated with the existing web product, and collaborated on GraphQL APIs backed by Rails.',
      },
      {
        title: 'Reportabot by Reportable',
        period: 'April 2023',
        href: 'https://newsroom.reportablenews.com/pr/reportable-launches-reportabot-an-ai-powered-tool-to-generate-news-releases-in-under-60-seconds',
        external: true,
        summary: 'Built a ChatGPT integration that lets Reportable users generate press releases.',
      },
      {
        title: 'Obscura Relaunch',
        period: 'May 2022',
        href: 'https://obscura.io/',
        external: true,
        summary: 'Led a ground-up rebuild of ObscuraDAO’s NFT marketplace and moved site updates into a CMS the nontechnical team could manage.',
      },
      {
        title: 'Creative Queue by Spark Projects',
        period: 'February 2022',
        href: 'https://creativequeue.io/',
        external: true,
        summary: 'Full-stack development and ongoing maintenance of a complex interactive app for photographers as founders onboarded customers.',
      },
      {
        title: 'CreditKarma Email Marketing CMS',
        period: 'December 2021',
        summary: 'Led a CMS and component library for no-code marketing emails. The 2021 soft launch began sending campaigns to 10% of CreditKarma’s 100M+ users.',
      },
      {
        title: 'Chronosphere General Availability',
        period: 'January 2021',
        href: 'https://chronosphere.io/news/chronosphere-announces-ga-and-series-b/',
        external: true,
        summary: 'As the first frontend hire, rebuilt the monitoring platform with a three-person team and launched in six months, focusing on big-data visualization and alerting.',
      },
      {
        title: 'Zagat Stories',
        period: 'February 2020',
        href: 'https://zagat-stories.chase.com/',
        external: true,
        summary: 'Led development of a dynamic, headless-WordPress site for branded stories, serving millions of monthly visitors.',
      },
      {
        title: 'Landscape by Sprout Social',
        period: 'March 2016',
        href: 'https://sproutsocial.com/landscape/',
        external: true,
        summary: 'Took a hack-week prototype to production in six weeks and built an image-resizing tool that exports a ZIP of ready-to-use images.',
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

export default siteContent;
