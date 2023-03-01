import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CounterProvider } from '../context/counterContext';

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth', { replace: true });
    }
  }, []);

  return (
    <CounterProvider>
      <Header />
      <Outlet />
    </CounterProvider>
  );
}

export default DashboardLayout;
