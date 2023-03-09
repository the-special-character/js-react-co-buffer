import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  errorReducer,
  initErrorState,
} from '../reducers/errorReducer';

export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, errorDispatch] = useReducer(
    errorReducer,
    initErrorState,
  );

  const removeError = useCallback((payload) => {
    errorDispatch({ type: 'REMOVE_ERROR', payload });
  }, []);

  const value = useMemo(
    () => ({
      error,
      removeError,
      errorDispatch,
    }),
    [error],
  );

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useError = () => useContext(ErrorContext);
