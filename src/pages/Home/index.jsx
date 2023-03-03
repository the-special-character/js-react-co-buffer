import React, { useContext, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ProductsContext } from '../../context/productsContext';
import { CartContext } from '../../context/cartContext';

function Home() {
  const { loadProducts, products } =
    useContext(ProductsContext);

  const {
    loadCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    cart,
  } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  console.log(cart);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {products.map((product) => {
        const cartItem = cart.find(
          (item) => item.productId === product.id,
        );
        return (
          <div
            key={product.id}
            className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8 my-8"
          >
            <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-3">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover object-center"
              />
            </div>
            <div className="sm:col-span-8 lg:col-span-9">
              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                {product.title}
              </h2>

              <section
                aria-labelledby="information-heading"
                className="mt-2"
              >
                <h3 id="information-heading">
                  {product.description}
                </h3>

                <p className="text-2xl text-gray-900">
                  {product.price}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            'h-5 w-5 flex-shrink-0 text-gray-900',
                            {
                              'text-gray-200':
                                product.rating.rate <
                                rating,
                            },
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {product.rating.rate} out of 5 stars
                    </p>
                    <a
                      href="/"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.rating.count} reviews
                    </a>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="options-heading"
                className="mt-10"
              >
                <h3
                  id="options-heading"
                  className="sr-only"
                >
                  Product options
                </h3>

                {cartItem ? (
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateCartItem({
                          ...cartItem,
                          quantity: cartItem.quantity + 1,
                        })
                      }
                      className="flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      +
                    </button>
                    <p className="flex-1 text-center text-2xl font-bold">
                      {cartItem.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (cartItem.quantity > 1) {
                          updateCartItem({
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                          });
                        } else {
                          deleteCartItem(cartItem);
                        }
                      }}
                      className="flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        quantity: 1,
                      })
                    }
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to bag
                  </button>
                )}
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
