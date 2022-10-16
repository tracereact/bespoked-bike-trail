import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../hooks/useAsync';
import { getSalesPeople } from '../services/salesPeople';

const StyledError = styled.h1`
  color: red;
`;

const SalesPersonList = () => {
  const { loading, error, value: salesPeople } = useAsync(getSalesPeople);

  // Check if data is loading
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return salesPeople?.map((salesPerson) => {
    return (
      <h1 key={salesPerson?.id}>
        <Link to={`/sales-people/${salesPerson?.id}`}>
          {salesPerson?.firstName} {salesPerson?.lastName}
        </Link>
      </h1>
    );
  });
};

export default SalesPersonList;