import React from 'react';
import PropTypes from 'prop-types';
import CustomerEdit from '../customer/CustomerEdit';

const Edit = ({ type, active }) => {
  if (type === 'customer') return <CustomerEdit isActive={active} />;
  return null;
};

// Prop type validation
Edit.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Edit;
