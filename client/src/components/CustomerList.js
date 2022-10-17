import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getCustomers } from '../services/customers';
import Loader from './Loader';

const StyledError = styled.h1`
  color: red;
`;

const CustomerList = () => {
  const { loading, error, value: customers } = useAsync(getCustomers);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module customer-list">
      <thead>
        <tr>
          <td className="title">Customers</td>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => {
          return (
            <tr key={customer?.id}>
              <td className="entry">
                <Link to={`/customers/${customer?.id}`}>
                  {customer?.firstName} {customer?.lastName}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerList;
