import React from 'react';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';
import App from './app';
import ErrorBoundary from './errorBoundary';
import './style.scss';
import { AuthProvider } from './context/authContext';
import { LoadingProvider } from './context/loadingContext';
import { ErrorProvider } from './context/errorContext';
import rootReducer from './reducers';

const container = document.getElementById('root');

const root = createRoot(container);

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <LoadingProvider>
        <ErrorProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorProvider>
      </LoadingProvider>
    </ErrorBoundary>
  </Provider>,
);
