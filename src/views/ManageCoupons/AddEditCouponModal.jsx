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
import MenuItem from '@mui/material/MenuItem';
import { addCoupon, getCoupon, updateCoupon } from '../../services/couponService';
import { showSuccess, showError } from '../Utils/toast';

const AddEditCouponModal = ({ handleClose, couponId, open, onSuccess }) => {
  const [formDetails, setFormDetails] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    maxDiscountAmount: '',
    minOrderAmount: '',
    usageLimit: '',
    expiryDate: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCouponDetails = async () => {
      setLoading(true);
      try {
        const res = await getCoupon(couponId);
        const { success, data, message } = res.data;
        if (success) {
          setFormDetails({
            code: data?.code || '',
            discountType: data?.discountType || 'percentage',
            discountValue: data?.discountValue || '',
            maxDiscountAmount: data?.maxDiscountAmount || '',
            minOrderAmount: data?.minOrderAmount || '',
            usageLimit: data?.usageLimit || '',
            expiryDate: data?.expiryDate ? new Date(data.expiryDate).toISOString().substring(0, 10) : '',
            isActive: data?.isActive !== undefined ? data.isActive : true
          });
        } else {
          showError(message || 'Failed to fetch coupon details');
        }
      } catch (error) {
        console.error(error);
        showError('Error loading coupon details');
      } finally {
        setLoading(false);
      }
    };

    if (open && couponId) {
      fetchCouponDetails();
    } else {
      setFormDetails({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        maxDiscountAmount: '',
        minOrderAmount: '',
        usageLimit: '',
        expiryDate: '',
        isActive: true
      });
    }
  }, [open, couponId]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let res;
      const dataToSubmit = {
        ...formDetails,
        discountValue: parseFloat(formDetails.discountValue),
        maxDiscountAmount: formDetails.maxDiscountAmount ? parseFloat(formDetails.maxDiscountAmount) : null,
        minOrderAmount: formDetails.minOrderAmount ? parseFloat(formDetails.minOrderAmount) : null,
        usageLimit: formDetails.usageLimit ? parseInt(formDetails.usageLimit, 10) : null,
        expiryDate: formDetails.expiryDate || null
      };

      if (couponId) {
        res = await updateCoupon(couponId, dataToSubmit);
      } else {
        res = await addCoupon(dataToSubmit);
      }
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || (couponId ? 'Coupon updated successfully' : 'Coupon created successfully'));
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        showError(message || 'Failed to save coupon');
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
      <DialogTitle>{couponId ? 'Edit' : 'Add'} Coupon</DialogTitle>
      <DialogContent>
        {loading && !formDetails.code ? (
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                name="code"
                label="Coupon Code (e.g. SAVE50)"
                value={formDetails.code}
                onChange={onChange}
                type="text"
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                required
                name="discountType"
                label="Discount Type"
                value={formDetails.discountType}
                onChange={onChange}
                fullWidth
              >
                <MenuItem value="percentage">Percentage (%)</MenuItem>
                <MenuItem value="fixed">Fixed Amount (₹)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="discountValue"
                label={formDetails.discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                value={formDetails.discountValue}
                onChange={onChange}
                type="number"
                inputProps={{ min: 0, step: 'any' }}
                fullWidth
              />
            </Grid>
            {formDetails.discountType === 'percentage' && (
              <Grid item xs={12}>
                <TextField
                  name="maxDiscountAmount"
                  label="Max Discount Amount (₹)"
                  value={formDetails.maxDiscountAmount}
                  onChange={onChange}
                  type="number"
                  inputProps={{ min: 0, step: 'any' }}
                  fullWidth
                  helperText="Leave empty for no limit"
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <TextField
                name="minOrderAmount"
                label="Min Order Amount (₹)"
                value={formDetails.minOrderAmount}
                onChange={onChange}
                type="number"
                inputProps={{ min: 0, step: 'any' }}
                fullWidth
                helperText="Min subtotal required"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="usageLimit"
                label="Usage Limit"
                value={formDetails.usageLimit}
                onChange={onChange}
                type="number"
                inputProps={{ min: 1 }}
                fullWidth
                helperText="Total times coupon can be used"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="expiryDate"
                label="Expiry Date"
                value={formDetails.expiryDate}
                onChange={onChange}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    checked={formDetails.isActive}
                    onChange={onChange}
                  />
                }
                label="Is Active"
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCouponModal;
