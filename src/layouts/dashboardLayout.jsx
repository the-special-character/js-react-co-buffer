import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CounterProvider } from '../context/counterContext';
import { AuthContext } from '../context/authContext';
import { ProductsProvider } from '../context/productsContext';

function DashboardLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ProductsProvider>
      <CounterProvider>
        <Header />
        <Outlet />
      </CounterProvider>
    </ProductsProvider>
  );
}

export default DashboardLayout;
