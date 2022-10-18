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
const addProduct = (data) => {
  return makeRequest('/products', {
    method: 'POST',
    data,
  });
};

// Update a single product
const updateProduct = (id, data) => {
  return makeRequest(`/products/${id}`, {
    method: 'PUT',
    data,
  });
};

export { getProducts, getProduct, addProduct, updateProduct };
