// Usage: node screenshot.mjs <url> [label] [width=1440] [fullPage=1|0] [y] [height]
// Saves ./temporary screenshots/screenshot-N[-label].png (auto-incremented). Needs puppeteer-core + Chrome.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PUPPETEER_DIR ? process.env.PUPPETEER_DIR + '/' : import.meta.url);
const puppeteer = require('puppeteer-core');
const [url, label = '', w = '1440', full = '1', y = '0', h = '900'] = process.argv.slice(2);
const dir = path.resolve('temporary screenshots');
fs.mkdirSync(dir, { recursive: true });
const n = fs.readdirSync(dir).map((f) => +(f.match(/^screenshot-(\d+)/) || [])[1] || 0).reduce((a, b) => Math.max(a, b), 0) + 1;
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0' });
// scroll through the page so lazy-loaded images are fetched before capture
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 600));
const file = path.join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);
if (full === '1') await page.screenshot({ path: file, fullPage: true });
else await page.screenshot({ path: file, captureBeyondViewport: true, clip: { x: 0, y: +y, width: +w, height: +h } });
console.log(file);
await browser.close();
