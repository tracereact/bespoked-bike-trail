import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getSalesPeople } from '../services/salesPeople';
import Loader from './Loader';

const StyledError = styled.h1`
  color: red;
`;

const SalesPersonList = () => {
  const { loading, error, value: salesPeople } = useAsync(getSalesPeople);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module sales-person-list">
      <thead>
        <tr>
          <td className="title">Sales People</td>
        </tr>
      </thead>
      <tbody>
        {salesPeople?.map((salesPerson) => {
          return (
            <tr key={salesPerson?.id}>
              <td className="entry">
                <Link to={`/sales-people/${salesPerson?.id}`}>
                  {salesPerson?.firstName} {salesPerson?.lastName}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalesPersonList;
