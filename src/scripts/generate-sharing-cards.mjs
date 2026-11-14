import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const dir = 'public/media/sharing';
mkdirSync(dir, { recursive: true });
const cards = [
  ['portfolio-ru', 'ОЛЕГ ТИШИН', ['Веб-разработка', 'для бизнеса'], 'E-commerce · Автоматизация · Техническое SEO'],
  ['portfolio-en', 'OLEG TISHIN', ['Web development', 'for businesses'], 'E-commerce · Automation · Technical SEO'],
  ['78-dosok-ru', 'КЕЙС / ИНТЕРНЕТ-МАГАЗИН', ['«78 Досок»', 'Полный редизайн'], 'Новая тема · Мобильная витрина · Оптимизация'],
  ['78-dosok-en', 'CASE STUDY / ONLINE STORE', ['78 Dosok', 'Full store redesign'], 'New theme · Mobile storefront · Optimization'],
];
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const [slug, label, lines, detail] of cards) {
    await page.setContent(`<!doctype html><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;padding:72px 85px;background:#101b2e;color:#f5f8ff;font-family:Arial,sans-serif}
    main{height:100%;border:2px solid #456487;border-left:8px solid #53b8ed;border-radius:22px;background:#182943;padding:49px 60px}
    header{font-size:23px;letter-spacing:.06em;color:#b8d8ef;font-weight:700}
    h1{margin:34px 0 30px;font-size:78px;line-height:1.03;letter-spacing:-.038em}
    p{margin:0;border-top:2px solid #456487;padding-top:25px;font-size:28px;color:#b8d8ef}
    </style><main><header>${label}</header><h1>${lines.join('<br>')}</h1><p>${detail}</p></main>`);
    await page.screenshot({ path: dir + '/' + slug + '.png' });
  }
} finally {
  await browser.close();
}
