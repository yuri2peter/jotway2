import path from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { generateContentWithImage } from './ai';
// import { sleep } from 'src/common/utils/time';
import { runtimeUploadsPath } from 'src/common/paths.app';
import { nanoid } from 'nanoid';
import { UPLOADS_URL_PREFIX } from 'src/common/config';

puppeteer.use(StealthPlugin());

// parse url into title, description, icon, content
export async function urlParser(url: string) {
  // console.log(puppeteer.executablePath());
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // await page.goto(url);
  await page.waitForResponse(url, { timeout: 3000 });
  const screenshotFileName = `${nanoid()}.png`;
  const screenshotPath = path.resolve(runtimeUploadsPath, screenshotFileName);
  await page.screenshot({
    path: screenshotPath,
  });
  const title = await page.title();
  const description = await page
    .$eval('meta[name="description"]', (el) => el.content)
    .catch(() => {
      return 'No description.';
    });
  await browser.close();
  const summary = await generateContentWithImage(
    `
Summarize this webpage in two sentence based on the following information and screenshots of the webpage. 
The summary should use the same language as the information.description's value.
Information:` +
      JSON.stringify({
        title,
        description,
      }),
    screenshotPath
  );
  return {
    title,
    screenshot: UPLOADS_URL_PREFIX + '/' + screenshotFileName,
    summary,
    description,
  };
}
