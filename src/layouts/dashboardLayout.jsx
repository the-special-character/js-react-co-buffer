import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CounterProvider } from '../context/counterContext';

function DashboardLayout() {
  return (
    <CounterProvider>
      <Header />
      <Outlet />
    </CounterProvider>
  );
}

export default DashboardLayout;
