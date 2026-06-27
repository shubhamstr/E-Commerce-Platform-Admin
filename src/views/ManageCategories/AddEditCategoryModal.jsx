import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { addCategory, getCategory, updateCategory, uploadCategoryImage } from '../../services/categoryService';
import { showSuccess, showError } from '../Utils/toast';

const AddEditCategoryModal = ({ handleClose, categoryId, open, onSuccess }) => {
  const [formDetails, setFormDetails] = useState({ name: '', description: '', imageUrl: '', isFeatured: false });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        const res = await getCategory(categoryId);
        const { success, data, message } = res.data;
        if (success) {
          setFormDetails({
            name: data?.name || '',
            description: data?.description || '',
            imageUrl: data?.imageUrl || '',
            isFeatured: data?.isFeatured || false
          });
        } else {
          showError(message || 'Failed to fetch category details');
        }
      } catch (error) {
        console.error(error);
        showError('Error loading category details');
      } finally {
        setLoading(false);
      }
    };

    if (open && categoryId) {
      fetchCategoryDetails();
    } else {
      setFormDetails({
        name: '',
        description: '',
        imageUrl: '',
        isFeatured: false
      });
    }
  }, [open, categoryId]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' || name === 'isFeatured' ? checked : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await uploadCategoryImage(formData);
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
    try {
      let res;
      if (categoryId) {
        res = await updateCategory(categoryId, formDetails);
      } else {
        res = await addCategory(formDetails);
      }
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || (categoryId ? 'Category updated successfully' : 'Category created successfully'));
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        showError(message || 'Failed to save category');
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
        <DialogTitle>{categoryId ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          {loading && !formDetails.name ? (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '150px' }}>
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
                  label="Category Name"
                  value={formDetails?.name || ''}
                  type="text"
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formDetails?.isFeatured || false}
                      onChange={onChange}
                      name="isFeatured"
                      color="primary"
                    />
                  }
                  label="Featured Category"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="category-image-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="category-image-upload">
                  <Button variant="outlined" component="span" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Category Image'}
                  </Button>
                </label>
                {formDetails?.imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={`${import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:5000'}${formDetails.imageUrl}`}
                      alt="Category Preview"
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
            {categoryId ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditCategoryModal;
