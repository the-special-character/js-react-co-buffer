import { useCallback } from 'react';
import { useError } from '../context/errorContext';
import { useLoading } from '../context/loadingContext';

const useDispatch = (dispatch) => {
  const { errorDispatch } = useError();
  const { loadingDispatch } = useLoading();

  const generateType = useCallback(
    (type, loadingId, actionName) => {
      if (loadingId) {
        return `${type}_${loadingId}_${actionName}`;
      }
      return `${type}_${actionName}`;
    },
    [],
  );

  const loadDispatch = useCallback(
    ({ type, payload, loadingId }) => {
      const actionName = 'REQUEST';
      loadingDispatch({
        type: generateType(type, loadingId, actionName),
        payload,
      });
      errorDispatch({
        type: generateType(type, loadingId, actionName),
      });
    },
    [generateType],
  );

  const successDispatch = useCallback(
    ({ type, payload, loadingId }) => {
      const actionName = 'SUCCESS';
      dispatch({
        type: generateType(type, undefined, actionName),
        payload,
      });
      loadingDispatch({
        type: generateType(type, loadingId, actionName),
      });
    },
    [generateType],
  );

  const errDispatch = useCallback(
    ({ type, payload, loadingId }) => {
      const actionName = 'FAIL';
      loadingDispatch({
        type: generateType(type, loadingId, actionName),
      });
      errorDispatch({
        type: generateType(type, loadingId, actionName),
        payload,
      });
    },
    [generateType],
  );

  return {
    loadDispatch,
    successDispatch,
    errDispatch,
  };
};

export default useDispatch;
