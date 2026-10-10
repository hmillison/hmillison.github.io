import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

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

test('the build is static and contains no client-side template placeholders', () => {
  assert.doesNotMatch(html, /\{\{[^]*?\}\}/);
  assert.match(html, /id="main"/);
  assert.match(html, /\/scripts\/starfield\.js/);
  assert.match(html, /rel="noopener noreferrer"/);
});
