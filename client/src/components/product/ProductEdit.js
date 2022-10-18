/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { updateProduct } from '../../services/products';
import { useAsyncFn } from '../../hooks/useAsync';

const ProductEdit = ({ productList, isActive }) => {
  const [productSelection, setProductSelection] = useState();
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [style, setStyle] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [qtyOnHand, setQtyOnHand] = useState('');
  const [commissionPercentage, setCommissionPercentage] = useState('');

  const {
    loading,
    error,
    execute: updateProductFn,
  } = useAsyncFn(updateProduct);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  // Display list of products
  const listProducts = () => {
    const products = productList.map((product, index) => {
      return (
        <option aria-label="Product List" key={product.id} value={index}>
          {product.name}
        </option>
      );
    });
    return products;
  };

  // Show info of product selected from drop down
  useEffect(() => {
    setName(productSelection?.name);
    setManufacturer(productSelection?.manufacturer);
    setStyle(productSelection?.style);
    setPurchasePrice(productSelection?.purchasePrice);
    setSalePrice(productSelection?.salePrice);
    setQtyOnHand(productSelection?.qtyOnHand);
    setCommissionPercentage(productSelection?.commissionPercentage);
  }, [productSelection]); // Update when selected product changes

  // Handle drop down selection
  const productSelected = (e) => {
    e.preventDefault();
    setProductSelection(productList[e.target.value]);
  };

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
    updateProductFn(productSelection.id, submission).then(() => {
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
        <div className="title">Edit Product</div>
        <select
          onChange={(e) => {
            return productSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select an product --{' '}
          </option>
          {listProducts()}
        </select>
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
ProductEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  productList: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ProductEdit;
