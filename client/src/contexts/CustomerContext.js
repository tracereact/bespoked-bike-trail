import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getCustomer } from '../services/customers';
import Loader from '../components/utils/Loader';

const Context = React.createContext();

// Gather customer information from context
const useCustomer = () => {
  return useContext(Context);
};

const CustomerProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Get customer information asynchronously
  const {
    loading,
    error,
    value: customer,
  } = useAsync(() => {
    return getCustomer(id);
  }, [id]); // Update information every time ID changes

  // Determine what should be shown based on customer info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  // Render customer context
  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        customer: { id, ...customer }, // Expose customer id and all other attributes
      }}
    >
      {ctx}
    </Context.Provider>
  );
};

// Prop type validation
CustomerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { useCustomer, CustomerProvider };
