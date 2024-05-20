import Router from 'koa-router';
import test from './test';
import todo from './todo';
import jottings from './jottings';
import fileDrop from './fileDrop';
import dir from './dir';
import bookmark from './bookmark';
import settings from './settings';

export default function handleRoutes(router: Router<any, {}>) {
  [test, todo, jottings, fileDrop, dir, bookmark, settings].forEach((t) =>
    t(router)
  );
}
