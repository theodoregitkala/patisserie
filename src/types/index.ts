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


export interface Admin {
  id: string;         // ID de l'utilisateur
  name: string;
  email: string;      // Email de l'utilisateur
  role: string;       // Rôle (par exemple, 'admin' ou 'superadmin')
  approved: boolean;  // Si l'utilisateur est approuvé ou non
}