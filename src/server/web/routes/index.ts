import Router from 'koa-router';
import test from './test';
import todo from './todo';
import jottings from './jottings';
import fileDrop from './fileDrop';
import dir from './dir';

export default function handleRoutes(router: Router<any, {}>) {
  [test, todo, jottings, fileDrop, dir].forEach((t) => t(router));
}
