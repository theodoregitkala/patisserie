import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';
import { Modal } from '../Modal';
import { sendNotification } from '../../lib/notifications';
import { logoutAdmin } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string, email: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
      await sendNotification(orderId, newStatus, email);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    const success = await logoutAdmin();
    if (success) {
      navigate('/admin/login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord administrateur</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Déconnexion
          </button>
        </div>
        <div className="mt-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gâteau
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date de livraison
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleOrderClick(order)}
                              className="text-left hover:text-pink-600"
                            >
                              <div className="text-sm font-medium text-gray-900">{order.name}</div>
                              <div className="text-sm text-gray-500">{order.email}</div>
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.cakeType}</div>
                            <div className="text-sm text-gray-500">{order.size} parts</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {format(new Date(order.deliveryDate), 'dd/MM/yyyy')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'ready' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <select
                              onChange={(e) => updateOrderStatus(order.id, e.target.value, order.email)}
                              value={order.status}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                            >
                              <option value="pending">En attente</option>
                              <option value="preparing">En préparation</option>
                              <option value="ready">Prêt</option>
                              <option value="delivered">Livré</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOrder && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la commande</h3>
            <div className="space-y-3">
              <p><strong>Client:</strong> {selectedOrder.name}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Téléphone:</strong> {selectedOrder.phone}</p>
              <p><strong>Type de gâteau:</strong> {selectedOrder.cakeType}</p>
              <p><strong>Taille:</strong> {selectedOrder.size} parts</p>
              <p><strong>Message sur le gâteau:</strong> {selectedOrder.message || 'Aucun message'}</p>
              <p><strong>Date de livraison:</strong> {format(new Date(selectedOrder.deliveryDate), 'dd/MM/yyyy')}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};