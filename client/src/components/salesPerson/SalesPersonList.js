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
  const { loading, error, value: salesPeople } = useAsync(getSalesPeople);

  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  // Check if data is loading
  if (loading) {
    return <Loader />;
  }

  // Check if there is an error
  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  return (
    <table className="module sales-person-list">
      <thead>
        <tr>
          <td className="title">
            Sales People{' '}
            <AddButton
              onButtonClicked={() => {
                setAddActive(true);
              }}
            />
            <AddNew type="salesPerson" active={addActive} />{' '}
            <EditButton
              onButtonClicked={() => {
                setEditActive(true);
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
