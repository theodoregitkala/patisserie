import { Cake, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Cake className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold">La Pâtisserie</span>
            </div>
            <p className="mt-2 text-gray-400">
              Des gâteaux artisanaux pour tous vos moments spéciaux
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pink-500 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-pink-500 mr-2" />
                <span>contact@lapatisserie.fr</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-pink-500 mr-2" />
                <span>123 Rue de la Pâtisserie, Paris</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lundi - Vendredi: 8h - 19h</li>
              <li>Samedi: 8h - 20h</li>
              <li>Dimanche: 9h - 13h</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} La Pâtisserie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};