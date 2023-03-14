import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import Product from '../../components/Product';

function Home() {
  const dispatch = useDispatch();

  const { products, productsLoading, cartLoading } =
    useSelector((state) => ({
      products: state.products,
      productsLoading: state.loading.find(
        (x) => x.actionName === 'LOAD_PRODUCTS',
      ),
      cartLoading: state.loading.find(
        (x) => x.actionName === 'LOAD_CART',
      ),
    }));

  const loadProducts = useCallback(async () => {
    const type = 'LOAD_PRODUCTS';
    try {
      dispatch({
        type: `${type}_REQUEST`,
        meta: {
          id: -1,
          message: 'Products are loading...',
        },
      });
      const res = await axiosInstance.get('products');
      dispatch({
        type: `${type}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: `${type}_FAIL`,
        meta: {
          id: -1,
          message: err.message,
          title: 'Load Products Failed',
        },
      });
    }
  }, []);

  const loadCart = useCallback(async () => {
    const type = 'LOAD_CART';
    try {
      dispatch({
        type: `${type}_REQUEST`,
        meta: {
          id: -1,
          message: 'Cart is loading...',
        },
      });
      const res = await axiosInstance.get('cart');
      dispatch({
        type: `${type}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: `${type}_FAIL`,
        meta: {
          id: -1,
          message: err.message,
          title: 'Load cart Failed',
        },
      });
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, [loadProducts, loadCart]);

  if (productsLoading || cartLoading) {
    return (
      <div>
        {productsLoading && (
          <p>{productsLoading.message}</p>
        )}
        {cartLoading && <p>{cartLoading.message}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;
