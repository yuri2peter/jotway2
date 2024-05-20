import { createRoot } from 'react-dom/client';
import App from './App';

// Opt-in to Webpack hot module replacement
// @ts-ignore
if (module.hot) module.hot.accept();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
