import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const cssFiles = await readdir(new URL('../dist/_astro/', import.meta.url));
const css = (await Promise.all(cssFiles.filter((file) => file.endsWith('.css')).map((file) => readFile(join(new URL('../dist/_astro/', import.meta.url).pathname, file), 'utf8')))).join('\n');

test('build emits the complete work history as static HTML', () => {
  const workStart = html.indexOf('id="work"');
  const workEnd = html.indexOf('</section>', workStart);
  const work = html.slice(workStart, workEnd);
  assert.equal((work.match(/<article>/g) || []).length, 11);
  assert.equal((html.match(/Citadel Securities/g) || []).length, 2);
  assert.match(html, /July 2023/);
  assert.match(html, /July 2025/);
  assert.match(html, /Building a next generation global systematic trading platform/);
  assert.ok(html.indexOf('Citadel Securities</h3>') < html.indexOf('Citadel Securities Research Platform'));
  assert.doesNotMatch(html, /Covered by NDA/i);
  assert.doesNotMatch(html, /whoami/);
  assert.match(html, /href="https:\/\/newsroom\.reportablenews\.com\/pr\/reportable-launches-reportabot-an-ai-powered-tool-to-generate-news-releases-in-under-60-seconds"/);
  assert.match(html, /Landscape by Sprout Social/);
  assert.match(html, /Fall 2023/);
});

test('personal counter and playful construction notice are rendered', () => {
  assert.match(html, /under construction forever/i);
  assert.match(html, /Visitor counter/);
  assert.match(html, /id="visit-count"/);
});

test('star bursts use an unobtrusive repeated-click gesture', async () => {
  const {createRepeatedClickTrigger} = await import('../src/scripts/repeated-clicks.js');
  const registerClick = createRepeatedClickTrigger({clicks: 3, windowMs: 600});

  assert.equal(registerClick(0), false);
  assert.equal(registerClick(200), false);
  assert.equal(registerClick(400), true);
  assert.equal(registerClick(500), false, 'the detector resets after a burst');
  assert.equal(registerClick(1_500), false);
  assert.equal(registerClick(2_200), false, 'clicks outside the time window do not trigger');
});

test('the visible star control is removed and reduced motion is respected', async () => {
  const source = await readFile(new URL('../src/scripts/easter-eggs.js', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /spark-button|Add stars/i);
  assert.match(source, /document\.addEventListener\(['"]click['"]/);
  assert.match(source, /prefers-reduced-motion/);
});

test('visitor counter is in the footer instead of beside the introduction', () => {
  const footerStart = html.indexOf('<footer>');
  const footerEnd = html.indexOf('</footer>', footerStart);
  const footer = html.slice(footerStart, footerEnd);
  const beforeFooter = html.slice(0, footerStart);
  assert.match(footer, /id="visit-count"/);
  assert.doesNotMatch(beforeFooter, /id="visit-count"/);
});

test('the build includes decorative tabby and tuxedo cats with reduced-motion support', () => {
  assert.match(html, /class="site-cat site-cat--tabby"/);
  assert.match(html, /class="site-cat site-cat--tuxedo"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /cat-float/);
});

test('the cat mascots carry the photographed tabby and tuxedo markings', () => {
  assert.match(html, /class="cat-tabby-muzzle"/);
  assert.match(html, /class="cat-tuxedo-blaze"/);
  assert.match(html, /class="cat-tuxedo-muzzle"/);
  assert.equal((html.match(/class="cat-eye"/g) || []).length, 4);
});

test('cats run across the homepage top bar without a name logo', () => {
  const headerStart = html.indexOf('<header class="site-header"');
  const headerEnd = html.indexOf('</header>', headerStart);
  const header = html.slice(headerStart, headerEnd);
  const heroStart = html.indexOf('<section class="hero"');
  const heroEnd = html.indexOf('</section>', heroStart);
  const hero = html.slice(heroStart, heroEnd);
  assert.match(header, /class="cat-runway"[\s\S]*class="site-cats"/);
  assert.doesNotMatch(header, /class="wordmark"/);
  assert.doesNotMatch(header, /Henry Millison/);
  assert.doesNotMatch(hero, /class="site-cats"/);
  assert.match(css, /@keyframes cat-run/);
  assert.match(css, /animation:[^;]*(?:alternate[^;]*cat-run|cat-run[^;]*alternate)/);
});
test('the build is static and contains no client-side template placeholders', () => {
  assert.doesNotMatch(html, /\{\{[^]*?\}\}/);
  assert.match(html, /id="main"/);
  assert.match(html, /\/scripts\/starfield\.js/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test('the homepage links to a separate recipe index instead of listing every recipe', () => {
  assert.match(html, /<a href="\/recipes">Recipes<\/a>/);
  assert.doesNotMatch(html, /href="\/recipes\/mapo-tofu"/);
  assert.doesNotMatch(html, /href="\/recipes\/braised-short-rib-shallot-pickle"/);
  assert.doesNotMatch(html, /href="\/recipes\/rice-cracker-salad"/);
  assert.doesNotMatch(html, /href="\/recipes\/soy-sauce-chicken-over-rice"/);
});

test('recipe index lists the supplied recipes as blog-style entries', async () => {
  const index = await readFile(new URL('../dist/recipes.html', import.meta.url), 'utf8');
  for (const slug of ['mapo-tofu', 'braised-short-rib-shallot-pickle', 'rice-cracker-salad', 'soy-sauce-chicken-over-rice']) {
    assert.match(index, new RegExp(`href="/recipes/${slug}/?"`));
  }
  assert.match(index, /Mapo tofu/);
  assert.match(index, /Braised Short Rib \+ Shallot Pickle/);
  assert.match(index, /Rice Cracker Salad/);
  assert.match(index, /Soy Sauce Chicken over Rice/);
});

test('recipe detail pages return to the index and omit the kitchen-notes kicker', async () => {
  const recipe = await readFile(new URL('../dist/recipes/mapo-tofu.html', import.meta.url), 'utf8');
  assert.match(recipe, /href="\/recipes"/);
  assert.doesNotMatch(recipe, /Henry.s kitchen notes/);
});

test('recipe pages contain the supplied ingredients and instructions', async () => {
  const recipePages = await Promise.all([
    'mapo-tofu',
    'braised-short-rib-shallot-pickle',
    'rice-cracker-salad',
    'soy-sauce-chicken-over-rice',
  ].map((slug) => readFile(new URL(`../dist/recipes/${slug}.html`, import.meta.url), 'utf8')));

  assert.match(recipePages[0], /230g/);
  assert.match(recipePages[0], /corn starch slurry/);
  assert.match(recipePages[1], /300f for 2-3 hours/);
  assert.match(recipePages[1], /100 ml white vin/);
  assert.match(recipePages[2], /200g rice cakes/);
  assert.match(recipePages[2], /Serve with lettuce \/ perilla leaves/);
  assert.match(recipePages[3], /1 cup short grain rice/);
  assert.match(recipePages[3], /Cook rice cooker on standard setting/);
});
