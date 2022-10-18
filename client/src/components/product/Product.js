import React from 'react';
import { useProduct } from '../../contexts/ProductContext';

const Product = () => {
  const { product } = useProduct();

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>{product.name}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Manufacturer</td>
          <td>{product.manufacturer}</td>
        </tr>
        <tr>
          <td>Style</td>
          <td>{product.style}</td>
        </tr>
        <tr>
          <td>Purchase Price</td>
          <td>{product.purchasePrice}</td>
        </tr>
        <tr>
          <td>Sale Price</td>
          <td>{product.salePrice}</td>
        </tr>
        <tr>
          <td>Quantity on Hand</td>
          <td>{product.qtyOnHand}</td>
        </tr>
        <tr>
          <td>Commission Percentage</td>
          <td>{product.commissionPercentage}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Product;
