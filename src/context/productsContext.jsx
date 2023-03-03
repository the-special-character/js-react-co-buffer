import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('products');
      setProducts(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      loadProducts,
      products,
      productsLoading: loading,
      productsError: error,
    }),
    [products, loading, error],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
