import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from './CustomerForm';

const AddNew = ({ type }) => {
  // const onCustomerAdd = (data) => {
  //   return addCustomerFn({customerId})
  // }
  if (type === 'customer') return <CustomerForm />;
  return null;
};

// Prop type validation
AddNew.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AddNew;
