/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from '../customer/CustomerForm';
import ProductForm from '../product/ProductForm';
import SalesPersonForm from '../salesPerson/SalesPersonForm';
import SalesForm from '../sales/SalesForm';

const AddNew = ({ products, salesPeople, customers, type, active }) => {
  if (type === 'customer') return <CustomerForm isActive={active} />;
  if (type === 'product') return <ProductForm isActive={active} />;
  if (type === 'salesPerson') return <SalesPersonForm isActive={active} />;
  if (type === 'sale')
    return (
      <SalesForm
        productList={products}
        salesPersonList={salesPeople}
        customerList={customers}
        isActive={active}
      />
    );
  return null;
};

// Prop type validation
AddNew.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  products: PropTypes.object,
  salesPeople: PropTypes.object,
  customers: PropTypes.object,
};

AddNew.defaultProps = {
  products: {},
  salesPeople: {},
  customers: {},
};

export default AddNew;
