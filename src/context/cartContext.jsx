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
    const type = 'LOAD_CART';
    try {
      loadDispatch({
        type,
        payload: { message: 'Cart are loading...' },
      });
      const res = await axiosInstance.get('cart');
      successDispatch({
        type,
        payload: res.data,
      });
    } catch (err) {
      errDispatch({
        type,
        payload: {
          message: err.message,
          title: 'Load Cart Failed',
        },
      });
    }
  }, []);

  const addToCart = useCallback(async (data) => {
    const type = 'ADD_CART';
    try {
      loadDispatch({
        type,
        payload: {
          message: 'Cart Item is adding...',
        },
        loadingId: data.productId,
      });
      const res = await axiosInstance.post('cart', data);
      successDispatch({
        type,
        payload: res.data,
        loadingId: data.productId,
      });
    } catch (err) {
      errDispatch({
        type,
        payload: {
          message: err.message,
          title: 'Add Cart Failed',
        },
        loadingId: data.productId,
      });
    }
  }, []);

  const updateCartItem = useCallback(async (data) => {
    const type = 'UPDATE_CART';
    try {
      loadDispatch({
        type,
        payload: { message: 'Cart Item is updating...' },
        loadingId: data.productId,
      });
      const res = await axiosInstance.put(
        `cart/${data.id}`,
        data,
      );
      successDispatch({
        type,
        payload: res.data,
        loadingId: data.productId,
      });
    } catch (err) {
      errDispatch({
        type,
        payload: {
          message: err.message,
          title: 'Update Cart Failed',
        },
        loadingId: data.productId,
      });
    }
  }, []);

  const deleteCartItem = useCallback(async (data) => {
    const type = 'DELETE_CART';
    try {
      loadDispatch({
        type,
        payload: { message: 'Cart Item is deleting...' },
        loadingId: data.productId,
      });
      await axiosInstance.delete(`cart/${data.id}`);

      successDispatch({
        type,
        payload: data,
        loadingId: data.productId,
      });
    } catch (err) {
      errDispatch({
        type,
        payload: {
          message: err.message,
          title: 'Delete Cart Failed',
        },
        loadingId: data.productId,
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
