/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import '../../styles/form.css';
import PropTypes from 'prop-types';
import { updateSalesPerson } from '../../services/salesPeople';
import { useAsyncFn } from '../../hooks/useAsync';

const SalesPersonEdit = ({ salesPersonList, isActive }) => {
  const [salesPersonSelection, setSalesPersonSelection] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [terminationDate, setTerminationDate] = useState('');

  const {
    loading,
    error,
    execute: updateSalesPersonFn,
  } = useAsyncFn(updateSalesPerson);

  const [active, setActive] = useState(isActive);

  // Execute when active status changes
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  // Display list of salesPeople
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

  // Show info of salesPerson selected from drop down
  useEffect(() => {
    setFirstName(salesPersonSelection?.firstName);
    setLastName(salesPersonSelection?.lastName);
    setAddress(salesPersonSelection?.address);
    setPhone(salesPersonSelection?.phone);
    setStartDate(salesPersonSelection?.startDate);
    setTerminationDate(salesPersonSelection?.terminationDate);
  }, [salesPersonSelection]); // Update when selected salesPerson changes

  // Handle drop down selection
  const salesPersonSelected = (e) => {
    e.preventDefault();
    setSalesPersonSelection(salesPersonList[e.target.value]);
  };

  // Send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      startDate: startDate,
      terminationDate: terminationDate,
    };

    // Submit data then clear form inputs and hide form
    updateSalesPersonFn(salesPersonSelection.id, submission).then(() => {
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhone('');
      setStartDate('');
      setTerminationDate('');

      // Hide form
      setActive(false);
    });
  };

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
        <input
          type="date"
          id="startDate"
          name="startDate"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => {
            return setStartDate(e.target.value);
          }}
          required
        />
        <input
          type="date"
          id="terminationDate"
          name="terminationDate"
          placeholder="Termination Date"
          value={terminationDate}
          onChange={(e) => {
            return setTerminationDate(e.target.value);
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
SalesPersonEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  salesPersonList: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SalesPersonEdit;
