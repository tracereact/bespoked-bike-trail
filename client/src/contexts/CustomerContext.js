import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getCustomer } from '../services/customers';
import Loader from '../components/Loader';

const Context = React.createContext();

const useCustomer = () => {
  return useContext(Context);
};

const CustomerProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Use custom hook to get customer info safely
  const {
    loading,
    error,
    value: customer,
  } = useAsync(() => {
    return getCustomer(id);
  }, [id]);

  // Determine what should be shown based on customer info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        customer: { id, ...customer },
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
