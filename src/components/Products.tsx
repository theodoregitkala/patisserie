export const Products = () => {
    // Liste des produits
    const products = [
      {
        id: 1,
        name: 'Kossam Nature',
        description: 'Un yaourt nature au goût authentique, riche et onctueux.',
        price: '2.50€',
        image: 'https://i0.wp.com/www.alicepegie.com/wp-content/uploads/2013/03/SAM_6027.jpg',
      },
      {
        id: 2,
        name: 'Kossam Vanille',
        description: 'Une touche de vanille pour une douceur irrésistible.',
        price: '3.00€',
        image: 'https://i0.wp.com/www.alicepegie.com/wp-content/uploads/2013/03/SAM_6027.jpg',
      },
      {
        id: 3,
        name: 'Kossam Fraise',
        description: 'Un yaourt fruité avec de véritables morceaux de fraise.',
        price: '3.50€',
        image: 'https://i0.wp.com/www.alicepegie.com/wp-content/uploads/2013/03/SAM_6027.jpg',
      },
      {
        id: 4,
        name: 'Kossam Mangue',
        description: 'Un goût exotique et rafraîchissant de mangue.',
        price: '4.00€',
        image: 'https://i0.wp.com/www.alicepegie.com/wp-content/uploads/2013/03/SAM_6027.jpg',
      },
      {
        id: 5,
        name: 'Kossam Chocolat',
        description: 'Un yaourt gourmand avec une saveur intense de chocolat.',
        price: '3.75€',
        image: 'https://i0.wp.com/www.alicepegie.com/wp-content/uploads/2013/03/SAM_6027.jpg',
      },
    ];
  
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Nos Produits</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  <p className="text-pink-600 font-bold mt-4">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };