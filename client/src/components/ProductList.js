import React, {useEffect, useState} from 'react';
import getProducts from '../services/products';

const ProductList = () => {
  const [products, setProducts] = useState();
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return products?.map(product => {
    return (
      <h1 key={product?.id}>
        <a href={`/products/${product?.id}`}>{product?.name}</a>
      </h1>
    );
  });
};

export default ProductList;