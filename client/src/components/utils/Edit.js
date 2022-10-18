import React from 'react';
import PropTypes from 'prop-types';
import CustomerEdit from '../customer/CustomerEdit';

const Edit = ({ type, list, active }) => {
  if (type === 'customer')
    return <CustomerEdit customerList={list} isActive={active} />;
  return <div />; // Shouldn't reach here
};

// Prop type validation
Edit.propTypes = {
  type: PropTypes.string.isRequired,
  list: PropTypes.shape.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Edit;
