// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// import { validatePhoneNumber } from '../utils/validation';

// const INITIAL_FORM_STATE = {
//   name: '',
//   email: '',
//   phone: '',
//   cakeType: 'foret-noire',
//   size: '6',
//   flavor: 'chocolat',
//   message: '',
//   deliveryDate: '',
// };

// const CAKE_PRICES = {
//   'foret-noire': 35,
//   'fraisier': 32,
//   'paris-brest': 28,
// };

// export const OrderForm = () => {
//   const [formData, setFormData] = useState(INITIAL_FORM_STATE);
//   const [phoneError, setPhoneError] = useState('');
//   const [error, setError] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const calculatePrice = () => {
//     const basePrice = CAKE_PRICES[formData.cakeType as keyof typeof CAKE_PRICES] || 35;
//     const sizeMultiplier = parseInt(formData.size) / 6;
//     return Math.round(basePrice * sizeMultiplier);
//   };

//   const handlePhoneChange = (phone: string) => {
//     const { isValid, error } = validatePhoneNumber(phone);
//     setPhoneError(error || '');
//     setFormData(prev => ({ ...prev, phone }));
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     if (!validatePhoneNumber(formData.phone).isValid) {
//       return;
//     }

//     if (isProcessing) return;
    
//     setIsProcessing(true);
//     try {
//       await addDoc(collection(db, 'orders'), {
//         ...formData,
//         status: 'pending',
//         createdAt: new Date(),
//         lastUpdated: new Date(),
//         notificationSent: false
//       });
      
//       alert('Commande envoyée avec succès! Nous vous contacterons pour confirmer votre commande.');
//       setFormData(INITIAL_FORM_STATE);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Une erreur est survenue');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6" id="order">
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">Commander un gâteau</h3>
//           <p className="mt-1 text-sm text-gray-500">Personnalisez votre commande</p>
//         </div>
//         {error && (
//           <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
//             {error}
//           </div>
//         )}
//         <div className="border-t border-gray-200">
//           <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
//             <div className="grid grid-cols-1 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Nom</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Téléphone</label>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => handlePhoneChange(e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//                 {phoneError && (
//                   <p className="mt-1 text-sm text-red-600">{phoneError}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Type de gâteau</label>
//                 <select
//                   value={formData.cakeType}
//                   onChange={(e) => setFormData(prev => ({ ...prev, cakeType: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 >
//                   <option value="foret-noire">Forêt Noire (35€)</option>
//                   <option value="fraisier">Fraisier (32€)</option>
//                   <option value="paris-brest">Paris-Brest (28€)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Taille (nombre de parts)</label>
//                 <select
//                   value={formData.size}
//                   onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 >
//                   <option value="6">6 parts</option>
//                   <option value="8">8 parts</option>
//                   <option value="10">10 parts</option>
//                   <option value="12">12 parts</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Message sur le gâteau</label>
//                 <textarea
//                   value={formData.message}
//                   onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   rows={3}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Date de livraison</label>
//                 <input
//                   type="date"
//                   required
//                   value={formData.deliveryDate}
//                   onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//               </div>
//               <div>
//                 <p className="text-lg font-medium text-gray-900 mb-4">
//                   Prix total: {calculatePrice()}€
//                 </p>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? 'Envoi en cours...' : 'Commander'}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { validatePhoneNumber } from '../utils/validation';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  productType: 'yaourt-nature',
  quantity: '1',
  deliveryDate: '',
};

const PRODUCT_PRICES = {
  'yaourt-nature': 1.5, // Prix par unité
  'yaourt-fraise': 2.0,
  'lait-nature': 1.2,
  'lait-chocolat': 1.8,
};

export const OrderForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatePrice = () => {
    const basePrice = PRODUCT_PRICES[formData.productType as keyof typeof PRODUCT_PRICES] || 0;
    const quantity = parseInt(formData.quantity, 10);
    return Math.round(basePrice * quantity * 100) / 100; // Prix total arrondi à 2 décimales
  };

  const handlePhoneChange = (phone: string) => {
    const { isValid, error } = validatePhoneNumber(phone);
    setPhoneError(error || '');
    setFormData((prev) => ({ ...prev, phone }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(formData.phone).isValid) {
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        totalPrice: calculatePrice(),
        status: 'pending',
        createdAt: new Date(),
        lastUpdated: new Date(),
        notificationSent: false,
      });

      alert('Commande envoyée avec succès! Nous vous contacterons pour confirmer votre commande.');
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6" id="order">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Commander un produit laitier</h3>
          <p className="mt-1 text-sm text-gray-500">Personnalisez votre commande</p>
        </div>
        {error && (
          <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type de produit</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, productType: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="yaourt-nature">Yaourt Nature (1.50€)</option>
                  <option value="yaourt-fraise">Yaourt Fraise (2.00€)</option>
                  <option value="lait-nature">Lait Nature (1.20€)</option>
                  <option value="lait-chocolat">Lait Chocolat (1.80€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantité</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de livraison</label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-4">
                  Prix total: {calculatePrice()}€
                </p>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Envoi en cours...' : 'Commander'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};