/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { addSalesPerson } from '../../services/salesPeople';
import { useAsyncFn } from '../../hooks/useAsync';

const SalesPersonForm = ({ isActive }) => {
  // Maintain sales person information as states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  // Get function that allows sales person information to be added asynchronously
  const {
    loading,
    error,
    execute: addSalesPersonFn,
  } = useAsyncFn(addSalesPerson);

  // Flag that determines if the add-prompt is to be shown
  // Default value will be what was passed in as a property
  const [active, setActive] = useState(isActive);

  // Prompt's initial view should be hidden
  useEffect(() => {
    setActive(isActive);
  }, [isActive]); // When the flag changes, update prompt to be shown

  // Send new data to backend to add sales person
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page from reloading
    const submission = {
      firstName: firstName,
      lastName: lastName,
      address: `${address} ${apt}, ${city}, ${state}, ${zipCode}`,
      phone: phone,
    };

    // Submit data then clear form inputs and hide form
    addSalesPersonFn(submission).then(() => {
      setFirstName('');
      setLastName('');
      setAddress('');
      setApt('');
      setCity('');
      setState('');
      setZipCode('');
      setPhone('');

      setActive(false);
    });
  };

  // Render the add-prompt
  return (
    <div className={`form-container ${active ? 'active' : ''}`}>
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">Add New Sales Person</div>
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
SalesPersonForm.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default SalesPersonForm;
