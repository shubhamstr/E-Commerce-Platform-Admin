import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { addCategory, getCategory, updateCategory } from '../../services/categoryService';
import { showSuccess, showError } from '../Utils/toast';

const AddEditCategoryModal = ({ handleClose, categoryId, open, onSuccess }) => {
  const [formDetails, setFormDetails] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        const res = await getCategory(categoryId);
        const { success, data, message } = res.data;
        if (success) {
          setFormDetails({
            name: data?.name || '',
            description: data?.description || ''
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
        description: ''
      });
    }
  }, [open, categoryId]);

  const onChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
