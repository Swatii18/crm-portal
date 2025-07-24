import { LOAD_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER } from '../actions/customerActions';

const initialState = {
  list: [],
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS:
      return { ...state, list: action.payload };
    case ADD_CUSTOMER:
      return { ...state, list: [...state.list, action.payload] };
    case DELETE_CUSTOMER:
      return { ...state, list: state.list.filter(c => c.id !== action.payload) };
    case EDIT_CUSTOMER:
      return {
        ...state,
        list: state.list.map(c => c.id === action.payload.id ? action.payload : c),
      };
    default:
      return state;
  }
}
