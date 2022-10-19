import React from 'react';
import { useSalesPerson } from '../../contexts/SalesPersonContext';
import SalesReport from '../sales/SalesReport';

const SalesPerson = () => {
  const { salesPerson } = useSalesPerson();

  return (
    <div>
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
      <SalesReport salesPersonId={salesPerson.id} />
    </div>
  );
};

export default SalesPerson;
