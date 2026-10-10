import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const cssFiles = await readdir(new URL('../dist/_astro/', import.meta.url));
const css = (await Promise.all(cssFiles.filter((file) => file.endsWith('.css')).map((file) => readFile(join(new URL('../dist/_astro/', import.meta.url).pathname, file), 'utf8')))).join('\n');

test('build emits the complete work history as static HTML', () => {
  assert.equal((html.match(/<article>/g) || []).length, 11);
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
