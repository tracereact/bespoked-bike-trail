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
  // Maintain current selected product, sales person, and customer
  const [productSelection, setProductSelection] = useState();
  const [salesPersonSelection, setSalesPersonSelection] = useState();
  const [customerSelection, setCustomerSelection] = useState();

  // Maintain product, sales person, and customer information as states
  const [product, setProduct] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [customer, setCustomer] = useState('');

  // Get function that allows sale information to be added asynchronously
  const { loading, error, execute: addSaleFn } = useAsyncFn(addSale);

  // Flag that determines if the add-prompt is to be shown
  // Default value will be what was passed in as a property
  const [active, setActive] = useState(isActive);

  // Prompt's initial view should be hidden
  useEffect(() => {
    setActive(isActive);
  }, [isActive]); // When the flag changes, update prompt to be shown

  // Display list of products in the drop-down menu
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

  // Display list of sales people in the drop-down menu
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

  // Display list of customers in the drop-down menu
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

  // Set fields of prompt to show current information for each selection
  useEffect(() => {
    setProduct(productSelection?.id);
    setSalesPerson(salesPersonSelection?.id);
    setCustomer(customerSelection?.id);
  }, [productSelection, salesPersonSelection, customerSelection]); // Update when a selection changes

  // Handle drop down selection and update selected product
  const productSelected = (e) => {
    e.preventDefault(); // Prevent page from reloading
    setProductSelection(productList[e.target.value]);
  };

  // Handle drop down selection and update selected sales person
  const salesPersonSelected = (e) => {
    e.preventDefault(); // Prevent page from reloading
    setSalesPersonSelection(salesPersonList[e.target.value]);
  };

  // Handle drop down selection and update selected customer
  const customerSelected = (e) => {
    e.preventDefault(); // Prevent page from reloading
    setCustomerSelection(customerList[e.target.value]);
  };

  // Send new data to backend to add new sale information
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      productId: product,
      salesPersonId: salesPerson,
      customerId: customer,
      salePrice: product.salePrice,
      saleCommission: product.commissionPercentage,
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

  // Render the add-prompt
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
          {/* If data is being submitted, prevent button spam */}
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {/* Error message will show if server rejects request */}
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
