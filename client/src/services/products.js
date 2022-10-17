import makeRequest from './makeRequest';

// Get list of all products
const getProducts = () => {
  return makeRequest('/products');
};

// Get a single product
const getProduct = (id) => {
  return makeRequest(`/products/${id}`);
};

// Add a single product
const addProduct = (id) => {
  return makeRequest(`/products/${id}`);
};

export { getProducts, getProduct, addProduct };
