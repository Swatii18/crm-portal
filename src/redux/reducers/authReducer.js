// src/redux/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_SUCCESS } from '../actions/authActions';

const SUPER_ADMIN = {
  id: 'superadmin-1',
  name: 'Super Admin',
  email: 'itzzswatii@gmail.com',
  password: '12345678##@@',
  role: 'SuperAdmin',
};

// ✅ Always load + ensure SuperAdmin
const loadUsers = () => {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const hasSuperAdmin = storedUsers.find((u) => u.email === SUPER_ADMIN.email);
  if (!hasSuperAdmin) storedUsers.push(SUPER_ADMIN);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  return storedUsers;
};

const initialState = {
  isAuthenticated: !!localStorage.getItem('loggedInUser'),
  user: JSON.parse(localStorage.getItem('loggedInUser')) || null,
  users: loadUsers(),
  error: null,
};

// ✅ The actual reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload, error: null };

    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false, user: null, error: action.payload };

    case SIGNUP_SUCCESS: {
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return { ...state, users: updatedUsers, error: null };
    }

    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
}
