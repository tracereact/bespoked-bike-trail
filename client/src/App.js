import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ProductList from './components/product/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import Product from './components/product/Product';
import SalesPersonList from './components/salesPerson/SalesPersonList';
import { SalesPersonProvider } from './contexts/SalesPersonContext';
import SalesPerson from './components/salesPerson/SalesPerson';
import Footer from './components/utils/Footer';
import Header from './components/utils/Header';
import SaleList from './components/sales/SaleList';
import CustomerList from './components/customer/CustomerList';
import { CustomerProvider } from './contexts/CustomerContext';
import Customer from './components/customer/Customer';

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
              <SalesPersonList />
              <ProductList />
              <CustomerList />
              <SaleList />
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
        <Route
          path="/customers/:id"
          element={
            <CustomerProvider>
              <Customer />
            </CustomerProvider>
          }
        />
      </Routes>
      <Footer />
    </StyledContainer>
  );
};

export default App;
