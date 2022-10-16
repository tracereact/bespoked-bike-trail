import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ProductList from './components/ProductList';

const StyledContainer = styled.div`
  padding: 2rem;
`;

const App = () => {
  return (
    <StyledContainer>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/products/:id"
          element={
            <ProductProvider>
              <Product />
            </ProductProvider>
          }
        />
      </Routes>
    </StyledContainer>
  );
};

export default App;
