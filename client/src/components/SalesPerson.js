import React from 'react';
import { useSalesPerson } from '../contexts/SalesPersonContext';

const SalesPerson = () => {
  const { salesPerson } = useSalesPerson();

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            {salesPerson.firstName} {salesPerson.lastName}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Address</td>
          <td>{salesPerson.address}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>{salesPerson.phone}</td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td>{salesPerson.startDate}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SalesPerson;
