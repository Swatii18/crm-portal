// authActions.js

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT = 'LOGOUT';

const ADMIN_EMAIL = 'itzzswatii@gmail.com';
const ADMIN_PASSWORD = '12345678##@@';

export const login = ({ email, password }) => (dispatch) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Ensure Admin exists in localStorage
  const adminUser = users.find(u => u.email === ADMIN_EMAIL);
  if (!adminUser) {
    users.push({
      name: 'Super Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'Admin',
    });
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Find user by email & password
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (foundUser) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: foundUser,
    });
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  } else {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const signup = (newUser) => (dispatch) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Prevent signup as Admin via form
  if (newUser.email === ADMIN_EMAIL) {
    alert('Admin account is fixed. Please login with admin credentials.');
    return;
  }

  // Always assign role 'User' to new signups (no self-signup admin)
  newUser.role = 'User';

  // Prevent duplicate email signups
  const exists = users.find(u => u.email === newUser.email);
  if (exists) {
    alert('Email already registered. Please login.');
    return;
  }

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  dispatch({ type: SIGNUP_SUCCESS });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('loggedInUser');
  dispatch({ type: LOGOUT });
};
