import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={null} />
    </Routes>
  );
};

export default App;
