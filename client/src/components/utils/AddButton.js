import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddButton = ({ onButtonClicked }) => {
  return (
    <button type="button" onClick={onButtonClicked}>
      <FaPlusSquare />
    </button>
  );
};

// Prop type validation
AddButton.propTypes = {
  onButtonClicked: PropTypes.func,
};

AddButton.defaultProps = {
  onButtonClicked: () => {}, // Default is to do nothing
};

export default AddButton;
