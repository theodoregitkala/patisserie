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
  userId: string;
  cakeId: string;
  size: string;
  flavor: string;
  message: string;
  deliveryDate: Date;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  createdAt: Date;
  total: number;
}