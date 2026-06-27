import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

// project imports
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import { getUser, updateUser, updatePassword } from '../../services/authService';
import { setUser } from '../../store/actions';
import { showSuccess, showError } from '../Utils/toast';

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth.userData?.userId;

  const [loading, setLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Profile fields state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
  });

  // Password fields state
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getUser(userId);
        const { success, data, message } = res.data;
        if (success && data) {
          setProfileData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            mobileNumber: data.mobileNumber || ''
          });
        } else {
          showError(message || 'Failed to fetch profile details');
        }
      } catch (err) {
        console.error(err);
        showError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleProfileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      showError('Please fill out all required fields');
      return;
    }

    setProfileSaving(true);
    try {
      const res = await updateUser(userId, profileData);
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || 'Profile updated successfully');
        // Update Redux state
        dispatch(
          setUser({
            ...auth.userData,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email
          })
        );
      } else {
        showError(message || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error updating profile';
      showError(errMsg);
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.password || !passwordData.confirmPassword) {
      showError('Please fill out both password fields');
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await updatePassword(userId, { password: passwordData.password });
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || 'Password updated successfully');
        setPasswordData({
          password: '',
          confirmPassword: ''
        });
      } else {
        showError(message || 'Failed to update password');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error updating password';
      showError(errMsg);
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '300px' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Breadcrumb title="My Profile">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          My Profile
        </Typography>
      </Breadcrumb>

      <Grid container spacing={gridSpacing}>
        {/* Profile Details Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<PersonIcon color="primary" />}
              title={
                <Typography component="div" className="card-header" variant="h4">
                  Profile Information
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={handleProfileSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="firstName"
                      label="First Name"
                      fullWidth
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="email"
                      name="email"
                      label="Email Address"
                      fullWidth
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="mobileNumber"
                      label="Mobile Number"
                      fullWidth
                      value={profileData.mobileNumber}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={profileSaving}
                      sx={{ mt: 1 }}
                    >
                      {profileSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Change Password Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<LockIcon color="primary" />}
              title={
                <Typography component="div" className="card-header" variant="h4">
                  Change Password
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={handlePasswordSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      label="New Password"
                      fullWidth
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                              {showPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type={showConfirmPass ? 'text' : 'password'}
                      name="confirmPassword"
                      label="Confirm New Password"
                      fullWidth
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPass(!showConfirmPass)} edge="end">
                              {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={passwordSaving}
                      sx={{ mt: 1 }}
                    >
                      {passwordSaving ? 'Updating...' : 'Change Password'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
