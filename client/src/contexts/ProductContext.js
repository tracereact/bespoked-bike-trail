import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAsync } from '../hooks/useAsync';
import { getProduct } from '../services/products';
import Loader from '../components/utils/Loader';

const Context = React.createContext();

// Gather product information from context
const useProduct = () => {
  return useContext(Context);
};

const ProductProvider = ({ children }) => {
  const { id } = useParams(); // Get id from caller

  // Get product information asynchronously
  const {
    loading,
    error,
    value: product,
  } = useAsync(() => {
    return getProduct(id);
  }, [id]); // Update information every time ID changes

  // Determine what should be shown based on product info received
  let ctx;
  if (loading) ctx = <Loader />;
  else if (error) ctx = <h1>{error}</h1>;
  else ctx = children;

  // Render customer context
  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        product: { id, ...product }, // Expose product id and all other attributes
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
