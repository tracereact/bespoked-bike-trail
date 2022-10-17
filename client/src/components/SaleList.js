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
          <td className="title">Sales</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="entry">
            {sales?.map((sale) => {
              return (
                <p key={sale?.id}>
                  <Link to={`/sales/${sale?.id}`}>{sale?.id}</Link>
                </p>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SaleList;
