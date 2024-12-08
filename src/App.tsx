import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { OrderForm } from './components/OrderForm';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { subscribeToAuthChanges } from './lib/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <FeaturedProducts />
                <OrderForm />
              </>
            } />
            <Route 
              path="/admin/login" 
              element={user ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
            />
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;