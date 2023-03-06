export const initialProductsState = [];

export const productsReducer = (
  state,
  { type, payload },
) => {
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
