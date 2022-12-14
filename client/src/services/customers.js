import makeRequest from './makeRequest';

// Get list of all customers
const getCustomers = () => {
  return makeRequest('/customers');
};

// Get a single customer
const getCustomer = (id) => {
  return makeRequest(`/customers/${id}`);
};

// Add new customer
const addCustomer = (data) => {
  return makeRequest('/customers', {
    method: 'POST',
    data,
  });
};

// Update customer
const updateCustomer = (customerId, data) => {
  return makeRequest(`/customers/${customerId}`, {
    method: 'PUT',
    data,
  });
};

export { getCustomers, getCustomer, addCustomer, updateCustomer };
