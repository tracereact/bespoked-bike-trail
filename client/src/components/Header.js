import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  text-align: center;
  font-size: 0.875rem;
  padding: 1rem 0;
  background-color: lightgrey;
  opacity: 0.75;
  width: 100%;
`;

const Header = () => {
  return (
    <StyledHeader className="header">
      <a href="/">Bike Trail</a>
    </StyledHeader>
  );
};

export default Header;
