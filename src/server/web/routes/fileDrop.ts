import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';
import { saveUploads } from '../helpers/upload';
import { FileDropItemSchema } from 'src/common/type/fileDrop';

const fileDrop: Controller = (router) => {
  router.post('/api/file-drop/get-list', async (ctx) => {
    ctx.body = db().get().fileDrop;
  });

  router.post('/api/file-drop/upload', async (ctx) => {
    const field = 'file';
    const file = ctx.request.files?.[field];
    const fileDropItem = await saveUploads(file);
    db().changeData((d) => {
      d.fileDrop.unshift(FileDropItemSchema.parse(fileDropItem));
    });
    ctx.body = { ok: 1 };
  });

  router.post('/api/file-drop/delete-item', async (ctx) => {
    const { newFilename } = z
      .object({ newFilename: z.string() })
      .parse(ctx.request.body);
    db().changeData((d) => {
      d.fileDrop = d.fileDrop.filter((i) => i.newFilename !== newFilename);
    });
    ctx.body = { ok: 1 };
  });
};
export default fileDrop;
