import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  text-align: center;
  font-size: 2rem;
  padding: 1rem 0;
  width: 100%;
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const Header = () => {
  return (
    <StyledHeader className="header">
      <StyledAnchor href="/">Bike Trail</StyledAnchor>
    </StyledHeader>
  );
};

export default Header;
