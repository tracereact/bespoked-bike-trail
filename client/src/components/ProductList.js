import React, {useEffect, useState} from 'react';
import getProducts from '../services/products';

const ProductList = () => {
  const [products, setProducts] = useState();
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return <h1>{JSON.stringify(products)}</h1>;
};

export default ProductList;