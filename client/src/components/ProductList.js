import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/products';

const StyledError = styled.h1`
  color: red;
`;

const ProductList = () => {
  const { loading, error, value: products } = useAsync(getProducts);

  // Check if data is loading
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return products?.map((product) => {
    return (
      <h1 key={product?.id}>
        <Link to={`/products/${product?.id}`}>{product?.name}</Link>
      </h1>
    );
  });
};

export default ProductList;
