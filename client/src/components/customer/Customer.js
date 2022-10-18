import React from 'react';
import { useCustomer } from '../../contexts/CustomerContext';

const Customer = () => {
  const { customer } = useCustomer();

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            {customer.firstName} {customer.lastName}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Address</td>
          <td>{customer.address}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>{customer.phone}</td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td>{customer.startDate}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Customer;
