// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
// import { format } from 'date-fns';
// import { Modal } from '../Modal';
// import { sendNotification } from '../../lib/notifications';
// import { logoutAdmin } from '../../lib/auth';
// import { useNavigate } from 'react-router-dom';

// export const AdminDashboard = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
//       const ordersData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setOrders(ordersData);
//     });

//     return () => unsubscribe();
//   }, []);

//   const updateOrderStatus = async (orderId: string, newStatus: string, email: string) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), {
//         status: newStatus
//       });
//       await sendNotification(orderId, newStatus, email);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert('Erreur lors de la mise à jour du statut');
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleLogout = async () => {
//     const success = await logoutAdmin();
//     if (success) {
//       navigate('/admin/login');
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       <div className="px-4 py-6 sm:px-0">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord administrateur</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             Déconnexion
//           </button>
//         </div>
//         <div className="mt-6">
//           <div className="flex flex-col">
//             <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//               <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                 <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Client
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Gâteau
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Date de livraison
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Statut
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {orders.map((order) => (
//                         <tr key={order.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <button
//                               onClick={() => handleOrderClick(order)}
//                               className="text-left hover:text-pink-600"
//                             >
//                               <div className="text-sm font-medium text-gray-900">{order.name}</div>
//                               <div className="text-sm text-gray-500">{order.email}</div>
//                             </button>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{order.cakeType}</div>
//                             <div className="text-sm text-gray-500">{order.size} parts</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {format(new Date(order.deliveryDate), 'dd/MM/yyyy')}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                               ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                                 order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
//                                 order.status === 'ready' ? 'bg-green-100 text-green-800' :
//                                 'bg-gray-100 text-gray-800'}`}>
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <select
//                               onChange={(e) => updateOrderStatus(order.id, e.target.value, order.email)}
//                               value={order.status}
//                               className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
//                             >
//                               <option value="pending">En attente</option>
//                               <option value="preparing">En préparation</option>
//                               <option value="ready">Prêt</option>
//                               <option value="delivered">Livré</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {selectedOrder && (
//           <div>
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la commande</h3>
//             <div className="space-y-3">
//               <p><strong>Client:</strong> {selectedOrder.name}</p>
//               <p><strong>Email:</strong> {selectedOrder.email}</p>
//               <p><strong>Téléphone:</strong> {selectedOrder.phone}</p>
//               <p><strong>Type de gâteau:</strong> {selectedOrder.cakeType}</p>
//               <p><strong>Taille:</strong> {selectedOrder.size} parts</p>
//               <p><strong>Message sur le gâteau:</strong> {selectedOrder.message || 'Aucun message'}</p>
//               <p><strong>Date de livraison:</strong> {format(new Date(selectedOrder.deliveryDate), 'dd/MM/yyyy')}</p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };


// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
// import { format } from 'date-fns';
// import { Modal } from '../Modal';
// import { sendNotification } from '../../lib/notifications';
// import { logoutAdmin } from '../../lib/auth';
// import { useNavigate } from 'react-router-dom';

// export const AdminDashboard = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('orders'); // Onglet actif
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
//       const ordersData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(ordersData);
//     });

//     return () => unsubscribe();
//   }, []);

//   const updateOrderStatus = async (orderId: string, newStatus: string, email: string) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), {
//         status: newStatus,
//       });
//       await sendNotification(orderId, newStatus, email);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert('Erreur lors de la mise à jour du statut');
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleLogout = async () => {
//     const success = await logoutAdmin();
//     if (success) {
//       navigate('/admin/login');
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       <div className="px-4 py-6 sm:px-0">
//         {/* Menu des onglets */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord administrateur</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             Déconnexion
//           </button>
//         </div>
//         <div className="border-b mb-6">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === 'orders' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-600'
//               }`}
//               onClick={() => setActiveTab('orders')}
//             >
//               Commandes
//             </button>
//             <button
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === 'newTab' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-600'
//               }`}
//               onClick={() => setActiveTab('newTab')}
//             >
//               Nouvel onglet
//             </button>
//           </nav>
//         </div>

//         {/* Contenu des onglets */}
//         {activeTab === 'orders' && (
//           <div>
//             {/* Section des commandes */}
//             <div className="mt-6">
//               <div className="flex flex-col">
//                 <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                   <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                     <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Client
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Gâteau
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Date de livraison
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Statut
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {orders.map((order) => (
//                             <tr key={order.id}>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <button
//                                   onClick={() => handleOrderClick(order)}
//                                   className="text-left hover:text-pink-600"
//                                 >
//                                   <div className="text-sm font-medium text-gray-900">{order.name}</div>
//                                   <div className="text-sm text-gray-500">{order.email}</div>
//                                 </button>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{order.cakeType}</div>
//                                 <div className="text-sm text-gray-500">{order.size} parts</div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">
//                                   {format(new Date(order.deliveryDate), 'dd/MM/yyyy')}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <span
//                                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                     order.status === 'pending'
//                                       ? 'bg-yellow-100 text-yellow-800'
//                                       : order.status === 'preparing'
//                                       ? 'bg-blue-100 text-blue-800'
//                                       : order.status === 'ready'
//                                       ? 'bg-green-100 text-green-800'
//                                       : 'bg-gray-100 text-gray-800'
//                                   }`}
//                                 >
//                                   {order.status}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <select
//                                   onChange={(e) => updateOrderStatus(order.id, e.target.value, order.email)}
//                                   value={order.status}
//                                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
//                                 >
//                                   <option value="pending">En attente</option>
//                                   <option value="preparing">En préparation</option>
//                                   <option value="ready">Prêt</option>
//                                   <option value="delivered">Livré</option>
//                                 </select>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'newTab' && (
//           <div>
//             {/* Contenu du nouvel onglet */}
//             <h2 className="text-lg font-semibold text-gray-900">Contenu du nouvel onglet</h2>
//             <p className="text-gray-600">Ajoutez ici le contenu ou les fonctionnalités spécifiques de cet onglet.</p>
//           </div>
//         )}
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {selectedOrder && (
//           <div>
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la commande</h3>
//             <div className="space-y-3">
//               <p>
//                 <strong>Client:</strong> {selectedOrder.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {selectedOrder.email}
//               </p>
//               <p>
//                 <strong>Téléphone:</strong> {selectedOrder.phone}
//               </p>
//               <p>
//                 <strong>Type de gâteau:</strong> {selectedOrder.cakeType}
//               </p>
//               <p>
//                 <strong>Taille:</strong> {selectedOrder.size} parts
//               </p>
//               <p>
//                 <strong>Message sur le gâteau:</strong> {selectedOrder.message || 'Aucun message'}
//               </p>
//               <p>
//                 <strong>Date de livraison:</strong>{' '}
//                 {format(new Date(selectedOrder.deliveryDate), 'dd/MM/yyyy')}
//               </p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };




// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { db } from '../../lib/firebase';
// import { format } from 'date-fns';
// import { Modal } from '../Modal';
// import { logoutAdmin } from '../../lib/auth';
// import { useNavigate } from 'react-router-dom';

// export const AdminDashboard = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null); // État pour l'utilisateur connecté
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('pending'); // Onglet actif
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Écoute des changements d'état d'authentification
//     const auth = getAuth();
//     const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // Mettre à jour l'utilisateur connecté
//     });

//     // Écoute en temps réel des commandes dans Firestore
//     const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
//       const ordersData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(ordersData);
//     });

//     return () => {
//       unsubscribeAuth(); // Nettoie l'écouteur d'authentification
//       unsubscribeOrders(); // Nettoie l'écouteur des commandes
//     };
//   }, []);

//   const handleLogout = async () => {
//     const success = await logoutAdmin();
//     if (success) {
//       navigate('/admin/login');
//     } else {
//       alert('Erreur lors de la déconnexion.');
//     }
//   };

//   const updateOrderStatus = async (orderId: string, newStatus: string) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), {
//         status: newStatus,
//       });
//       alert('Statut mis à jour avec succès.');
//     } catch (err) {
//       console.error('Erreur lors de la mise à jour du statut :', err);
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     setSelectedOrder(order); // Définir la commande sélectionnée
//     setIsModalOpen(true); // Ouvrir le modal
//   };

//   // Filtrer les commandes en fonction de l'onglet actif
//   const filteredOrders =
//     activeTab === 'delivered'
//       ? orders.filter((order) => order.status === 'delivered')
//       : orders.filter((order) => order.status !== 'delivered');

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           {user ? `Bienvenue, ${user.displayName || user.name}` : 'Tableau de bord administrateur'}
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Déconnexion
//         </button>
//       </div>

//       {/* Onglets */}
//       <div className="border-b mb-6">
//         <nav className="flex space-x-4">
//           <button
//             className={`px-4 py-2 text-sm font-medium ${
//               activeTab === 'pending' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-600'
//             }`}
//             onClick={() => setActiveTab('pending')}
//           >
//             En attente
//           </button>
//           <button
//             className={`px-4 py-2 text-sm font-medium ${
//               activeTab === 'delivered' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-600'
//             }`}
//             onClick={() => setActiveTab('delivered')}
//           >
//             Livrées
//           </button>
//         </nav>
//       </div>

//       {/* Table des commandes */}
//       <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Client
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:block">
//                 Produit
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:block">
//                 Date de livraison
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Statut
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredOrders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => handleOrderClick(order)}
//                     className="text-left hover:text-pink-600"
//                   >
//                     <div className="text-sm font-medium text-gray-900">{order.name}</div>
//                     <div className="text-sm text-gray-500">{order.email}</div>
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap hidden sm:block">
//                   <div className="text-sm text-gray-900">{order.productType}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap hidden sm:block">
//                   <div className="text-sm text-gray-900">
//                     {format(new Date(order.deliveryDate), 'dd/MM/yyyy')}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       order.status === 'pending'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : order.status === 'delivered'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {activeTab !== 'delivered' && (
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                       className="block w-full px-2 py-1 border border-gray-300 rounded-md"
//                     >
//                       <option value="pending">En attente</option>
//                       <option value="preparing">En préparation</option>
//                       <option value="ready">Prêt</option>
//                       <option value="delivered">Livré</option>
//                     </select>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {selectedOrder ? (
//           <div>
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la commande</h3>
//             <div className="space-y-3">
//               <p><strong>Client:</strong> {selectedOrder.name}</p>
//               <p><strong>Email:</strong> {selectedOrder.email}</p>
//               <p><strong>Téléphone:</strong> {selectedOrder.phone}</p>
//               <p><strong>Type de produit:</strong> {selectedOrder.productType}</p>
//               <p><strong>Date de livraison:</strong> {format(new Date(selectedOrder.deliveryDate), 'dd/MM/yyyy')}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-600">Aucune commande sélectionnée.</p>
//         )}
//       </Modal>
//     </div>
//   );
// };


// import { useEffect, useState } from "react";
// import { collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";
// import { db } from "../../lib/firebase";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { Admin } from "../../types/index";


// export const AdminDashboard = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("orders");
//   const auth = getAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const userId = auth.currentUser?.uid;
//       if (userId) {
//         const userDoc = await getDoc(doc(db, "users", userId));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUserRole(userData.role);
//         }
//       }
//     };

//     const fetchOrders = () => {
//       onSnapshot(collection(db, "orders"), (snapshot) => {
//         const ordersData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(ordersData);
//       });
//     };

//     const fetchAdmins = () => {
//       onSnapshot(collection(db, "users"), (snapshot) => {
//         const adminsData: Admin[] = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Admin[]; // Forçage explicite du type
//         setAdmins(adminsData);
//       });
//     };

//     fetchUserRole();
//     fetchOrders();

//     if (userRole === "superadmin") {
//       console.log("superadmin is da")
//       fetchAdmins();
//     }
//   }, [auth.currentUser, userRole]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/admin/login");
//   };

//   const approveAdmin = async (adminId: string) => {
//     try {
//       await updateDoc(doc(db, "users", adminId), { approved: true });
//       alert("Administrateur approuvé avec succès.");
//       setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
//     } catch (error) {
//       console.error("Erreur lors de l'approbation :", error);
//     }
//   };

//   const rejectAdmin = async (adminId: string) => {
//     try {
//       await deleteDoc(doc(db, "users", adminId));
//       alert("Administrateur rejeté avec succès.");
//       setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
//     } catch (error) {
//       console.error("Erreur lors du rejet :", error);
//     }
//   };

//   const updateOrderStatus = async (orderId: string, status: string) => {
//     try {
//       await updateDoc(doc(db, "orders", orderId), { status });
//       alert("Statut mis à jour avec succès.");
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour du statut :", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Bienvenue, {auth.currentUser?.name}
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Déconnexion
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="border-b mb-6">
//         <nav className="flex space-x-4">
//           <button
//             onClick={() => setActiveTab("orders")}
//             className={`px-4 py-2 text-sm font-medium ${
//               activeTab === "orders" ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-600"
//             }`}
//           >
//             Commandes
//           </button>
//           {userRole === "superadmin" && (
//             <button
//               onClick={() => setActiveTab("admins")}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === "admins"
//                   ? "border-b-2 border-pink-600 text-pink-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Administrateurs
//             </button>
//           )}
//         </nav>
//       </div>

//       {/* Orders Tab */}
//       {activeTab === "orders" && (
//         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Client
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Produit
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date de livraison
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="px-6 py-4">{order.name}</td>
//                   <td className="px-6 py-4">{order.product}</td>
//                   <td className="px-6 py-4">{format(new Date(order.deliveryDate), "dd/MM/yyyy")}</td>
//                   <td className="px-6 py-4">{order.status}</td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                       className="border rounded-md p-2"
//                     >
//                       <option value="pending">En attente</option>
//                       <option value="delivered">Livré</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Admins Tab */}
//       {activeTab === "admins" && userRole === "superadmin" && (
//         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {admins.map((admin) => (
//                 <tr key={admin.id}>
//                   <td className="px-6 py-4">{admin.email}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => approveAdmin(admin.id)}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     >
//                       Approuver
//                     </button>
//                     <button
//                       onClick={() => rejectAdmin(admin.id)}
//                       className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                     >
//                       Rejeter
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };


// import { useEffect, useState } from "react";
// import { collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";
// import { db } from "../../lib/firebase";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { Admin } from "../../types/index";

// export const AdminDashboard = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("orders");
//   const auth = getAuth();
//   const navigate = useNavigate();

//   // Fonction pour récupérer le rôle de l'utilisateur connecté
//   const fetchUserRole = async () => {
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       const userDoc = await getDoc(doc(db, "users", userId));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         console.log("Rôle utilisateur connecté :", userData.role);
//         console.log("Données utilisateur :", userData);
//         setUserRole(userData.role);
//       }
//     }
//   };

//   // Fonction pour récupérer les commandes
//   const fetchOrders = () => {
//     onSnapshot(collection(db, "orders"), (snapshot) => {
//       const ordersData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(ordersData);
//     });
//   };

//   // Fonction pour récupérer les administrateurs non approuvés
//   const fetchAdmins = () => {
//     const adminsQuery = query(
//       collection(db, "users"),
//       where("role", "==", "admin"), // Filtre pour les administrateurs
//       where("approved", "==", false) // Filtre pour les administrateurs non approuvés
//     );

//     onSnapshot(adminsQuery, (snapshot) => {
//       const adminsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Admin[]; // Forçage explicite du type
//       console.log("Admins récupérés :", adminsData);
//       setAdmins(adminsData); // Mettre à jour l'état des administrateurs
//     });
//   };

//   useEffect(() => {
//     fetchUserRole();
//     fetchOrders();

//     // Appel uniquement si l'utilisateur est superadmin
//     if (userRole === "superadmin") {
//       fetchAdmins();
//     }
//   }, [auth.currentUser, userRole]);

//   // Déconnexion
//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/admin/login");
//   };

//   // Approuver un administrateur
//   const approveAdmin = async (adminId: string) => {
//     try {
//       await updateDoc(doc(db, "users", adminId), { approved: true });
//       alert("Administrateur approuvé avec succès.");
//       setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
//     } catch (error) {
//       console.error("Erreur lors de l'approbation :", error);
//     }
//   };

//   // Rejeter un administrateur
//   const rejectAdmin = async (adminId: string) => {
//     try {
//       await deleteDoc(doc(db, "users", adminId));
//       alert("Administrateur rejeté avec succès.");
//       setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
//     } catch (error) {
//       console.error("Erreur lors du rejet :", error);
//     }
//   };

//   // Mettre à jour le statut d'une commande
//   const updateOrderStatus = async (orderId: string, status: string) => {
//     try {
//       await updateDoc(doc(db, "orders", orderId), { status });
//       alert("Statut mis à jour avec succès.");
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour du statut :", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Bienvenue, {auth.currentUser?.displayName || auth.currentUser?.email}
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Déconnexion
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="border-b mb-6">
//         <nav className="flex space-x-4">
//           <button
//             onClick={() => setActiveTab("orders")}
//             className={`px-4 py-2 text-sm font-medium ${
//               activeTab === "orders" ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-600"
//             }`}
//           >
//             Commandes
//           </button>
//           {userRole === "superadmin" && (
//             <button
//               onClick={() => setActiveTab("admins")}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === "admins"
//                   ? "border-b-2 border-pink-600 text-pink-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Administrateurs
//             </button>
//           )}
//         </nav>
//       </div>

//       {/* Orders Tab */}
//       {activeTab === "orders" && (
//         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Client
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Produit
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date de livraison
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="px-6 py-4">{order.name}</td>
//                   <td className="px-6 py-4">{order.product}</td>
//                   <td className="px-6 py-4">{format(new Date(order.deliveryDate), "dd/MM/yyyy")}</td>
//                   <td className="px-6 py-4">{order.status}</td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                       className="border rounded-md p-2"
//                     >
//                       <option value="pending">En attente</option>
//                       <option value="delivered">Livré</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Admins Tab */}
//       {activeTab === "admins" && userRole === "superadmin" && (
//         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {admins.map((admin) => (
//                 <tr key={admin.id}>
//                   <td className="px-6 py-4">{admin.email}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => approveAdmin(admin.id)}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     >
//                       Approuver
//                     </button>
//                     <button
//                       onClick={() => rejectAdmin(admin.id)}
//                       className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                     >
//                       Rejeter
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../lib/firebase";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Admin } from "../../types/index";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("orders");
  const auth = getAuth();
  const navigate = useNavigate();

  // Fonction pour récupérer le rôle de l'utilisateur connecté
  const fetchUserRole = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Rôle utilisateur connecté :", userData.role);
        setUserRole(userData.role);
      }
    }
  };

  // Fonction pour récupérer les commandes
  const fetchOrders = () => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });
  };

  // Fonction pour récupérer les administrateurs non approuvés
  const fetchAdmins = () => {
    const adminsQuery = query(
      collection(db, "users"),
      where("role", "==", "admin"),
      where("approved", "==", false)
    );

    onSnapshot(adminsQuery, (snapshot) => {
      const adminsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Admin[];
      setAdmins(adminsData);
    });
  };

  useEffect(() => {
    fetchUserRole();
    fetchOrders();
    if (userRole === "superadmin") {
      fetchAdmins();
    }
  }, [auth.currentUser, userRole]);

  // Déconnexion
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  // Approuver un administrateur
  const approveAdmin = async (adminId: string) => {
    try {
      await updateDoc(doc(db, "users", adminId), { approved: true });
      alert("Administrateur approuvé avec succès.");
      setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error("Erreur lors de l'approbation :", error);
    }
  };

  // Rejeter un administrateur
  const rejectAdmin = async (adminId: string) => {
    try {
      await deleteDoc(doc(db, "users", adminId));
      alert("Administrateur rejeté avec succès.");
      setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error("Erreur lors du rejet :", error);
    }
  };

  // Mettre à jour le statut d'une commande
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
      alert("Statut mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Bienvenue, {auth.currentUser?.displayName || auth.currentUser?.email}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "orders" ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-600"
            }`}
          >
            Commandes
          </button>
          {userRole === "superadmin" && (
            <button
              onClick={() => setActiveTab("admins")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "admins"
                  ? "border-b-2 border-pink-600 text-pink-600"
                  : "text-gray-600"
              }`}
            >
              Administrateurs
            </button>
          )}
        </nav>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Liste des commandes</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4">{format(new Date(order.deliveryDate), "dd/MM/yyyy")}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border rounded-md p-2"
                    >
                      <option value="pending">En attente</option>
                      <option value="delivered">Livré</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admins Tab */}
      {activeTab === "admins" && userRole === "superadmin" && (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Liste des administrateurs en attente</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4 flex justify-end space-x-4">
                    <button
                      onClick={() => approveAdmin(admin.id)}
                      className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Approuver
                    </button>
                    <button
                      onClick={() => rejectAdmin(admin.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};