import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  loadingReducer,
  initLoadingState,
} from '../reducers/loadingReducer';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    initLoadingState,
  );

  const value = useMemo(
    () => ({
      loading,
      loadingDispatch,
    }),
    [loading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLoading = () => useContext(LoadingContext);
