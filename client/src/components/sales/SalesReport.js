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
  
  // Get sales person information based on ID
  // Update information every time ID changes
  const {
    loading,
    error,
    value: sales,
  } = useAsync(() => {
    return getSalesPersonSales(salesPersonId);
  }, [salesPersonId]);

  // Show loading symbol if module is still loading
  if (loading) {
    return <Loader />;
  }

  // Show error message if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

 /**
   * If no errors found and not loading, return a table with all sales information
   * for the specified sales person
  */
  return (
    <table className="module sale-list">
      <thead>
        <tr>
          <td className="title" colSpan={6}>
            Sales Report
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
              <td className="col-4 price">{sale?.salePrice}</td>
              <td className="col-5 commission">{sale?.saleCommission}</td>
            </tr>
          );
        })}
        <tr>
          <th>Total Earnings</th>
          <td>
            $
            {sales?.reduce((total, sale) => {
              
              // Extract string values from object
              const { saleCommission, salePrice } = sale;

              // Convert dollar amount string to double
              // Convert percentage string to float
              let earnings =
                Number(salePrice.replace(/[^0-9.-]+/g, '')) *
                (parseFloat(saleCommission) / 100.0);

              // Calculate earnings from sale and round to nearest penny
              earnings = Math.round(earnings * 100) / 100;

              // Recursively sum all earnings from each sale
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
