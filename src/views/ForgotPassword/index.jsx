import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid, Box, Button, TextField, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { forgotPassword } from '../../services/authService';
import { showSuccess, showError } from '../Utils/toast';

const ForgotPassword = () => {
  const theme = useTheme();

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
                      Forgot Password
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
                  Enter your email address below and we'll send you a link to reset your password.
                </Typography>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const res = await forgotPassword({ email: values.email });
                      const { success, message } = res.data;
                      if (success) {
                        showSuccess(message || 'Password reset link sent to your email.');
                        resetForm();
                      } else {
                        showError(message || 'Failed to send password reset link.');
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
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />

                      <Box mt={3}>
                        <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                          Send Reset Link
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

export default ForgotPassword;
