import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';
import { Bookmark, BookmarkSchema } from 'src/common/type/bookmark';
import { now } from 'lodash';
import { urlParser2 } from '../helpers/reader2';
import { urlParser1 } from '../helpers/reader1';

const bookmark: Controller = (router) => {
  router.post('/api/bookmark/create-item', async (ctx) => {
    const { id, url, parentId } = z
      .object({
        id: z.string().min(1),
        url: z.string().url(),
        parentId: z.string().min(1),
      })
      .parse(ctx.request.body);
    const { title, description } = await urlParser1(url);
    const item = BookmarkSchema.parse({
      id,
      name: title,
      description,
      summary: description,
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
    db().changeData((d) => {
      const dbItem = d.bookmarks.find((i) => i.id === id);
      if (dbItem) {
        Object.assign(dbItem, { analysing: true });
      }
    });
    let itemPatch: Partial<Bookmark> = {};
    try {
      const { title, summary, screenshot, description } = await urlParser2(
        item.url
      );
      itemPatch = {
        name: title,
        summary,
        screenshot,
        description,
        analysing: false,
      };
    } catch (error) {
      itemPatch = {
        analysing: false,
      };
    }
    db().changeData((d) => {
      const dbItem = d.bookmarks.find((i) => i.id === id);
      if (dbItem) {
        Object.assign(dbItem, itemPatch);
      }
    });
    ctx.body = db()
      .get()
      .bookmarks.find((t) => t.id === id)!;
  });
  router.post('/api/bookmark/delete-item', async (ctx) => {
    const { id } = z.object({ id: z.string() }).parse(ctx.request.body);
    db().changeData((d) => {
      d.bookmarks = d.bookmarks.filter((i) => i.id !== id);
      // Disable recycle feature for now
      // const item = d.bookmarks.find((i) => i.id === id);
      // if (item) {
      //   item.parentId = 'recycle';
      // }
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
