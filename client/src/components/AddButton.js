/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddButton = ({ onButtonClicked }) => {
  return (
    <button type="button" onClick={onButtonClicked}>
      <span>
        <FaPlusSquare />
      </span>
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
