import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../utils/axiosInstance';
import {
  cartReducer,
  initialCartState,
} from '../reducers/cartReducer';
import useDispatch from '../hooks/useDispatch';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState,
  );

  const { loadDispatch, successDispatch, errDispatch } =
    useDispatch(dispatch);

  const loadCart = useCallback(async () => {
    const actionName = 'LOAD_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart are loading...' },
      });
      const res = await axiosInstance.get('cart');
      successDispatch({
        type: `${actionName}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message },
      });
    }
  }, []);

  const addToCart = useCallback(async (data) => {
    const actionName = 'ADD_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart Item is adding...' },
      });
      const res = await axiosInstance.post('cart', data);
      successDispatch({
        type: `${actionName}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message },
      });
    }
  }, []);

  const updateCartItem = useCallback(async (data) => {
    const actionName = 'UPDATE_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart Item is updating...' },
      });
      const res = await axiosInstance.put(
        `cart/${data.id}`,
        data,
      );
      successDispatch({
        type: `${actionName}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message },
      });
    }
  }, []);

  const deleteCartItem = useCallback(async (data) => {
    const actionName = 'DELETE_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart Item is deleting...' },
      });
      await axiosInstance.delete(`cart/${data.id}`);

      successDispatch({
        type: `${actionName}_SUCCESS`,
        payload: data,
      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    }),
    [
      cart,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
