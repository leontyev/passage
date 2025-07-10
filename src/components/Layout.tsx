import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* We could add a Footer component here later */}
    </div>
  );
}
