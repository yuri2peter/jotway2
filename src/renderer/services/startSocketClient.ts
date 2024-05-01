import { nanoid } from 'nanoid';
import { io } from 'socket.io-client';
import { USE_SOCKET } from 'src/common/config';
import { debugLog } from 'src/common/utils/dev';

export default function startSocketClient() {
  const userId = 'guest';
  const sessionId = nanoid();
  const socket = io('', {
    autoConnect: USE_SOCKET,
  });
  socket.on('connect', () => {
    debugLog('Socket connected.', 'socket');
    socket.emit('session', { sessionId });
    socket.emit('login', { userId });
  });
  socket.on('connect_error', () => {
    debugLog('Socket connect error.', 'socket');
  });
  socket.on('disconnect', () => {
    debugLog('Socket disconnected.', 'socket');
  });
  return () => {
    socket.disconnect();
  };
}
