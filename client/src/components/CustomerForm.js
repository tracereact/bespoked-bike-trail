/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import '../styles/form.css';
import PropTypes from 'prop-types';
import { addCustomer } from '../services/customers';
import { useAsyncFn } from '../hooks/useAsync';

const CustomerForm = ({ initialValue }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const { loading, error, execute: addCustomerFn } = useAsyncFn(addCustomer);

  // Send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      firstName: firstName,
      lastName: lastName,
      address: `${address} ${apt}, ${city}, ${state}, ${zipCode}`,
      phone: phone,
    };

    // Submit data then clear form inputs
    addCustomerFn(submission).then((customer) => {
      setFirstName(initialValue);
      setLastName(initialValue);
      setAddress(initialValue);
      setApt(initialValue);
      setCity(initialValue);
      setState(initialValue);
      setZipCode(initialValue);
      setPhone(initialValue);

      console.log(customer);
    });
  };

  return (
    <div className="form-container active">
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">Add New Customer</div>
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
        <input
          type="text"
          id="address"
          name="address"
          pattern="[a-zA-Z0-9\s,'-]*$"
          minLength="2"
          placeholder="Address"
          value={address}
          onChange={(e) => {
            return setAddress(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="apt"
          name="apt"
          pattern="[A-zÀ-ž -]+"
          minLength="2"
          placeholder="Apartment, suite, etc."
          value={apt}
          onChange={(e) => {
            return setApt(e.target.value);
          }}
        />
        <input
          type="text"
          id="city"
          name="city"
          pattern="[A-zÀ-ž -]+"
          minLength="2"
          placeholder="City"
          value={city}
          onChange={(e) => {
            return setCity(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="state"
          name="state"
          pattern="[A-zÀ-ž -]+"
          minLength="2"
          placeholder="State"
          value={state}
          onChange={(e) => {
            return setState(e.target.value);
          }}
          required
        />
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          pattern="([0-9]{5})(?:[-\s]*([0-9]{4}))?$"
          minLength="5"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => {
            return setZipCode(e.target.value);
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
CustomerForm.propTypes = {
  initialValue: PropTypes.string,
};

CustomerForm.defaultProps = {
  initialValue: '',
};

export default CustomerForm;
