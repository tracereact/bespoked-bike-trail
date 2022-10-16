import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ProductList from './components/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import Product from './components/Product';
import SalesPersonList from './components/SalesPersonList';
import { SalesPersonProvider } from './contexts/SalesPersonContext';
import SalesPerson from './components/SalesPerson';

const StyledContainer = styled.div`
  padding: 2rem;
`;

const App = () => {
  return (
    <StyledContainer>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductList />
              <SalesPersonList />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductProvider>
              <Product />
            </ProductProvider>
          }
        />
        <Route
          path="/sales-people/:id"
          element={
            <SalesPersonProvider>
              <SalesPerson />
            </SalesPersonProvider>
          }
        />
      </Routes>
    </StyledContainer>
  );
};

export default App;
