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
  const { loading, error, value: customers } = useAsync(getCustomers);

  const [active, setActive] = useState(false);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module customer-list">
      <thead>
        <tr>
          <td className="title">
            Customers&nbsp;
            <AddButton
              onButtonClicked={() => {
                setActive(true);
              }}
            />
            <AddNew type="customer" active={active} />
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
                &nbsp;
                <EditButton
                  onButtonClicked={() => {
                    setActive(true);
                  }}
                />
                <Edit
                  type="customer"
                  name={`${customer?.firstName} ${customer?.lastName}`}
                  id={customer?.id}
                  active={active}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerList;
