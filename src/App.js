import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Container, Typography, Button, TextField, Paper } from '@mui/material';

// Redux actions
import { logout } from './redux/actions/authActions';
import { addCustomer, deleteCustomer, editCustomer, loadCustomers } from './redux/actions/customerActions';

// Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Components
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

// Utils for localStorage persistence
const loadState = () => {
  try {
    const serializedUsers = localStorage.getItem('users');
    const serializedCustomers = localStorage.getItem('customers');
    return {
      users: serializedUsers ? JSON.parse(serializedUsers) : undefined,
      customers: serializedCustomers ? JSON.parse(serializedCustomers) : undefined,
    };
  } catch {
    return {};
  }
};

const saveState = (users, customers) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('customers', JSON.stringify(customers));
  } catch {
    // Ignore write errors
  }
};

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const customers = useSelector((state) => state.customers.list);

  // Persist users & customers in localStorage
  useEffect(() => {
    if (auth.users) saveState(auth.users, customers);
  }, [auth.users, customers]);

  // On app load, dispatch load from localStorage if available
  useEffect(() => {
    const { users, customers } = loadState();
    if (users) {
      users.forEach(user => {
        // Only add if not exist, avoids duplication
        if (!auth.users.find(u => u.email === user.email)) {
          dispatch({ type: 'SIGNUP', payload: user });
        }
      });
    }
    if (customers) {
      dispatch(loadCustomers(customers));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// PrivateRoute for protecting Dashboard
const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

// Dashboard Component
const Dashboard = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const customers = useSelector((state) => state.customers.list);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);

  const userRole = auth.user?.role;

  // Filter customers by search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add or Edit customer handler
  const handleAdd = (customer) => {
    if (editingCustomer) {
      dispatch(editCustomer({ ...customer, id: editingCustomer.id }));
      setEditingCustomer(null);
    } else {
      dispatch(addCustomer({ ...customer, id: Date.now() }));
    }
  };

  // Delete customer
  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  // Edit customer start
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>CRM Dashboard</Typography>

      <Typography variant="subtitle1" gutterBottom>
        Welcome, {auth.user?.name} ({auth.user?.role})
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(logout())}
        style={{ marginBottom: '20px' }}
      >
        Logout
      </Button>

      <TextField
        fullWidth
        label="Search customers"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {userRole === 'Admin' || userRole === 'SuperAdmin' ? (
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <CustomerForm onSubmit={handleAdd} editingCustomer={editingCustomer} />
        </Paper>
      ) : null}

      <CustomerList
        customers={filteredCustomers}
        onDelete={(userRole === 'Admin' || userRole === 'SuperAdmin') ? handleDelete : null}
        onEdit={(userRole === 'Admin' || userRole === 'SuperAdmin') ? handleEdit : null}
        isAdmin={userRole === 'Admin' || userRole === 'SuperAdmin'}
      />

      {(userRole !== 'Admin' && userRole !== 'SuperAdmin') && (
        <Typography color="textSecondary" style={{ marginTop: '10px' }}>
          * You are in read-only mode. Only Admins can add/edit/delete.
        </Typography>
      )}
    </Container>
  );
};

export default App;
