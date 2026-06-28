import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './AuthLogin';
import branding from 'branding';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const theme = useTheme();
  const location = useLocation();
  const isSellerLogin = location.pathname.includes('seller-login');

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
            '& .MuiCardContent-root': {
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%'
            },
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
                      {isSellerLogin ? 'Seller Sign in' : 'Admin Sign in'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/" style={{ textDecoration: 'none' }}>
                      <Typography
                        variant="h3"
                        sx={branding.gradientTextSx}
                      >
                        {branding.name}
                      </Typography>
                    </RouterLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: theme.spacing(1) }}>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    component={RouterLink}
                    to={isSellerLogin ? '/login' : '/seller-login'}
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {isSellerLogin ? 'Are you an Admin? Sign in here' : 'Are you a Seller? Sign in here'}
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

export default Login;
