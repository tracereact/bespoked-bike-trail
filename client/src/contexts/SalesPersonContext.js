import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getSalesPerson } from '../services/salesPeople';
import Loader from '../components/utils/Loader';

const Context = React.createContext();

// Gather sales person information from context
const useSalesPerson = () => {
  return useContext(Context);
};

const SalesPersonProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Get sales person information asynchronously
  const {
    loading,
    error,
    value: salesPerson,
  } = useAsync(() => {
    return getSalesPerson(id);
  }, [id]); // Update information every time ID changes

  // Determine what should be shown based on sales person info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <p>{error}</p>;
  else ctx = children;

  // Render sales person context
  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        salesPerson: { id, ...salesPerson }, // Expose sales person id and all other attributes
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
