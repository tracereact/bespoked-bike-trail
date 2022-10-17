import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getSale } from '../services/sales';
import Loader from '../components/Loader';

const Context = React.createContext();

const useSale = () => {
  return useContext(Context);
};

const SaleProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Use custom hook to get sale info safely
  const {
    loading,
    error,
    value: sale,
  } = useAsync(() => {
    return getSale(id);
  }, [id]);

  // Determine what should be shown based on sale info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        sale: { id, ...sale },
      }}
    >
      {ctx}
    </Context.Provider>
  );
};

// Prop type validation
SaleProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { useSale, SaleProvider };
