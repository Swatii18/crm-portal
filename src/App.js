import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import { Container, Typography, Button, TextField, Paper } from '@mui/material';

// Redux actions
import { logout } from './redux/actions/authActions';
import { loadCustomers, addCustomer, deleteCustomer, editCustomer } from './redux/actions/customerActions';

// Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Components
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const auth = useSelector(state => state.auth);
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const customers = useSelector(state => state.customers.list);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Load customers on mount
  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const userRole = auth.user?.role;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (customer) => {
    if (editingCustomer) {
      dispatch(editCustomer({ ...customer, id: editingCustomer.id }));
      setEditingCustomer(null);
    } else {
      dispatch(addCustomer(customer));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        CRM Dashboard
      </Typography>

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

      {userRole === 'Admin' && (
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <CustomerForm onSubmit={handleAdd} editingCustomer={editingCustomer} />
        </Paper>
      )}

      <CustomerList
        customers={filteredCustomers}
        onDelete={userRole === 'Admin' ? handleDelete : null}
        onEdit={userRole === 'Admin' ? handleEdit : null}
        isAdmin={userRole === 'Admin'}
      />

      {userRole !== 'Admin' && (
        <Typography color="textSecondary" style={{ marginTop: '10px' }}>
          * You are in read-only mode. Only Admins can add/edit/delete.
        </Typography>
      )}
    </Container>
  );
};

export default App;
