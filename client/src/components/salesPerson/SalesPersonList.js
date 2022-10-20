import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAsync } from '../../hooks/useAsync';
import { getSalesPeople } from '../../services/salesPeople';
import Loader from '../utils/Loader';
import AddButton from '../utils/AddButton';
import AddNew from '../utils/AddNew';
import EditButton from '../utils/EditButton';
import Edit from '../utils/Edit';

const StyledError = styled.p`
  color: red;
`;

const SalesPersonList = () => {
  /**
   * Get information for all sales people from the database
   * Loading and error flags are all retrieved
   */
  const { loading, error, value: salesPeople } = useAsync(getSalesPeople);

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

  // If no errors found and not loading, render a table with all sales people information
  return (
    <table className="module sales-person-list">
      <thead>
        <tr>
          <td className="title">
            Sales People{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true); // Show prompt
              }}
            />
            <AddNew type="salesPerson" active={addActive} />{' '}
            <EditButton
              onButtonClicked={() => {
                setEditActive(true); // Show prompt
              }}
            />
            <Edit type="salesPerson" list={salesPeople} active={editActive} />
          </td>
        </tr>
      </thead>
      <tbody>
        {salesPeople?.map((salesPerson) => {
          return (
            <tr key={salesPerson?.id}>
              <td className="entry">
                <Link to={`/sales-people/${salesPerson?.id}`}>
                  {salesPerson?.firstName} {salesPerson?.lastName}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalesPersonList;
