import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { addProduct, getProduct, updateProduct, uploadProductImage } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';
import { showSuccess, showError } from '../Utils/toast';

const AddEditProductModal = ({ handleClose, productId, open, onSuccess }) => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    sizes: '',
    colors: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories({ params: { limit: 1000 } });
        const { success, data } = res.data;
        if (success) {
          setCategories(data.records || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await getProduct(productId);
        const { success, data, message } = res.data;
        if (success) {
          setFormDetails({
            name: data?.name || '',
            description: data?.description || '',
            price: data?.price !== undefined && data?.price !== null ? String(data.price) : '',
            stock: data?.stock !== undefined && data?.stock !== null ? String(data.stock) : '',
            imageUrl: data?.imageUrl || '',
            categoryId: data?.categoryId || '',
            sizes: data?.sizes || '',
            colors: data?.colors || ''
          });
        } else {
          showError(message || 'Failed to fetch product details');
        }
      } catch (error) {
        console.error(error);
        showError('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    if (open && productId) {
      fetchProductDetails();
    } else {
      setFormDetails({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: '',
        sizes: '',
        colors: ''
      });
    }
  }, [open, productId]);

  const onChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await uploadProductImage(formData);
      const { success, imageUrl, message } = res.data;
      if (success) {
        setFormDetails((prev) => ({
          ...prev,
          imageUrl: imageUrl
        }));
        showSuccess('Image uploaded successfully');
      } else {
        showError(message || 'Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      showError('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...formDetails,
      price: parseFloat(formDetails.price),
      stock: parseInt(formDetails.stock, 10),
      categoryId: formDetails.categoryId ? parseInt(formDetails.categoryId, 10) : null,
      sizes: formDetails.sizes || null,
      colors: formDetails.colors || null
    };

    try {
      let res;
      if (productId) {
        res = await updateProduct(productId, payload);
      } else {
        res = await addProduct(payload);
      }
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || (productId ? 'Product updated successfully' : 'Product created successfully'));
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        showError(message || 'Failed to save product');
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Request failed';
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>{productId ? 'Edit' : 'Add'} Product</DialogTitle>
        <DialogContent>
          {loading && !formDetails.name ? (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
              <CircularProgress />
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="name"
                  label="Product Name"
                  value={formDetails?.name || ''}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  margin="dense"
                  name="categoryId"
                  label="Category"
                  value={formDetails?.categoryId || ''}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  name="price"
                  label="Price ($)"
                  value={formDetails?.price || ''}
                  type="number"
                  inputProps={{ step: '0.01', min: '0' }}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  name="stock"
                  label="Stock Quantity"
                  value={formDetails?.stock || ''}
                  type="number"
                  inputProps={{ min: '0', step: '1' }}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  value={formDetails?.description || ''}
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="sizes"
                  label="Sizes (comma-separated, e.g. S,M,L)"
                  value={formDetails?.sizes || ''}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="colors"
                  label="Colors (comma-separated, e.g. Red,Blue)"
                  value={formDetails?.colors || ''}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="product-image-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="product-image-upload">
                  <Button variant="outlined" component="span" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Product Image'}
                  </Button>
                </label>
                {formDetails?.imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={`${import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:5000'}${formDetails.imageUrl}`}
                      alt="Product Preview"
                      style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '4px' }}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {productId ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditProductModal;
