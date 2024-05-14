import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';
import { DirSchema } from 'src/common/type/dir';

const dir: Controller = (router) => {
  router.post('/api/dir/get-list', async (ctx) => {
    ctx.body = db().get().dirs;
  });
  router.post('/api/dir/upsert-item', async (ctx) => {
    const dirItem = DirSchema.parse(ctx.request.body);
    db().changeData((d) => {
      const index = d.dirs.findIndex((i) => i.id === dirItem.id);
      if (index !== -1) {
        d.dirs[index] = dirItem;
      } else {
        d.dirs.unshift(dirItem);
      }
    });
    ctx.body = { ok: 1 };
  });
  router.post('/api/dir/delete-item', async (ctx) => {
    const dirItemId = z.object({ id: z.string() }).parse(ctx.request.body);
    db().changeData((d) => {
      d.dirs = d.dirs.filter((i) => i.id !== dirItemId.id);
    });
    ctx.body = { ok: 1 };
  });
};
export default dir;
