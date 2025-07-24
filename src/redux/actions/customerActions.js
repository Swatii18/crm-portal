// Action Types
export const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';

// Action Creators
export const loadCustomers = (customers) => ({
  type: LOAD_CUSTOMERS,
  payload: customers,
});

export const addCustomer = (customer) => ({
  type: ADD_CUSTOMER,
  payload: customer,
});

export const deleteCustomer = (id) => ({
  type: DELETE_CUSTOMER,
  payload: id,
});

export const editCustomer = (customer) => ({
  type: EDIT_CUSTOMER,
  payload: customer,
});
