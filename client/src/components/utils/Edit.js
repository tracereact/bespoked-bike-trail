import React from 'react';
import PropTypes from 'prop-types';
import CustomerEdit from '../customer/CustomerEdit';

const Edit = ({ type, id, name, active }) => {
  if (type === 'customer')
    return (
      <CustomerEdit customerId={id} customerName={name} isActive={active} />
    );
  return <div/>; // Shouldn't reach here
};

// Prop type validation
Edit.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Edit;
