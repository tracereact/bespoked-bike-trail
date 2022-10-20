import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../../hooks/useAsync';
import { getCustomers } from '../../services/customers';
import AddButton from '../utils/AddButton';
import AddNew from '../utils/AddNew';
import EditButton from '../utils/EditButton';
import Edit from '../utils/Edit';
import Loader from '../utils/Loader';

const StyledError = styled.p`
  color: red;
`;

const CustomerList = () => {
  /**
   * Get information for all customers in the database
   * Loading and error flags are all retrieved
   */
  const { loading, error, value: customers } = useAsync(getCustomers);

  // Flags that determine if the add or edit prompts are to be shown
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  // Show loading symbol if module is still loading
  if (loading) {
    return <Loader />;
  }

  // Show error message if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  // If no errors found and not loading, return a table with all customer information
  return (
    <table className="module customer-list">
      <thead>
        <tr>
          <td className="title">
            Customers{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true); // Show prompt
              }}
            />
            <AddNew type="customer" active={addActive} />{' '}
            <EditButton
              onButtonClicked={() => {
                setEditActive(true); // Show prompt
              }}
            />
            <Edit type="customer" list={customers} active={editActive} />
          </td>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => {
          return (
            <tr key={customer?.id}>
              <td className="entry">
                <Link to={`/customers/${customer?.id}`}>
                  {customer?.firstName} {customer?.lastName}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerList;
