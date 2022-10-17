import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/products';
import Loader from './Loader';

const StyledError = styled.h1`
  color: red;
`;

const ProductList = () => {
  const { loading, error, value: products } = useAsync(getProducts);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module">
      <thead>
        <tr>
          <td className="title">Inventory</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="entry">
            {products?.map((product) => {
              return (
                <p key={product?.id}>
                  <Link to={`/products/${product?.id}`}>{product?.name}</Link>
                </p>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductList;
