import makeRequest from './makeRequest';

// Get list of all customers
const getCustomers = () => {
  return makeRequest('/customers');
};

// Get a single customer
const getCustomer = (id) => {
  return makeRequest(`/customers/${id}`);
};

export { getCustomers, getCustomer };
