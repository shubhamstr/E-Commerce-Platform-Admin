import React from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { resetPassword } from '../../services/authService';
import { showSuccess, showError } from '../Utils/toast';

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: theme.palette.common.black, height: '100%', minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card
          sx={{
            overflow: 'visible',
            display: 'flex',
            position: 'relative',
            maxWidth: '475px',
            margin: '24px auto'
          }}
        >
          <CardContent sx={{ p: theme.spacing(5, 4, 3, 4) }}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Reset Password
                    </Typography>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/" style={{ textDecoration: 'none' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ShopNest
                      </Typography>
                    </RouterLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Enter your new password below.
                </Typography>
                <Formik
                  initialValues={{ password: '', confirmPassword: '' }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string().max(255).required('New password is required'),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                      .required('Confirm password is required')
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    if (!email || !token) {
                      showError('Invalid reset password link. Missing email or token.');
                      setSubmitting(false);
                      return;
                    }

                    try {
                      const res = await resetPassword({
                        email,
                        token,
                        password: values.password
                      });
                      const { success, message } = res.data;
                      if (success) {
                        showSuccess(message || 'Password reset successfully! Redirecting to login...');
                        setTimeout(() => {
                          navigate('/login');
                        }, 2000);
                      } else {
                        showError(message || 'Failed to reset password.');
                      }
                    } catch (error) {
                      console.error(error);
                      showError(error.response?.data?.message || 'An error occurred. Please try again.');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mt: 1, mb: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="New Password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.password && errors.password && (
                          <FormHelperText error id="standard-weight-helper-text-password">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ mt: 2, mb: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Confirm Password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                size="large"
                              >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText error id="standard-weight-helper-text-confirm-password">
                            {errors.confirmPassword}
                          </FormHelperText>
                        )}
                      </FormControl>


                      <Box mt={3}>
                        <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                          Reset Password
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: theme.spacing(2) }}>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    component={RouterLink}
                    to="/login"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    Back to Login
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
