(() => {
  const content = window.SITE_CONTENT;
  const root = document.querySelector('#site-root');
  const COLLECTION_KEYS = ['notes', 'recipes'];

  if (!content || !root) return;

  const escapeHtml = value =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const renderExternalAttributes = item =>
    item.external ? ' target="_blank" rel="noopener noreferrer"' : '';

  const renderTags = tags => {
    if (!Array.isArray(tags) || tags.length === 0) return '';
    return `<ul class="entry-tags" aria-label="Tags">${tags
      .map(tag => `<li>${escapeHtml(tag)}</li>`)
      .join('')}</ul>`;
  };

  const renderEntry = item => {
    const title = item.href
      ? `<a href="${escapeHtml(item.href)}"${renderExternalAttributes(item)}>${escapeHtml(item.title)}</a>`
      : escapeHtml(item.title);
    const date = item.date
      ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time>`
      : '';

    return `
      <article>
        <div class="entry-heading">
          <h3>${title}</h3>
          ${date}
        </div>
        <p>${escapeHtml(item.summary)}</p>
        ${renderTags(item.tags)}
      </article>`;
  };

  const renderCollection = collection => {
    const hasItems = Array.isArray(collection.items) && collection.items.length > 0;
    if (!hasItems && !collection.emptyMessage) return '';

    const body = hasItems
      ? `<div class="collection-list">${collection.items.map(renderEntry).join('')}</div>`
      : `<p class="empty-message">${escapeHtml(collection.emptyMessage)}</p>`;

    return `
      <section class="section collection-section" id="${escapeHtml(collection.id)}" aria-labelledby="${escapeHtml(collection.id)}-title">
        <header class="section-header">
          <h2 id="${escapeHtml(collection.id)}-title">${escapeHtml(collection.title)}</h2>
        </header>
        ${body}
      </section>`;
  };

  const navSections = [content.work, content.about]
    .concat(COLLECTION_KEYS.map(key => content[key]))
    .concat(content.contact)
    .filter(section => section && (section.items?.length || section.emptyMessage || !section.items));

  const navigation = navSections
    .map(section => `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.navLabel)}</a>`)
    .join('');

  const heroLinks = content.links
    .map(
      link => `
        <li>
          <a href="${escapeHtml(link.href)}"${renderExternalAttributes(link)}>${escapeHtml(link.label)}</a>
        </li>`,
    )
    .join('');

  const workItems = content.work.items.map(renderEntry).join('');
  const aboutParagraphs = content.about.paragraphs
    .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
    .join('');
  const technologies = content.about.technologies
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join('');
  const collections = COLLECTION_KEYS.map(key => renderCollection(content[key])).join('');
  const firstIntersection = content.streetSigns.intersections[0];

  root.innerHTML = `
    <div class="site-shell">
      <header class="site-header" id="top">
        <a class="wordmark" href="#top" aria-label="${escapeHtml(content.identity.name)}, home">
          <span>${escapeHtml(content.identity.firstName)}</span>
          <span>${escapeHtml(content.identity.lastName)}</span>
        </a>
        <nav aria-label="Primary navigation">${navigation}</nav>
        <button class="theme-toggle" type="button" aria-pressed="false">
          <span class="weird-label">Plain version</span>
          <span class="plain-label">Fun version</span>
        </button>
      </header>

      <main id="main">
        <section class="hero" aria-labelledby="hero-title">
          <button class="spark-button" type="button" title="Add stars" aria-label="Add stars"></button>
          <p class="command"><span>${escapeHtml(content.identity.command.split(':')[0])}</span>:${escapeHtml(content.identity.command.split(':').slice(1).join(':'))}</p>
          <h1 id="hero-title">${escapeHtml(content.identity.headline)}</h1>
          <p class="hero-copy">${escapeHtml(content.identity.introduction)}</p>
          <p class="hero-note">${escapeHtml(content.identity.note)}</p>
          <ul class="hero-links">${heroLinks}</ul>
        </section>

        <section class="section work-section" id="${escapeHtml(content.work.id)}" aria-labelledby="work-title">
          <header class="section-header">
            <h2 id="work-title">${escapeHtml(content.work.title)}</h2>
          </header>
          <div class="work-list">${workItems}</div>
        </section>

        <section class="section about-section" id="${escapeHtml(content.about.id)}" aria-labelledby="about-title">
          <div class="about-copy">
            <header class="section-header">
              <h2 id="about-title">${escapeHtml(content.about.title)}</h2>
            </header>
            ${aboutParagraphs}
            <ul class="technology-list" aria-label="Technologies and interests">${technologies}</ul>
          </div>
          <div class="sign-corner">
            <p class="sign-label">${escapeHtml(content.streetSigns.label)}</p>
            <button class="street-sign" type="button" title="Change the intersection">
              <span class="street-sign-main">${escapeHtml(firstIntersection[0])}</span>
              <span class="street-sign-cross">${escapeHtml(firstIntersection[1])}</span>
            </button>
            <p>${escapeHtml(content.streetSigns.instructions)}</p>
            ${content.streetSigns.aside ? `<p class="sign-aside">${escapeHtml(content.streetSigns.aside)}</p>` : ''}
          </div>
        </section>

        ${collections}

        <section class="contact-section" id="${escapeHtml(content.contact.id)}" aria-labelledby="contact-title">
          <div>
            <h2 id="contact-title">${escapeHtml(content.contact.title)}</h2>
          </div>
          <div class="contact-copy">
            <p>${escapeHtml(content.contact.copy)} <a href="${escapeHtml(content.contact.href)}">${escapeHtml(content.contact.linkLabel)}</a>.</p>
            ${content.contact.finePrint ? `<p class="contact-fineprint">${escapeHtml(content.contact.finePrint)}</p>` : ''}
          </div>
        </section>
      </main>

      <footer>
        <p>${escapeHtml(content.footer.location)} · <time id="nyc-time">Eastern Time</time></p>
        <p>© <span id="footer-year"></span> ${escapeHtml(content.identity.name)}. ${escapeHtml(content.footer.legal || '')}</p>
        <p>${escapeHtml(content.footer.disclaimer || '')}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>`;
})();
