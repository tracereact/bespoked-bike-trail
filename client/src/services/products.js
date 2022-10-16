import makeRequest from './makeRequest';

const getProducts = () => {
  return makeRequest('/products');
};

export default getProducts;