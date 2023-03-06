import { useCallback } from 'react';
import { useError } from '../context/errorContext';
import { useLoading } from '../context/loadingContext';

const useDispatch = (dispatch) => {
  const { errorDispatch } = useError();
  const { loadingDispatch } = useLoading();

  const loadDispatch = useCallback(({ type, payload }) => {
    loadingDispatch({
      type,
      payload,
    });
    errorDispatch({
      type,
    });
  }, []);

  const successDispatch = useCallback(
    ({ type, payload }) => {
      dispatch({
        type,
        payload,
      });
      loadingDispatch({
        type,
      });
    },
    [],
  );

  const errDispatch = useCallback(({ type, payload }) => {
    loadingDispatch({
      type,
    });
    errorDispatch({
      type,
      payload,
    });
  }, []);

  return {
    loadDispatch,
    successDispatch,
    errDispatch,
  };
};

export default useDispatch;
