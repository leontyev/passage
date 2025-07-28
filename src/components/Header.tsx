// src/components/Header.tsx

import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600"
          activeProps={{ className: 'text-blue-700' }}
        >
          Passage
        </Link>
        <div className="space-x-4">
          <Link
            to="/compare"
            className="text-lg font-medium text-gray-600 hover:text-blue-600"
            activeProps={{ className: 'text-blue-700 font-semibold' }}
          >
            Compare
          </Link>
        </div>
      </nav>
    </header>
  );
}
