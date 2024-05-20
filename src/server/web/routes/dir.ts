import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { z } from 'zod';
import { Dir, DirSchema } from 'src/common/type/dir';
import { NoteShortSchema } from 'src/common/type/note';
import { BookmarkShortSchema } from 'src/common/type/bookmark';

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
    const dir = db()
      .get()
      .dirs.find((t) => t.id === dirItemId.id);
    if (!dir) {
      ctx.throw(404);
      return;
    }
    const subDirs = findSubDirs(dir);
    // Recursively delete subitems(or move to recycle bin)
    subDirs.forEach((subDir) => {
      const subItems = findSubItems(subDir);
      db().changeData((d) => {
        d.dirs = d.dirs.filter((i) => i.id !== subDir.id);
        d.notes = d.notes.filter((i) => !subItems.noteIds.includes(i.id));
        d.bookmarks = d.bookmarks.filter(
          (i) => !subItems.bookmarkIds.includes(i.id)
        );
        // Disable recycle feature for now
        // d.notes
        //   .filter((i) => subItems.noteIds.includes(i.id))
        //   .forEach((i) => {
        //     i.parentId = 'recycle';
        //   });
        // d.bookmarks
        //   .filter((i) => subItems.bookmarkIds.includes(i.id))
        //   .forEach((i) => {
        //     i.parentId = 'recycle';
        //   });
      });
    });
    ctx.body = { ok: 1 };
  });
  router.post('/api/dir/get-sub-items', async (ctx) => {
    const dirItemId = z.object({ id: z.string() }).parse(ctx.request.body);
    const dir = db()
      .get()
      .dirs.find((t) => t.id === dirItemId.id);
    if (!dir) {
      ctx.throw(404);
      return;
    }
    ctx.body = findSubItems(dir);
  });
  router.post('/api/dir/rename', async (ctx) => {
    const { id, name } = z
      .object({ id: z.string(), name: z.string().trim().min(1) })
      .parse(ctx.request.body);
    const dir = db()
      .get()
      .dirs.find((t) => t.id === id);
    if (!dir) {
      ctx.throw(404);
      return;
    }
    db().changeData((d) => {
      const dir = d.dirs.find((t) => t.id === id);
      if (dir) {
        dir.name = name;
      }
    });
    ctx.body = { ok: 1 };
  });
};

// find sub dirs(include self)
function findSubDirs(dir: Dir): Dir[] {
  const dirs = db().get().dirs;
  const subDirs: Dir[] = [];
  const findChildren = (dir: Dir) => {
    if (dir) {
      subDirs.push(dir);
      dirs.filter((t) => t.parentId === dir.id).forEach(findChildren);
    }
  };
  findChildren(dir);
  return subDirs;
}

// find sub items
function findSubItems(dir: Dir) {
  const dirs = db()
    .get()
    .dirs.filter((t) => t.parentId === dir.id);
  const noteShorts = db()
    .get()
    .notes.filter((t) => t.parentId === dir.id)
    .map((t) => NoteShortSchema.parse(t));
  const bookmarkShorts = db()
    .get()
    .bookmarks.filter((t) => t.parentId === dir.id)
    .map((t) => BookmarkShortSchema.parse(t));
  return {
    dirIds: dirs.map((t) => t.id),
    dirs,
    noteShorts,
    noteIds: noteShorts.map((t) => t.id),
    bookmarkShorts,
    bookmarkIds: bookmarkShorts.map((t) => t.id),
  };
}

export default dir;
