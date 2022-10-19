import makeRequest from './makeRequest';

// Get list of all sales
const getSales = () => {
  return makeRequest('/sales');
};

// Get list of all sales by a given sales person
const getSalesPersonSales = (salesPersonId) => {
  return makeRequest(`/sales/${salesPersonId}`);
};

// Add a single sale
const addSale = (data) => {
  return makeRequest('/sales', {
    method: 'POST',
    data,
  });
};

export { getSales, getSalesPersonSales, addSale };
