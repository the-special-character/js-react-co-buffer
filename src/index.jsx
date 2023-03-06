import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import ErrorBoundary from './errorBoundary';
import './style.scss';
import { AuthProvider } from './context/authContext';
import { LoadingProvider } from './context/loadingContext';
import { ErrorProvider } from './context/errorContext';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <LoadingProvider>
      <ErrorProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorProvider>
    </LoadingProvider>
  </ErrorBoundary>,
);
