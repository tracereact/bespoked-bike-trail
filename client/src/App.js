import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ProductList from './components/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import Product from './components/Product';
import SalesPersonList from './components/SalesPersonList';
import { SalesPersonProvider } from './contexts/SalesPersonContext';
import SalesPerson from './components/SalesPerson';
import Footer from './components/Footer';
import Header from './components/Header';

const StyledContainer = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  min-width: 100%;
`;

const App = () => {
  return (
    <StyledContainer>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="modules">
              <ProductList />
              <SalesPersonList />
            </div>
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
      <Footer />
    </StyledContainer>
  );
};

export default App;
