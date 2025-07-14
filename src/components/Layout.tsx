// src/components/Layout.tsx

import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
