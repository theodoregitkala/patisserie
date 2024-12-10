import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types';

export const processOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<boolean> => {
  try {
    await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error processing order:', error);
    return false;
  }
};