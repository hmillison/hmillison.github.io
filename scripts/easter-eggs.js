const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const nycTime = document.querySelector('#nyc-time');
const footerYear = document.querySelector('#footer-year');
const signButton = document.querySelector('.street-sign');
const mainSign = document.querySelector('.street-sign-main');
const crossSign = document.querySelector('.street-sign-cross');
const sparkButton = document.querySelector('.spark-button');
const sparkLayer = document.querySelector('.spark-layer');

const signs = window.SITE_CONTENT?.streetSigns?.intersections || [
  ['HENRY ST', 'COMIC SANS WAY'],
];

let signIndex = 0;

function setTheme(theme) {
  const nextTheme = theme === 'plain' ? 'plain' : 'weird';
  root.dataset.theme = nextTheme;
  localStorage.setItem('henry-theme', nextTheme);
  themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'plain'));

  if (nextTheme === 'plain') {
    sparkLayer?.replaceChildren();
  }

  const color = nextTheme === 'plain' ? '#f4f1e8' : '#0000a8';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
}

function toggleTheme() {
  setTheme(root.dataset.theme === 'weird' ? 'plain' : 'weird');
}

function updateClock() {
  if (!nycTime) return;

  nycTime.dateTime = new Date().toISOString();
  nycTime.textContent = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date());
}

function rotateSign() {
  signIndex = (signIndex + 1) % signs.length;
  const [main, cross] = signs[signIndex];
  mainSign.textContent = main;
  crossSign.textContent = cross;
}

function addSpark(x, y) {
  if (!sparkLayer || root.dataset.theme === 'plain') return;

  const spark = document.createElement('span');
  spark.className = 'click-spark';
  spark.textContent = ['★', '✦', '+'][Math.floor(Math.random() * 3)];
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  sparkLayer.append(spark);
  spark.addEventListener('animationend', () => spark.remove(), {once: true});
}

themeToggle?.addEventListener('click', toggleTheme);
signButton?.addEventListener('click', rotateSign);
sparkButton?.addEventListener('click', event => {
  const rect = event.currentTarget.getBoundingClientRect();
  for (let index = 0; index < 7; index += 1) {
    window.setTimeout(() => {
      addSpark(
        rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
        rect.top + rect.height / 2 + (Math.random() - 0.5) * 50,
      );
    }, index * 50);
  }
});

document.addEventListener('keydown', event => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

  if (!isTyping && event.key.toLowerCase() === 'p') {
    toggleTheme();
  }
});

setTheme(root.dataset.theme);
updateClock();
setInterval(updateClock, 30_000);

if (footerYear) {
  footerYear.textContent = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  }).format(new Date());
}
