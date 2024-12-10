import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const ManageAdmins = () => {
  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    // Récupérer tous les administrateurs depuis Firestore
    const fetchAdmins = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const adminUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdmins(adminUsers);
    };

    fetchAdmins();
  }, []);

  const handleVerify = async (adminId: string) => {
    try {
      await updateDoc(doc(db, 'users', adminId), { verified: true });
      alert('Compte vérifié avec succès.');
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === adminId ? { ...admin, verified: true } : admin
        )
      );
    } catch (error) {
      console.error('Erreur lors de la vérification :', error);
    }
  };

  const handleDelete = async (adminId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte administrateur ?')) {
      try {
        await deleteDoc(doc(db, 'users', adminId));
        alert('Compte supprimé avec succès.');
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gestion des administrateurs</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Vérifié
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{admin.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {admin.verified ? 'Oui' : 'Non'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!admin.verified && (
                  <button
                    onClick={() => handleVerify(admin.id)}
                    className="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Vérifier
                  </button>
                )}
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="ml-4 text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};