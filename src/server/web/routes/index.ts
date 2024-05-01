import Router from 'koa-router';
import test from './test';

export default function handleRoutes(router: Router<any, {}>) {
  [test].forEach((t) => t(router));
}
