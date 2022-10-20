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
  /**
   * Get information for all products in the database
   * Loading and error flags are all retrieved
   */
  const { loading, error, value: products } = useAsync(getProducts);

  // Flags that determine if the add or edit prompts are to be shown
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  // Show loading symbol if module is still loading
  if (loading) {
    return <Loader />;
  }

  // Show error message if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  // If no errors found and not loading, render a table with all product information
  return (
    <table className="module product-list">
      <thead>
        <tr>
          <td className="title">
            Inventory{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true); // Show prompt
              }}
            />
            <AddNew type="product" active={addActive} />{' '}
            <EditButton
              onButtonClicked={() => {
                setEditActive(true); // Show prompt
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
