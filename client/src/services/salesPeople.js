import makeRequest from './makeRequest';

// Get list of all sales people
const getSalesPeople = () => {
  return makeRequest('/sales-people');
};

// Get a single sales person
const getSalesPerson = (id) => {
  return makeRequest(`/sales-people/${id}`);
};

export { getSalesPeople, getSalesPerson };
