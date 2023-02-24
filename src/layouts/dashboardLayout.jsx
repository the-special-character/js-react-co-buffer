import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DashboardLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
