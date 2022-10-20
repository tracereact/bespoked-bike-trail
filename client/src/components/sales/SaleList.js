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

  // Get information from API on each object
  const { value: products } = useAsync(getProducts);
  const { value: salesPeople } = useAsync(getSalesPeople);
  const { value: customers } = useAsync(getCustomers);

  const [addActive, setAddActive] = useState(false);

  // Show loading symbol if module is still loading
  if (loading) {
    return <Loader />;
  }

  // Show error message if there is an error
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
                >{`${sale?.customer?.firstName} ${sale?.customer?.lastName}`}</Link>
              </td>
              <td className="col-3 date">{sale?.salesDate}</td>
              <td className="col-4 price">{sale?.salePrice}</td>
              <td className="col-5 sales-person">
                <Link
                  to={`/sales-people/${sale?.salesPersonId}`}
                >{`${sale?.salesPerson?.firstName} ${sale?.salesPerson?.lastName}`}</Link>
              </td>
              <td className="col-6 commission">{sale?.saleCommission}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SaleList;
