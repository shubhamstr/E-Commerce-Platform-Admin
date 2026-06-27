import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress, Box } from '@mui/material';

//project import
import SalesLineCard from 'views/Dashboard/card/SalesLineCard';
import SalesLineCardData from 'views/Dashboard/card/sale-chart-1';
import RevenuChartCard from 'views/Dashboard/card/RevenuChartCard';
import RevenuChartCardData from 'views/Dashboard/card/revenu-chart';
import ReportCard from './ReportCard';

import { gridSpacing } from 'config.js';
import api from 'views/Utils/api';

// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';

import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
import StorefrontTwoTone from '@mui/icons-material/StorefrontTwoTone';
import ShoppingBagTwoTone from '@mui/icons-material/ShoppingBagTwoTone';
import RateReviewTwoTone from '@mui/icons-material/RateReviewTwoTone';
import CategoryTwoTone from '@mui/icons-material/CategoryTwoTone';
import ContactMailTwoTone from '@mui/icons-material/ContactMailTwoTone';
import VpnKeyTwoTone from '@mui/icons-material/VpnKeyTwoTone';

// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get('/api/user/dashboard-stats')
      .then(response => {
        if (response.data && response.data.success) {
          setStats(response.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch dashboard stats error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ width: '100%', mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Failed to load dashboard data.
        </Typography>
      </Box>
    );
  }

  const { userType } = stats;
  const isSeller = userType === 'seller';

  const totalOrders = stats.totalOrders || 0;
  const getPercentage = (count) => {
    if (totalOrders === 0) return 0;
    return Math.round((count / totalOrders) * 100);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* Earnings card (Admin only) */}
          {!isSeller && (
            <Grid item lg={3} sm={6} xs={12}>
              <ReportCard
                primary={`$${stats.totalEarnings || 0}`}
                secondary="All Earnings"
                color={theme.palette.warning.main}
                footerData="Total revenue generated"
                iconPrimary={MonetizationOnTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          )}

          {/* Customers card */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${stats.totalCustomers || 0}`}
              secondary="Total Customers"
              color={theme.palette.primary.main}
              footerData="Registered customers"
              iconPrimary={PeopleAltTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          {/* Sellers card */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${stats.totalSellers || 0}`}
              secondary="Total Sellers"
              color={theme.palette.success.main}
              footerData="Registered sellers"
              iconPrimary={StorefrontTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          {/* Orders card */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${stats.totalOrders || 0}`}
              secondary="Total Orders"
              color={theme.palette.primary.dark}
              footerData="Orders placed"
              iconPrimary={ShoppingBagTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          {/* Products card */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${stats.totalProducts || 0}`}
              secondary="Total Products"
              color={theme.palette.secondary.main}
              footerData="Active products in catalog"
              iconPrimary={StorefrontTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          {/* Categories card (Admin only) */}
          {!isSeller && (
            <Grid item lg={3} sm={6} xs={12}>
              <ReportCard
                primary={`${stats.totalCategories || 0}`}
                secondary="Total Categories"
                color={theme.palette.error.main}
                footerData="Product categories"
                iconPrimary={CategoryTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          )}

          {/* Reviews card */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${stats.totalReviews || 0}`}
              secondary="Total Reviews"
              color={theme.palette.warning.dark}
              footerData="Customer reviews"
              iconPrimary={RateReviewTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          {/* Contacts card (Admin only) */}
          {!isSeller && (
            <Grid item lg={3} sm={6} xs={12}>
              <ReportCard
                primary={`${stats.totalContacts || 0}`}
                secondary="Total Contacts"
                color={theme.palette.secondary.dark}
                footerData="Contact submissions"
                iconPrimary={ContactMailTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          )}

          {/* Active Logins card (Admin only) */}
          {!isSeller && (
            <Grid item lg={3} sm={6} xs={12}>
              <ReportCard
                primary={`${stats.totalActiveLogins || 0}`}
                secondary="Active Logins"
                color={theme.palette.success.dark}
                footerData="Currently logged in sessions"
                iconPrimary={VpnKeyTwoTone}
                iconFooter={TrendingUpIcon}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={SalesLineCardData}
                      title="Sales Per Day"
                      percentage="3%"
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: !isSeller ? `$${stats.totalEarnings || 0}` : `${stats.totalOrders || 0}`,
                          label: !isSeller ? 'Total Revenue' : 'Total Orders'
                        },
                        {
                          value: `${stats.totalProducts || 0}`,
                          label: 'Total Products'
                        }
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={RevenuChartCardData} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Orders by Status
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  {[
                    { label: 'Pending', key: 'pending', color: 'primary' },
                    { label: 'Processing', key: 'processing', color: 'secondary' },
                    { label: 'Shipped', key: 'shipped', color: 'primary' },
                    { label: 'Delivered', key: 'delivered', color: 'success' },
                    { label: 'Cancelled by Customer', key: 'cancelled by customer', color: 'error' },
                    { label: 'Cancelled by Seller', key: 'cancelled by seller', color: 'error' },
                    { label: 'Cancelled by Admin', key: 'cancelled by admin', color: 'error' }
                  ].map((statusItem) => {
                    const count = stats.statusCounts?.[statusItem.key] || 0;
                    const pct = getPercentage(count);
                    return (
                      <Grid item xs={12} key={statusItem.key}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="body2">{statusItem.label} ({count})</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" align="right">
                              {pct}%
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <LinearProgress variant="determinate" aria-label={statusItem.label} value={pct} color={statusItem.color} />
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
