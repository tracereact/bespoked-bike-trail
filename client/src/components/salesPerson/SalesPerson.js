import React from 'react';
import { useSalesPerson } from '../../contexts/SalesPersonContext';
import SalesReport from '../sales/SalesReport';

const SalesPerson = () => {
  // Get information on sales person from context
  const { salesPerson } = useSalesPerson();

  // Render a table with sales person information
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
      {/* Show the sales report of the selected sales person */}
      <SalesReport salesPersonId={salesPerson.id} />
    </div>
  );
};

export default SalesPerson;
