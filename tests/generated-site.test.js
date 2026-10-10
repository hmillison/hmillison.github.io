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
  assert.doesNotMatch(html, /Covered by NDA/i);
  assert.doesNotMatch(html, /whoami/);
  assert.match(html, /Landscape by Sprout Social/);
  assert.match(html, /Fall 2023/);
});

test('personal counter and playful construction notice are rendered', () => {
  assert.match(html, /under construction forever/i);
  assert.match(html, /Visitor counter/);
  assert.match(html, /id="visit-count"/);
});

test('the build is static and contains no client-side template placeholders', () => {
  assert.doesNotMatch(html, /\{\{[^]*?\}\}/);
  assert.match(html, /id="main"/);
  assert.match(html, /\/scripts\/starfield\.js/);
  assert.match(html, /rel="noopener noreferrer"/);
});
