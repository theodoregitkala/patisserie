import React from 'react';
import { Star } from 'lucide-react';

const featuredCakes = [
  {
    id: 1,
    name: 'Forêt Noire',
    price: '35€',
    description: 'Gâteau au chocolat avec cerises et crème fouettée',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80',
  },
  {
    id: 2,
    name: 'Fraisier',
    price: '32€',
    description: 'Gâteau à la crème mousseline et fraises fraîches',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80',
  },
  {
    id: 3,
    name: 'Paris-Brest',
    price: '28€',
    description: 'Pâte à choux garnie de crème pralinée',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80',
  },
];

export const FeaturedProducts = () => {
  return (
    <div className="bg-white" id="products">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Nos gâteaux vedettes</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {featuredCakes.map((cake) => (
            <div key={cake.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#order">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {cake.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{cake.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{cake.price}</p>
              </div>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};