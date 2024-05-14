import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/404';
import AppGuard from './guards/AppGuard';
import PageHome from './pages/home';
import { USE_WEB_SERVER } from 'src/common/config';
import PageActivity from './pages/a';
import AppLayout from './components/layouts/AppLayout';
import { NavigationHack } from './hacks/navigate';
import PageDir from './pages/d';

const Router = USE_WEB_SERVER ? BrowserRouter : HashRouter;

export default function AppRoutes() {
  return (
    <Router>
      <NavigationHack />
      <Routes>
        <Route path="/" element={<AppGuard />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<PageHome />} />
            <Route path="/a/:id" element={<PageActivity />} />
            <Route path="/d/:id" element={<PageDir />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
}
