import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600"
        >
          Passage
        </Link>
        {/* We can add more links here later, like "/about" or "/compare" */}
      </nav>
    </header>
  );
}
