// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // ✅ FIXED import

import authReducer from './reducers/authReducer';
import customerReducer from './reducers/customerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customerReducer,
});

// ✅ Persisted state for logged-in user + customers
const persistedState = {
  auth: {
    ...authReducer(undefined, {}), // load SuperAdmin always
    isAuthenticated: !!localStorage.getItem('loggedInUser'),
    user: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [],
  },
  customers: {
    list: JSON.parse(localStorage.getItem('customers')) || [],
  },
};

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

export default store;
