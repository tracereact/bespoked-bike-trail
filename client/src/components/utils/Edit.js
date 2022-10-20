import React from 'react';
import PropTypes from 'prop-types';
import CustomerEdit from '../customer/CustomerEdit';
import ProductEdit from '../product/ProductEdit';
import SalesPersonEdit from '../salesPerson/SalesPersonEdit';

const Edit = ({ type, list, active }) => {
  // Determine what edit-prompt to display
  if (type === 'customer')
    return <CustomerEdit customerList={list} isActive={active} />;
  if (type === 'product')
    return <ProductEdit productList={list} isActive={active} />;
  if (type === 'salesPerson')
    return <SalesPersonEdit salesPersonList={list} isActive={active} />;

  return <div />; // Shouldn't reach here
};

// Prop type validation
Edit.propTypes = {
  type: PropTypes.string.isRequired,
  list: PropTypes.shape.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Edit;
