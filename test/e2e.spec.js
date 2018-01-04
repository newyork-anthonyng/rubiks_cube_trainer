import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

import puppeteer from "puppeteer";

it("test the homepage", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:8000");
  const screenshot = await page.screenshot();

  expect(screenshot).toMatchImageSnapshot();

  browser.close();
});
