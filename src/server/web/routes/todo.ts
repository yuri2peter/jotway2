import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { TodoItemSchema } from 'src/common/type/todo';
import { z } from 'zod';

const todo: Controller = (router) => {
  router.post('/api/todo/get-list', async (ctx) => {
    ctx.body = db().get().todoItems;
  });
  router.post('/api/todo/upsert-item', async (ctx) => {
    const todoItem = TodoItemSchema.parse(ctx.request.body);
    db().changeData((d) => {
      const index = d.todoItems.findIndex((i) => i.id === todoItem.id);
      if (index !== -1) {
        d.todoItems[index] = todoItem;
      } else {
        d.todoItems.unshift(todoItem);
      }
    });
    ctx.body = { ok: 1 };
  });
  router.post('/api/todo/delete-item', async (ctx) => {
    const todoItemId = z.object({ id: z.string() }).parse(ctx.request.body);
    db().changeData((d) => {
      d.todoItems = d.todoItems.filter((i) => i.id !== todoItemId.id);
    });
    ctx.body = { ok: 1 };
  });
};
export default todo;
