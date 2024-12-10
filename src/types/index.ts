export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  flavors: string[];
  category: string;
  available: boolean;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  cakeType: string;
  size: string;
  flavor: string;
  message: string;
  deliveryDate: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
  lastUpdated?: Date;
  notificationSent?: boolean;
}