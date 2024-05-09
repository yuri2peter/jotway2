import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';

const jottings: Controller = (router) => {
  router.post('/api/jottings/get', async (ctx) => {
    ctx.body = { text: db().get().jottings };
  });
  router.post('/api/jottings/set', async (ctx) => {
    const { text } = z.object({ text: z.string() }).parse(ctx.request.body);
    db().changeData((d) => {
      d.jottings = text;
    });
    ctx.body = { ok: 1 };
  });
};
export default jottings;
