import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import ErrorBoundary from './errorBoundary';
import './style.scss';
import { AuthProvider } from './context/authContext';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>,
);
