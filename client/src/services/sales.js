import makeRequest from './makeRequest';

// Get list of all sales
const getSales = () => {
  return makeRequest('/sales');
};

// Get a single sale
const getSale = (id) => {
  return makeRequest(`/sales/${id}`);
};

export { getSales, getSale };
