import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';
import { BookmarkSchema } from 'src/common/type/bookmark';
import { nanoid } from 'nanoid';
import { now } from 'lodash';
import { urlParser } from '../helpers/reader';

const bookmark: Controller = (router) => {
  router.post('/api/bookmark/create-item', async (ctx) => {
    const { url, parentId } = z
      .object({ url: z.string().url(), parentId: z.string().min(1) })
      .parse(ctx.request.body);
    const item = BookmarkSchema.parse({
      id: nanoid(),
      name: new URL(url).hostname + new URL(url).pathname,
      summary: 'Parsing, please wait...',
      url,
      parentId,
      createdAt: now(),
    });
    db().changeData((d) => {
      d.bookmarks.unshift(item);
    });
    ctx.body = item;
  });
  router.post('/api/bookmark/analysis-item', async (ctx) => {
    const { id } = z.object({ id: z.string() }).parse(ctx.request.body);
    const item = db()
      .get()
      .bookmarks.find((t) => t.id === id);
    if (!item) {
      ctx.throw(404);
      return;
    }
    const { meta, summary, snapshot } = await urlParser(item.url);
    const newItem = {
      ...item,
      name: meta.title,
      summary,
      snapshot,
    };
    db().changeData((d) => {
      const dbItem = d.bookmarks.find((i) => i.id === id);
      if (dbItem) {
        Object.assign(dbItem, newItem);
      }
    });
    ctx.body = newItem;
  });
  router.post('/api/bookmark/delete-item', async (ctx) => {
    const { id } = z.object({ id: z.string() }).parse(ctx.request.body);
    db().changeData((d) => {
      const item = d.bookmarks.find((i) => i.id === id);
      if (item) {
        item.parentId = 'recycle';
      }
    });
    ctx.body = { ok: 1 };
  });
  router.post('/api/bookmark/rename', async (ctx) => {
    const { id, name } = z
      .object({ id: z.string(), name: z.string().trim().min(1) })
      .parse(ctx.request.body);
    const b = db()
      .get()
      .bookmarks.find((t) => t.id === id);
    if (!b) {
      ctx.throw(404);
      return;
    }
    db().changeData((d) => {
      const b = d.bookmarks.find((t) => t.id === id);
      if (b) {
        b.name = name;
      }
    });
    ctx.body = { ok: 1 };
  });
};
export default bookmark;
