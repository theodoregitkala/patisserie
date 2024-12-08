import React from 'react';
import { Link } from 'react-router-dom';
import { Cake } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Cake className="h-8 w-8 text-pink-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">La Pâtisserie</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};