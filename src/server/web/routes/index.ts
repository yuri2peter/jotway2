import Router from 'koa-router';
import test from './test';
import todo from './todo';
import jottings from './jottings';

export default function handleRoutes(router: Router<any, {}>) {
  [test, todo, jottings].forEach((t) => t(router));
}
