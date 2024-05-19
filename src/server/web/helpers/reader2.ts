import path from 'path';
import puppeteer from 'puppeteer';
import { generateContentWithImage } from './ai';
import { sleep } from 'src/common/utils/time';
import { runtimeUploadsPath } from 'src/common/paths.app';
import { nanoid } from 'nanoid';
import { UPLOADS_URL_PREFIX } from 'src/common/config';

// parse url into title, description, icon, content
export async function urlParser(url: string) {
  // console.log(puppeteer.executablePath());
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // avoid robot detect
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );
  await page.evaluateOnNewDocument(() => {
    // Disable WebGL
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    // Modify WebRTC
    const patchedRTCConfig = {
      iceServers: [{ urls: 'stun:stun.example.org' }],
    };
    Object.defineProperty(window, 'RTCConfiguration', {
      writable: false,
      value: patchedRTCConfig,
    });
  });
  // begin to read
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { timeout: 8000 }).catch(() => {
    console.warn(`URL ${url} too slow.`);
  });
  await sleep(1000);
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
  const prompt1 = `
Summarize this webpage in two sentence based on the following information and screenshots of the webpage. 
The summary must use the same language as the page's content.
Information:`;
  const prompt2 = `
使用如下信息和网页截图来生成这个网页的摘要（不超过两句话）。必须使用和网页内容一样的语种。信息：`;
  const summary = await generateContentWithImage(
    prompt2 +
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
