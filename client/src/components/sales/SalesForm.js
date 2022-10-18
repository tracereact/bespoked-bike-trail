/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { addSale } from '../../services/sales';
import { useAsyncFn } from '../../hooks/useAsync';

const SalesForm = ({  productList, salesPersonList, customerList, isActive }) => {
  const [productSelection, setProductSelection] = useState();
  const [salesPersonSelection, setSalesPersonSelection] = useState();
  const [customerSelection, setCustomerSelection] = useState();

  const [product, setProduct] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [customer, setCustomer] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');


  const { loading, error, execute: addSaleFn } = useAsyncFn(addSale);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

    // Display list of products
    const listProducts = () => {
      const products = productList.map((product, index) => {
        return (
          <option aria-label="Customer List" key={product.id} value={index}>
            {product.name}
          </option>
        );
      });
      return products;
    };

    // Display list of sales people
    const listSalesPeople = () => {
      const salesPeople = salesPersonList.map((salesPerson, index) => {
        return (
          <option aria-label="Customer List" key={salesPerson.id} value={index}>
            {`${salesPerson.firstName} ${salesPerson.lastName}`}
          </option>
        );
      });
      return salesPeople;
    };

    // Display list of customers
    const listCustomers = () => {
      const customers = customerList.map((customer, index) => {
        return (
          <option aria-label="Customer List" key={customer.id} value={index}>
            {`${customer.firstName} ${customer.lastName}`}
          </option>
        );
      });
      return customers;
    };
  
    // Show info of customer selected from drop down
    useEffect(() => {
      setFirstName(customerSelection?.firstName);
      setLastName(customerSelection?.lastName);
      setAddress(customerSelection?.address);
      setPhone(customerSelection?.phone);
    }, [customerSelection]); // Update when selected customer changes
  
    // Handle drop down selection
    const customerSelected = (e) => {
      e.preventDefault();
      setCustomerSelection(customerList[e.target.value]);
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
    addSaleFn(submission).then(() => {
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
        <div className="title">Add Sale</div>
        <select
          onChange={(e) => {
            return customerSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select a product --{' '}
          </option>
          {listCustomers()}
        </select>
        <select
          onChange={(e) => {
            return customerSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select a sales person --{' '}
          </option>
          {listCustomers()}
        </select>
        <select
          onChange={(e) => {
            return customerSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select a customer --{' '}
          </option>
          {listCustomers()}
        </select>
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
SalesForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  productList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  salesPersonList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  customerList: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SalesForm;
