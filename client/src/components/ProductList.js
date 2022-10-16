import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import getProducts from '../services/products';

const ProductList = () => {
  const [products, setProducts] = useState();
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return products?.map(product => {
    return (
      <h1 key={product?.id}>
        <Link to={`/products/${product?.id}`}>{product?.name}</Link>
      </h1>
    );
  });
};

export default ProductList;