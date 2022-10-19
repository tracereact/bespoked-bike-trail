/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { addSale } from '../../services/sales';
import { useAsyncFn } from '../../hooks/useAsync';

const SalesForm = ({
  productList,
  salesPersonList,
  customerList,
  isActive,
}) => {
  const [productSelection, setProductSelection] = useState();
  const [salesPersonSelection, setSalesPersonSelection] = useState();
  const [customerSelection, setCustomerSelection] = useState();

  const [product, setProduct] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [customer, setCustomer] = useState('');

  const { loading, error, execute: addSaleFn } = useAsyncFn(addSale);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  // Display list of products
  const listProducts = () => {
    const products = productList?.map((p, index) => {
      return (
        <option aria-label="Customer List" key={p.id} value={index}>
          {p.name}
        </option>
      );
    });
    return products;
  };

  // Display list of sales people
  const listSalesPeople = () => {
    const salesPeople = salesPersonList?.map((sp, index) => {
      return (
        <option aria-label="Customer List" key={sp.id} value={index}>
          {`${sp.firstName} ${sp.lastName}`}
        </option>
      );
    });
    return salesPeople;
  };

  // Display list of customers
  const listCustomers = () => {
    const customers = customerList?.map((c, index) => {
      return (
        <option aria-label="Customer List" key={c.id} value={index}>
          {`${c.firstName} ${c.lastName}`}
        </option>
      );
    });
    return customers;
  };

  // Show info of customer selected from drop down
  useEffect(() => {
    setProduct(productSelection?.id);
    setSalesPerson(salesPersonSelection?.id);
    setCustomer(customerSelection?.id);
  }, [productSelection, salesPersonSelection, customerSelection]); // Update when selected customer changes

  // Handle product drop down selection
  const productSelected = (e) => {
    e.preventDefault();
    setProductSelection(productList[e.target.value]);
  };

  // Handle sales person drop down selection
  const salesPersonSelected = (e) => {
    e.preventDefault();
    setSalesPersonSelection(salesPersonList[e.target.value]);
  };

  // Handle customer drop down selection
  const customerSelected = (e) => {
    e.preventDefault();
    setCustomerSelection(customerList[e.target.value]);
  };

  // Send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      productId: product,
      salesPersonId: salesPerson,
      customerId: customer,
    };

    // Submit data then clear form inputs and hide form
    addSaleFn(submission).then(() => {
      setProduct('');
      setSalesPerson('');
      setCustomer('');

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
            return productSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select a product --{' '}
          </option>
          {listProducts()}
        </select>
        <select
          onChange={(e) => {
            return salesPersonSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select a sales person --{' '}
          </option>
          {listSalesPeople()}
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
