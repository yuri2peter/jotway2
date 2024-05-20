import db from 'src/server/data/db';
import { Controller } from '../types/controller';
import { SettingsSchema } from 'src/common/type/settings';

const settings: Controller = (router) => {
  router.post('/api/settings/get', async (ctx) => {
    ctx.body = db().get().settings;
  });
  router.post('/api/settings/set', async (ctx) => {
    const newSettings = SettingsSchema.parse(ctx.request.body);
    db().changeData((d) => {
      d.settings = newSettings;
    });
    ctx.body = { ok: 1 };
  });
};
export default settings;
