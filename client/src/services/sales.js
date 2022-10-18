import makeRequest from './makeRequest';

// Get list of all sales
const getSales = () => {
  return makeRequest('/sales');
};

// Add a single sale
const addSale = (data) => {
  return makeRequest('/sales', {
    method: 'POST',
    data,
  });
};

export { getSales, addSale };
