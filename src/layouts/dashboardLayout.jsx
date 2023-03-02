import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CounterProvider } from '../context/counterContext';
import { AuthContext } from '../context/authContext';

function DashboardLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <CounterProvider>
      <Header />
      <Outlet />
    </CounterProvider>
  );
}

export default DashboardLayout;
