/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { updateSalesPerson } from '../../services/salesPeople';
import { useAsyncFn } from '../../hooks/useAsync';

const SalesPersonEdit = ({ salesPersonList, isActive }) => {
  // Store current sales person and their information as states
  const [salesPersonSelection, setSalesPersonSelection] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Get function that allows sales person information to be updated asynchronously
  const {
    loading,
    error,
    execute: updateSalesPersonFn,
  } = useAsyncFn(updateSalesPerson);

  // Flag that determines if the edit-prompt is to be shown
  // Default value will be what was passed in as a property
  const [active, setActive] = useState(isActive);

  // Prompt's initial view should be hidden
  useEffect(() => {
    setActive(isActive);
  }, [isActive]); // When the flag changes, update prompt to be shown

  // Display list of sales people in the drop-down menu
  const listSalesPeople = () => {
    const salesPeople = salesPersonList.map((salesPerson, index) => {
      return (
        <option
          aria-label="SalesPerson List"
          key={salesPerson.id}
          value={index}
        >
          {`${salesPerson.firstName} ${salesPerson.lastName}`}
        </option>
      );
    });
    return salesPeople;
  };

  // Set fields of edit prompt to show current information for selected sales person
  useEffect(() => {
    setFirstName(salesPersonSelection?.firstName);
    setLastName(salesPersonSelection?.lastName);
    setAddress(salesPersonSelection?.address);
    setPhone(salesPersonSelection?.phone);
  }, [salesPersonSelection]); // Update when selected sales person changes

  // Handle drop down selection and update selected sales person
  const salesPersonSelected = (e) => {
    e.preventDefault();
    setSalesPersonSelection(salesPersonList[e.target.value]);
  };

  // Send new data to backend to update sales person information
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const submission = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
    };

    // Submit data then clear form inputs and hide form
    updateSalesPersonFn(salesPersonSelection.id, submission).then(() => {
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhone('');

      // Hide form
      setActive(false);
    });
  };

  // Render the edit-prompt
  return (
    <div className={`form-container ${active ? 'active' : ''}`}>
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">Edit Sales Person</div>
        <select
          onChange={(e) => {
            return salesPersonSelected(e);
          }}
          required
        >
          <option disabled selected value>
            {' '}
            -- select an sales person --{' '}
          </option>
          {listSalesPeople()}
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
SalesPersonEdit.propTypes = {
  salesPersonList: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SalesPersonEdit;
