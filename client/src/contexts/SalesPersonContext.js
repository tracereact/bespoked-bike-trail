import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getSalesPerson } from '../services/salesPeople';

const Context = React.createContext();

const useSalesPerson = () => {
  return useContext(Context);
};

const SalesPersonProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Use custom hook to get product info safely
  const {
    loading,
    error,
    value: salesPerson,
  } = useAsync(() => {
    return getSalesPerson(id);
  }, [id]);

  // Determine what should be shown based on product info received
  let ctx;
  if (loading) ctx = <h1>Loading...</h1>;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        salesPerson: { id, ...salesPerson },
      }}
    >
      {ctx}
    </Context.Provider>
  );
};

// Prop type validation
SalesPersonProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { useSalesPerson, SalesPersonProvider };
