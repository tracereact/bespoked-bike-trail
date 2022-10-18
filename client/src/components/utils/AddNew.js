import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from '../customer/CustomerForm';
import ProductForm from '../product/ProductForm';
import SalesPersonForm from '../salesPerson/SalesPersonForm';
import SalesForm from '../sales/SalesForm';

const AddNew = ({ type, active }) => {
  if (type === 'customer') return <CustomerForm isActive={active} />;
  if (type === 'product') return <ProductForm isActive={active} />;
  if (type === 'salesPerson') return <SalesPersonForm isActive={active} />;
  if (type === 'sale') return <SalesForm isActive={active} />;
  return null;
};

// Prop type validation
AddNew.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default AddNew;
