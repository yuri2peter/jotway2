import { Controller } from '../types/controller';
import { saveUploads } from '../helpers/upload';
import { urlParser } from '../helpers/reader';

const test: Controller = (router) => {
  router.all('/api/test', async (ctx) => {
    const url = 'https://www.mcmod.cn/';
    const content = await urlParser(url);
    ctx.body = { content };
  });
  router.post('/api/test/upload', async (ctx) => {
    const field = 'test';
    const testFile = ctx.request.files?.[field];
    ctx.body = await saveUploads(testFile);
  });
};
export default test;
