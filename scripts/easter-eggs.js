const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const nycTime = document.querySelector('#nyc-time');
const footerYear = document.querySelector('#footer-year');
const visitCount = document.querySelector('#visit-count');
const signButton = document.querySelector('.street-sign');
const mainSign = document.querySelector('.street-sign-main');
const crossSign = document.querySelector('.street-sign-cross');
const welcomeMessage = document.querySelector('.welcome-message');
const sparkButton = document.querySelector('.spark-button');
const sparkLayer = document.querySelector('.spark-layer');

const signs = [
  ['HENRY ST', 'COMIC SANS WAY'],
  ['MILLISON AV', 'PAPYRUS PLAZA'],
  ['HCI BLVD', 'VIEW SOURCE LN'],
  ['QUEENS', 'THE GREATEST CITY'],
];

const greetings = [
  'Welcome, internet traveler.',
  'Thank you for visiting my web site.',
  'This page is optimized for human beings.',
  'Please excuse the digital dust.',
  'You are now entering the technology zone.',
];

let signIndex = 0;
let greetingIndex = 0;

function setTheme(theme) {
  const nextTheme = theme === 'boring' ? 'boring' : 'oldweb';
  root.dataset.theme = nextTheme;
  localStorage.setItem('henry-theme', nextTheme);
  themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'boring'));

  const color = nextTheme === 'boring' ? '#f4f1e8' : '#000000';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
}

function toggleTheme() {
  setTheme(root.dataset.theme === 'oldweb' ? 'boring' : 'oldweb');
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

function updateVisitCount() {
  if (!visitCount) return;

  const prior = Number.parseInt(localStorage.getItem('henry-visits') || '0', 10);
  const visits = Number.isFinite(prior) ? prior + 1 : 1;
  localStorage.setItem('henry-visits', String(visits));
  visitCount.textContent = String(visits).padStart(6, '0');
}

function rotateSign() {
  signIndex = (signIndex + 1) % signs.length;
  const [main, cross] = signs[signIndex];
  mainSign.textContent = main;
  crossSign.textContent = cross;
}

function rotateGreeting() {
  if (!welcomeMessage) return;

  greetingIndex = (greetingIndex + 1) % greetings.length;
  welcomeMessage.textContent = greetings[greetingIndex];
}

function addSpark(x, y) {
  if (!sparkLayer || root.dataset.theme === 'boring') return;

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
  rotateGreeting();
});

document.addEventListener('keydown', event => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

  if (!isTyping && event.key.toLowerCase() === 'b') {
    toggleTheme();
  }
});

setTheme(root.dataset.theme);
updateClock();
updateVisitCount();
setInterval(updateClock, 30_000);

if (footerYear) {
  footerYear.textContent = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  }).format(new Date());
}
