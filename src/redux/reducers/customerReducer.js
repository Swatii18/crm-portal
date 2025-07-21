import { LOAD_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER } from '../actions/customerActions';

const initialState = {
  list: JSON.parse(localStorage.getItem('customers')) || [],
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS:
    case ADD_CUSTOMER:
    case DELETE_CUSTOMER:
    case EDIT_CUSTOMER:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
