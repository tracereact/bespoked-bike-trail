import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getProduct } from '../services/products';
import Loader from '../components/utils/Loader';

const Context = React.createContext();

const useProduct = () => {
  return useContext(Context);
};

const ProductProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Use custom hook to get product info safely
  const {
    loading,
    error,
    value: product,
  } = useAsync(() => {
    return getProduct(id);
  }, [id]);

  // Determine what should be shown based on product info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        product: { id, ...product },
      }}
    >
      {ctx}
    </Context.Provider>
  );
};

// Prop type validation
ProductProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { useProduct, ProductProvider };
