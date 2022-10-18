import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from '../customer/CustomerForm';

const AddNew = ({ type, active }) => {
  if (type === 'customer') return <CustomerForm isActive={active} />;
  return null;
};

// Prop type validation
AddNew.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default AddNew;
