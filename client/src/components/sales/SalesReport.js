import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAsync } from '../../hooks/useAsync';
import { getSalesPersonSales } from '../../services/sales';
import Loader from '../utils/Loader';

const StyledError = styled.p`
  color: red;
`;

const SalesReport = ({ salesPersonId }) => {
  const {
    loading,
    error,
    value: sales,
  } = useAsync(() => {
    return getSalesPersonSales(salesPersonId);
  }, [salesPersonId]);

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
          <td className="title" colSpan={5}>
            Sales Report{' '}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="header row">
          <th className="col-0"> </th>
          <th className="col-1">Product</th>
          <th className="col-2">Customer</th>
          <th className="col-3">Date</th>
          <th className="col-4">Price</th>
          <th className="col-5">Commission</th>
        </tr>
        {sales?.map((sale) => {
          return (
            <tr className="row" key={sale?.id}>
              <td className="col-0"> </td>
              <td className="col-1 product">
                <Link to={`/products/${sale?.productId}`}>
                  {sale?.product?.name}
                </Link>
              </td>
              <td className="col-2 customer">
                <Link
                  to={`/customers/${sale?.customerId}`}
                >{`${sale?.customer?.firstName} ${sale?.customer?.lastName}`}</Link>
              </td>
              <td className="col-3 date">{sale?.salesDate}</td>
              <td className="col-4 price">{sale?.product?.salePrice}</td>
              <td className="col-5 commission">
                {sale?.product?.commissionPercentage}
              </td>
            </tr>
          );
        })}
        <tr>
          <th>Total Earnings</th>
          <td>
            $
            {sales?.reduce((total, sale) => {
              // Extract string values from object
              const { commissionPercentage, salePrice } = sale.product;

              // Convert dollar amount to double
              // Convert percentage to float
              let earnings =
                Number(salePrice.replace(/[^0-9.-]+/g, '')) *
                (parseFloat(commissionPercentage) / 100.0);

              earnings = Math.round(earnings * 100) / 100;

              return total + earnings;
            }, 0.0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Prop type validation
SalesReport.propTypes = {
  salesPersonId: PropTypes.string.isRequired,
};

export default SalesReport;