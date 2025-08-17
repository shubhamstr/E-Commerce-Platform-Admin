import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const AddEditUserModal = ({ handleClose, userId, open }) => {
  const [formDetails, setFormDetails] = useState({});

  const onChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(formJson);
            handleClose();
          }
        }}
      >
        <DialogTitle>{userId ? 'Edit' : 'Add'} User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="firstName"
                label="First Name"
                value={formDetails?.firstName || ''}
                type="text"
                fullWidth
                variant="standard"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="lastName"
                label="Last Name"
                value={formDetails?.lastName || ''}
                type="text"
                fullWidth
                variant="standard"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                name="mobileNumber"
                label="Mobile Number"
                value={formDetails?.mobileNumber || ''}
                type="text"
                fullWidth
                variant="standard"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField required margin="dense" name="email" label="Email" type="email" fullWidth variant="standard" onChange={onChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="userTypeLabel">User Type</InputLabel>
                <Select labelId="userTypeLabel" value={formDetails?.userType || ''} name="userType" onChange={onChange}>
                  <MenuItem value={''}>Select UserType</MenuItem>
                  <MenuItem value={'user'}>User</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'seller'}>Seller</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{userId ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditUserModal;
