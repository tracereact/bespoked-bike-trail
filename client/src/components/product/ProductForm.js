/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { addProduct } from '../../services/products';
import { useAsyncFn } from '../../hooks/useAsync';

const ProductForm = ({ isActive }) => {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [style, setStyle] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [qtyOnHand, setQtyOnHand] = useState('');
  const [commissionPercentage, setCommissionPercentage] = useState('');

  const { loading, error, execute: addProductFn } = useAsyncFn(addProduct);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  // Send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      name: name,
      manufacturer: manufacturer,
      style: style,
      purchasePrice: purchasePrice,
      salePrice: salePrice,
      qtyOnHand: qtyOnHand,
      commissionPercentage: commissionPercentage,
    };

    // Submit data then clear form inputs and hide form
    addProductFn(submission).then(() => {
      setName('');
      setManufacturer('');
      setStyle('');
      setPurchasePrice('');
      setSalePrice('');
      setQtyOnHand('');
      setCommissionPercentage('');

      // Hide form
      setActive(false);
    });
  };

  return (
    <div className={`form-container ${active ? 'active' : ''}`}>
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">Add Product</div>
        <input
          type="text"
          id="name"
          name="name"
          pattern="[a-zA-Z0-9\s,'-]*$"
          minLength="2"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            return setName(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          pattern="[a-zA-Z0-9\s,'-]*$"
          minLength="2"
          placeholder="Manufacturer"
          value={manufacturer}
          onChange={(e) => {
            return setManufacturer(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="style"
          name="style"
          pattern="[a-zA-Z0-9\s,'-]*$"
          minLength="2"
          placeholder="Style"
          value={style}
          onChange={(e) => {
            return setStyle(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="purchasePrice"
          name="purchasePrice"
          minLength="2"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => {
            return setPurchasePrice(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="salePrice"
          name="salePrice"
          minLength="2"
          placeholder="Sale Price"
          value={salePrice}
          onChange={(e) => {
            return setSalePrice(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="qtyOnHand"
          name="qtyOnHand"
          pattern="[0-9\s,'-]*$"
          minLength="2"
          placeholder="Quantity On Hand"
          value={qtyOnHand}
          onChange={(e) => {
            return setQtyOnHand(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="commissionPercentage"
          name="commissionPercentage"
          minLength="2"
          placeholder="Commission Percentage"
          value={commissionPercentage}
          onChange={(e) => {
            return setCommissionPercentage(e.target.value);
          }}
          required
        />
        <button type="submit" id="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <div className="error-msg">{error}</div>
      </form>
    </div>
  );
};

// Prop type validation
ProductForm.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ProductForm;
