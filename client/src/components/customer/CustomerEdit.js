/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { updateCustomer } from '../../services/customers';
import { useAsyncFn } from '../../hooks/useAsync';

const CustomerEdit = ({ customerList, isActive }) => {
  const [customerSelection, setCustomerSelection] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const {
    loading,
    error,
    execute: updateCustomerFn,
  } = useAsyncFn(updateCustomer);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

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
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
    };

    // Submit data then clear form inputs and hide form
    updateCustomerFn(customerSelection.id, submission).then(() => {
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhone('');

      // Hide form
      setActive(false);
    });
  };

  return (
    <div className={`form-container ${active ? 'active' : ''}`}>
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">Edit Customer</div>
        <select
          onChange={(e) => {
            return customerSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select an customer --{' '}
          </option>
          {listCustomers()}
        </select>
        <input
          type="text"
          id="firstName"
          name="firstName"
          pattern="[A-zÀ-ž -]+"
          minLength="2"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            return setFirstName(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          pattern="[A-zÀ-ž -]+"
          minLength="2"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            return setLastName(e.target.value);
          }}
          required
        />
        <textarea
          id="address"
          name="address"
          pattern="[a-zA-Z0-9\s,'-]*$"
          minLength="5"
          placeholder="Address"
          value={address}
          onChange={(e) => {
            return setAddress(e.target.value);
          }}
          required
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          minLength="10"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            return setPhone(e.target.value);
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
CustomerEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  customerList: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CustomerEdit;
