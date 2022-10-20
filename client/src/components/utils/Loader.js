import React from 'react';
import '../../styles/loader.css';

// Custom loading animation:
// Source: https://loading.io/css/
const Loader = () => {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
