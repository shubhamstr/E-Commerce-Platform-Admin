import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Slider,
  TextField,
  Box,
  CircularProgress,
  LinearProgress,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { bulkImportProducts } from '../../services/productService';
import { showSuccess, showError } from '../Utils/toast';

const BulkImport = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSliderChange = (event, newValue) => {
    setCount(newValue);
  };

  const handleInputChange = (event) => {
    const val = event.target.value === '' ? '' : Number(event.target.value);
    if (typeof val === 'number' && val >= 1) {
      setCount(Math.min(val, 2000));
    }
  };

  const handleBlur = () => {
    if (count < 1) {
      setCount(1);
    } else if (count > 2000) {
      setCount(2000);
    }
  };

  const handleBulkImport = async () => {
    if (loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await bulkImportProducts({ count });
      const { success, message, data } = res.data;
      if (success) {
        showSuccess(message || `Successfully imported ${count} products.`);
        setResult(data);
      } else {
        showError(message || 'Failed to import products');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error during bulk import';
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const setPresetCount = (preset) => {
    setCount(preset);
  };

  return (
    <>
      <BreadcrumbButton title="Bulk Import Products">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Bulk Import Products
        </Typography>
      </BreadcrumbButton>

      <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                color: '#fff',
                padding: 4,
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 64, mb: 1, opacity: 0.9 }} />
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                Bulk Database Seeder
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
                Instantly populate your catalog with dummy products, categories, and high-quality images from the DummyJSON API.
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {!result && !loading && (
                <Box>
                  <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                    Configure Seeder Quantity
                  </Typography>

                  <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
                    <Grid item xs>
                      <Slider
                        value={typeof count === 'number' ? count : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={1}
                        max={1000}
                        step={10}
                        sx={{
                          color: '#2196F3',
                          height: 8,
                          '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            backgroundColor: '#fff',
                            border: '3px solid currentColor',
                            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                              boxShadow: 'inherit',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        value={count}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 10,
                          min: 1,
                          max: 2000,
                          type: 'number',
                          'aria-labelledby': 'input-slider'
                        }}
                        sx={{ width: 100 }}
                      />
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
                    {[50, 100, 250, 500, 1000].map((preset) => (
                      <Button
                        key={preset}
                        variant={count === preset ? 'contained' : 'outlined'}
                        color="primary"
                        size="small"
                        onClick={() => setPresetCount(preset)}
                        sx={{ borderRadius: 20, px: 2 }}
                      >
                        {preset} Items
                      </Button>
                    ))}
                  </Stack>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={loading}
                    onClick={handleBulkImport}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                      }
                    }}
                  >
                    Start Seeding DB
                  </Button>
                </Box>
              )}

              {loading && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress size={60} thickness={4} sx={{ color: '#2196F3', mb: 3 }} />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                    Seeding Database...
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Fetching products from DummyJSON and generating local categories and image records. This may take a few seconds depending on the count ({count} items).
                  </Typography>
                  <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
                </Box>
              )}

              {result && (
                <Box>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 72, mb: 1 }} />
                    <Typography variant="h3" color="success.main" sx={{ fontWeight: 600 }}>
                      Import Completed!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      Successfully seeded your database with new dummy data.
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2.5, textAlign: 'center', borderRadius: 2, borderColor: '#e0e0e0' }}>
                        <ShoppingBagIcon sx={{ color: '#2196F3', fontSize: 32, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {result.importedCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Products Seeded
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2.5, textAlign: 'center', borderRadius: 2, borderColor: '#e0e0e0' }}>
                        <CategoryIcon sx={{ color: '#4CAF50', fontSize: 32, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {result.categoriesCreated?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Categories Configured
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={() => navigate('/manage-products')}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                    >
                      View Products List
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setResult(null)}
                      sx={{ py: 1.2, borderRadius: 2 }}
                    >
                      Import More
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BulkImport;
