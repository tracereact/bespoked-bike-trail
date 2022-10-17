import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getSales } from '../services/sales';
import Loader from './Loader';

const StyledError = styled.h1`
  color: red;
`;

const SaleList = () => {
  const { loading, error, value: sales } = useAsync(getSales);

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
            Sales
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
                >{`${sale?.customer?.firstName} ${sale?.customer?.firstName}`}</Link>
              </td>
              <td className="date">{sale?.salesDate}</td>
              <td className="price">{sale?.product?.salePrice}</td>
              <td className="sales-person">
                <Link
                  to={`/sales-people/${sale?.salesPersonId}`}
                >{`${sale?.salesPerson?.firstName} ${sale?.salesPerson?.firstName}`}</Link>
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
