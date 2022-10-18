import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from '../customer/CustomerForm';
import ProductForm from '../product/ProductForm';

const AddNew = ({ type, active }) => {
  if (type === 'customer') return <CustomerForm isActive={active} />;
  if (type === 'product') return <ProductForm isActive={active} />;
  return null;
};

// Prop type validation
AddNew.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default AddNew;
