import makeRequest from './makeRequest';

// Get list of all sales people
const getSalesPeople = () => {
  return makeRequest('/sales-people');
};

// Get a single sales person
const getSalesPerson = (id) => {
  return makeRequest(`/sales-people/${id}`);
};

// Add new sales person
const addSalesPerson = (data) => {
  return makeRequest('/sales-people', {
    method: 'POST',
    data,
  });
};

// Update sales person
const updateSalesPerson = (id, data) => {
  return makeRequest(`/sales-people/${id}`, {
    method: 'PUT',
    data,
  });
};

export { getSalesPeople, getSalesPerson, addSalesPerson, updateSalesPerson };
