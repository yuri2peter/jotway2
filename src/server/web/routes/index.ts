import Router from 'koa-router';
import test from './test';
import todo from './todo';

export default function handleRoutes(router: Router<any, {}>) {
  [test, todo].forEach((t) => t(router));
}
