import Router from 'koa-router';
import test from './test';
import todo from './todo';
import jottings from './jottings';
import fileDrop from './fileDrop';

export default function handleRoutes(router: Router<any, {}>) {
  [test, todo, jottings, fileDrop].forEach((t) => t(router));
}
