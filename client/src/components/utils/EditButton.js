import React from 'react';
import { FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

const EditButton = ({ onButtonClicked }) => {
  return (
    <button type="button" onClick={onButtonClicked}>
      <FaEdit />
    </button>
  );
};

// Prop type validation
EditButton.propTypes = {
  onButtonClicked: PropTypes.func,
};

EditButton.defaultProps = {
  onButtonClicked: () => {}, // Default is to do nothing
};

export default EditButton;
