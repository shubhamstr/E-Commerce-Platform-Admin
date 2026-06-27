import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import { registerUser, getUser, updateUser, updatePassword } from '../../services/authService';
import { showSuccess, showError } from '../Utils/toast';

const AddEditUserModal = ({ handleClose, userId, open, onSuccess }) => {
  const [formDetails, setFormDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const res = await getUser(userId);
        const { success, data, message } = res.data;
        if (success) {
          setFormDetails({
            ...(data || {}),
            password: ''
          });
        } else {
          showError(message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error(error);
        showError('Error loading user details');
      } finally {
        setLoading(false);
      }
    };

    if (open && userId) {
      setChangePassword(false);
      fetchUserDetails();
    } else {
      setChangePassword(false);
      setFormDetails({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        userType: '',
        isActive: true,
        password: ''
      });
      setShowPassword(false);
    }
  }, [open, userId]);

  const onChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res;
      if (userId) {
        const { password, ...userDetailsToUpdate } = formDetails;
        res = await updateUser(userId, userDetailsToUpdate);
        if (changePassword && password) {
          await updatePassword(userId, { password });
        }
      } else {
        res = await registerUser(formDetails);
      }
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || (userId ? 'User updated successfully' : 'User created successfully'));
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        showError(message || 'Failed to save user');
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Request failed';
      showError(errMsg);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>{userId ? 'Edit' : 'Add'} User</DialogTitle>
        <DialogContent>
          {loading ? (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '150px' }}>
              <CircularProgress />
            </Grid>
          ) : (
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
                <TextField
                  required
                  margin="dense"
                  name="email"
                  label="Email"
                  type="email"
                  value={formDetails?.email || ''}
                  disabled={!!userId}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              {userId && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={changePassword}
                        onChange={(e) => {
                          setChangePassword(e.target.checked);
                          if (!e.target.checked) {
                            setFormDetails((prev) => ({ ...prev, password: '' }));
                          }
                        }}
                        name="changePassword"
                        color="primary"
                      />
                    }
                    label="Update Password"
                  />
                </Grid>
              )}
              {(!userId || changePassword) && (
                <Grid item xs={6}>
                  <TextField
                    required={!userId || changePassword}
                    margin="dense"
                    name="password"
                    label={userId ? 'New Password' : 'Password'}
                    type={showPassword ? 'text' : 'password'}
                    value={formDetails?.password || ''}
                    fullWidth
                    variant="standard"
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="userTypeLabel">User Type</InputLabel>
                  <Select labelId="userTypeLabel" value={formDetails?.userType || ''} name="userType" onChange={onChange}>
                    <MenuItem value={''}>Select UserType</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'seller'}>Seller</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!formDetails?.isActive}
                      onChange={(e) => setFormDetails((prev) => ({ ...prev, isActive: e.target.checked }))}
                      color="success"
                    />
                  }
                  label={
                    <span>
                      Account Status:{' '}
                      <Chip
                        label={formDetails?.isActive ? 'Active' : 'Inactive'}
                        color={formDetails?.isActive ? 'success' : 'warning'}
                        size="small"
                        variant="outlined"
                        style={{ marginLeft: 4 }}
                      />
                    </span>
                  }
                  style={{ marginTop: 16 }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {userId ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditUserModal;
