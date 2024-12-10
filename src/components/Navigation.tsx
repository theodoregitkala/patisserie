import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from 'lucide-react';
// import { Droplet } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Cake className="h-8 w-8 text-pink-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Nory Fresh</span>
            </Link>
          </div>

          {/* Menu Hamburger (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-pink-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>

          {/* Liens de navigation (Desktop) */}
          <div className="hidden lg:flex space-x-8">
            <Link to="/about" className="text-gray-900 hover:text-pink-600">
              À propos
            </Link>
            <Link to="/products" className="text-gray-900 hover:text-pink-600">
              Produits
            </Link>
          </div>
        </div>

        {/* Menu déroulant (Mobile) */}
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-2">
            <Link to="/about" className="block text-gray-900 hover:text-pink-600">
              À propos
            </Link>
            <Link to="/products" className="block text-gray-900 hover:text-pink-600">
              Produits
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};