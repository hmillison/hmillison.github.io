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

test('the build is static and contains no client-side template placeholders', () => {
  assert.doesNotMatch(html, /\{\{[^]*?\}\}/);
  assert.match(html, /id="main"/);
  assert.match(html, /\/scripts\/starfield\.js/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test('the homepage links to all four supplied recipe pages', () => {
  assert.match(html, /href="\/recipes\/mapo-tofu"/);
  assert.match(html, /href="\/recipes\/braised-short-rib-shallot-pickle"/);
  assert.match(html, /href="\/recipes\/rice-cracker-salad"/);
  assert.match(html, /href="\/recipes\/soy-sauce-chicken-over-rice"/);
  assert.match(html, /Mapo tofu/);
  assert.match(html, /Braised Short Rib \+ Shallot Pickle/);
  assert.match(html, /Rice Cracker Salad/);
  assert.match(html, /Soy Sauce Chicken over Rice/);
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
