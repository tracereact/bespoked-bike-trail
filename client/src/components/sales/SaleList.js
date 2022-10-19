import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../../hooks/useAsync';
import { getSales } from '../../services/sales';
import Loader from '../utils/Loader';
import AddButton from '../utils/AddButton';
import AddNew from '../utils/AddNew';
import { getProducts } from '../../services/products';
import { getSalesPeople } from '../../services/salesPeople';
import { getCustomers } from '../../services/customers';

const StyledError = styled.p`
  color: red;
`;

const SaleList = () => {
  const { loading, error, value: sales } = useAsync(getSales);

  // Track list of objects
  const { value: products } = useAsync(getProducts);
  const { value: salesPeople } = useAsync(getSalesPeople);
  const { value: customers } = useAsync(getCustomers);

  const [addActive, setAddActive] = useState(false);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module sale-list">
      <thead>
        <tr>
          <td className="title" colSpan={6}>
            Sales{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true);
              }}
            />
            <AddNew
              type="sale"
              products={products}
              salesPeople={salesPeople}
              customers={customers}
              active={addActive}
            />{' '}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Product</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Price</th>
          <th>Sales Person</th>
          <th>Commission</th>
        </tr>
        {sales?.map((sale) => {
          return (
            <tr key={sale?.id}>
              <td className="product">
                <Link to={`/products/${sale?.productId}`}>
                  {sale?.product?.name}
                </Link>
              </td>
              <td className="customer">
                <Link
                  to={`/customers/${sale?.customerId}`}
                >{`${sale?.customer?.firstName} ${sale?.customer?.lastName}`}</Link>
              </td>
              <td className="date">{sale?.salesDate}</td>
              <td className="price">{sale?.product?.salePrice}</td>
              <td className="sales-person">
                <Link
                  to={`/sales-people/${sale?.salesPersonId}`}
                >{`${sale?.salesPerson?.firstName} ${sale?.salesPerson?.lastName}`}</Link>
              </td>
              <td className="commission">
                {sale?.product?.commissionPercentage}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SaleList;
