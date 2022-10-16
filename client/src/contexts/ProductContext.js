import React from 'react';
import PropTypes from 'prop-types';
import { useAsync, useParams } from '../hooks/useAsync';
import { getProduct, getProducts } from '../services/products';

const Context = React.createContext();

const ProductProvider = ({ children }) => {
  const { id } = useParams();
  const {
    loading,
    error,
    value: product,
  } = useAsync(() => {
    getProducts(id);
  }, [id]);

  let ctx;
  if (loading) ctx = <h1>Loading...</h1>;
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

export default ProductProvider;
