import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const CustomerList = ({ customers, onDelete, onEdit, isAdmin }) => {
  if (customers.length === 0) return <p>No customers found.</p>;

  return (
    <List>
      {customers.map((customer) => (
        <ListItem key={customer.id} divider>
          <ListItemText
            primary={customer.name}
            secondary={customer.email}
          />
          {isAdmin && (
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(customer)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(customer.id)}>
                <Delete />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CustomerList;
