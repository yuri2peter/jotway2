// dev only
import { consoleLog } from '../common/utils/dev';
import { CHII_PORT, USE_CHII } from '../common/config';
const { start } = require('chii');

export function startChii(port = 0) {
  consoleLog('Starting Chii Web debugger...', 'chii');
  start({
    port,
    basePath: '/chii',
  });
  consoleLog('Chii Web debugger started.', 'chii');
}

USE_CHII && startChii(CHII_PORT);
