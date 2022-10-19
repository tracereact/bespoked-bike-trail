import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../../hooks/useAsync';
import { getProducts } from '../../services/products';
import Loader from '../utils/Loader';
import AddButton from '../utils/AddButton';
import AddNew from '../utils/AddNew';
import EditButton from '../utils/EditButton';
import Edit from '../utils/Edit';

const StyledError = styled.p`
  color: red;
`;

const ProductList = () => {
  const { loading, error, value: products } = useAsync(getProducts);

  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module product-list">
      <thead>
        <tr>
          <td className="title">
            Inventory{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true);
              }}
            />
            <AddNew type="product" active={addActive} />{' '}
            <EditButton
              onButtonClicked={() => {
                setEditActive(true);
              }}
            />
            <Edit type="product" list={products} active={editActive} />
          </td>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => {
          return (
            <tr key={product?.id}>
              <td className="entry">
                <Link to={`/products/${product?.id}`}>{product?.name}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductList;
