import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

const CustomerForm = ({ onSubmit, editingCustomer }) => {
  const [customer, setCustomer] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingCustomer) {
      setCustomer({ name: editingCustomer.name, email: editingCustomer.email });
    } else {
      setCustomer({ name: '', email: '' });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(customer);
    setCustomer({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={customer.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={customer.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        {editingCustomer ? 'Update Customer' : 'Add Customer'}
      </Button>
    </form>
  );
};

export default CustomerForm;
