import { LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('loggedInUser'),
  user: JSON.parse(localStorage.getItem('loggedInUser')) || null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false, user: null, error: 'Invalid credentials' };
    case SIGNUP_SUCCESS:
      return { ...state, error: null };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null, error: null };
    default:
      return state;
  }
}
