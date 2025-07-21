// Action types
export const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';

// Load customers from localStorage
export const loadCustomers = () => (dispatch) => {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  dispatch({ type: LOAD_CUSTOMERS, payload: customers });
};

export const addCustomer = (customer) => (dispatch, getState) => {
  const customers = [...getState().customers.list];
  
  // Prevent duplicate by email
  if(customers.some(c => c.email === customer.email)) {
    alert('Customer with this email already exists!');
    return;
  }

  customers.push({ ...customer, id: Date.now() });
  localStorage.setItem('customers', JSON.stringify(customers));

  dispatch({ type: ADD_CUSTOMER, payload: customers });
};

export const deleteCustomer = (id) => (dispatch, getState) => {
  let customers = [...getState().customers.list];
  customers = customers.filter(c => c.id !== id);
  localStorage.setItem('customers', JSON.stringify(customers));
  dispatch({ type: DELETE_CUSTOMER, payload: customers });
};

export const editCustomer = (updatedCustomer) => (dispatch, getState) => {
  let customers = [...getState().customers.list];
  customers = customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c);
  localStorage.setItem('customers', JSON.stringify(customers));
  dispatch({ type: EDIT_CUSTOMER, payload: customers });
};
