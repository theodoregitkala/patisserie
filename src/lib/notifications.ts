import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const sendNotification = async (orderId: string, status: string, email: string) => {
  try {
    // Mise à jour du statut dans Firestore
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      lastUpdated: new Date(),
      notificationSent: true
    });

    // Simuler l'envoi d'un email (dans un environnement réel, utilisez un service d'emails)
    console.log(`Notification envoyée à ${email}: Votre commande est maintenant ${status}`);
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
    return false;
  }
};