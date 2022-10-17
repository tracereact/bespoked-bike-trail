import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getSales } from '../services/sales';
import Loader from './Loader';
import '../styles/sales.css';

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
        <tr className="header row">
          <th className="col-1">Product</th>
          <th className="col-2">Customer</th>
          <th className="col-3">Date</th>
          <th className="col-4">Price</th>
          <th className="col-5">Sales Person</th>
          <th className="col-6">Commission</th>
        </tr>
        {sales?.map((sale) => {
          return (
            <tr className="row" key={sale?.id}>
              <td className="col-1 product">
                <Link to={`/products/${sale?.productId}`}>
                  {sale?.product?.name}
                </Link>
              </td>
              <td className="col-2 customer">
                <Link
                  to={`/customers/${sale?.customerId}`}
                >{`${sale?.customer?.firstName} ${sale?.customer?.firstName}`}</Link>
              </td>
              <td className="col-3 date">{sale?.salesDate}</td>
              <td className="col-4 price">{sale?.product?.salePrice}</td>
              <td className="col-5 sales-person">
                <Link
                  to={`/sales-people/${sale?.salesPersonId}`}
                >{`${sale?.salesPerson?.firstName} ${sale?.salesPerson?.firstName}`}</Link>
              </td>
              <td className="col-6 commission">
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
