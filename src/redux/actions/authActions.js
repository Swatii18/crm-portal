// src/redux/actions/authActions.js

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

// ✅ Fixed SuperAdmin (cannot be removed/edited)
const SUPERADMIN = {
  id: 'superadmin-1',
  name: 'Super Admin',
  email: 'itzzswatii@gmail.com',
  password: '12345678##@@',
  role: 'SuperAdmin',
};

// ✅ Always ensure SuperAdmin exists
const ensureSuperAdmin = () => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find((u) => u.email === SUPERADMIN.email);
  if (!exists) {
    users.push(SUPERADMIN);
    localStorage.setItem('users', JSON.stringify(users));
  }
  return users;
};

// ✅ LOGIN
export const login = (email, password) => (dispatch) => {
  const users = ensureSuperAdmin(); // always include SuperAdmin
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } else {
    dispatch({ type: LOGIN_FAIL, payload: 'Invalid email or password' });
  }
};

// ✅ SIGNUP (default role = User)
export const signup = (userData) => (dispatch) => {
  let users = ensureSuperAdmin();

  if (users.find((u) => u.email === userData.email)) {
    dispatch({ type: LOGIN_FAIL, payload: 'Email already exists' });
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'User',
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  dispatch({ type: SIGNUP_SUCCESS, payload: newUser });
};

// ✅ LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('loggedInUser');
  dispatch({ type: LOGOUT });
};
