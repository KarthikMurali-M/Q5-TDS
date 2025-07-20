import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 23 + i);
let grandTotal = 0;

for (const seed of seeds) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
  await page.goto(url);

  const tableData = await page.$$eval('table td', tds =>
    tds.map(td => parseFloat(td.innerText.replace(/[^0-9.-]+/g, '')))
        .filter(n => !isNaN(n))
  );

  const total = tableData.reduce((a, b) => a + b, 0);
  console.log(`Seed ${seed} total:`, total.toFixed(2));
  grandTotal += total;

  await browser.close();
}

console.log(`\n✅ Grand Total: ${grandTotal.toFixed(2)}`);
