import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../redux/actions/authActions';
import { Paper, Typography, Button, Select, MenuItem } from '@mui/material';

export default function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const superAdminEmail = 'itzzswatii@gmail.com';

  const handleRoleChange = (email, newRole) => {
    dispatch(updateUserRole(email, newRole));
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '30px' }}>
      <Typography variant="h5" gutterBottom>User Management</Typography>

      {users.map((u) => (
        <Paper key={u.email} style={{ padding: '10px', margin: '10px 0' }}>
          <Typography><strong>{u.name}</strong> ({u.email})</Typography>
          
          {u.email === superAdminEmail ? (
            <Typography color="secondary">Super Admin (locked)</Typography>
          ) : (
            <>
              <Select
                value={u.role}
                onChange={(e) => handleRoleChange(u.email, e.target.value)}
                style={{ marginRight: '10px' }}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              </Select>
              <Button variant="contained" onClick={() => handleRoleChange(u.email, u.role)}>
                Save
              </Button>
            </>
          )}
        </Paper>
      ))}
    </Paper>
  );
}
