/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// material-ui
import { Card, Grid, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllCoupons, deleteCoupon } from '../../services/couponService';
import { showSuccess, showError } from '../Utils/toast';
import AddEditCouponModal from './AddEditCouponModal';
import { CURRENCY_SYMBOL } from '../Utils/currency';

const ManageCoupons = () => {
  const [couponsList, setCouponsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [couponId, setCouponId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setCouponId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCoupon = (coupon) => {
    setCouponId(coupon.id);
    setOpen(true);
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await getAllCoupons();
      const { success, message, data, error } = res.data;
      if (success) {
        setCouponsList(data);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch coupons');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (rowData) => {
    if (window.confirm(`Are you sure you want to delete coupon "${rowData.code}"?`)) {
      try {
        const res = await deleteCoupon(rowData.id);
        const { success, message } = res.data;
        if (success) {
          showSuccess(message || 'Coupon deleted successfully');
          fetchCoupons();
        } else {
          showError(message || 'Failed to delete coupon');
        }
      } catch (error) {
        console.error(error);
        const errMsg = error.response?.data?.message || 'Delete failed';
        showError(errMsg);
      }
    }
  };

  const typeTemplate = (rowData) => {
    return rowData.discountType === 'percentage' ? 'Percentage (%)' : `Fixed Amount (${CURRENCY_SYMBOL})`;
  };

  const valueTemplate = (rowData) => {
    return rowData.discountType === 'percentage' ? `${rowData.discountValue}%` : `${CURRENCY_SYMBOL}${rowData.discountValue}`;
  };

  const limitTemplate = (rowData) => {
    if (rowData.usageLimit === null) return 'Unlimited';
    return `${rowData.usedCount} / ${rowData.usageLimit}`;
  };

  const activeTemplate = (rowData) => {
    return rowData.isActive ? (
      <span style={{ color: 'green', fontWeight: 'bold' }}>Active</span>
    ) : (
      <span style={{ color: 'red' }}>Inactive</span>
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY');
  };

  const expiryTemplate = (rowData) => {
    if (!rowData.expiryDate) return 'No Expiry';
    return moment(rowData.expiryDate).format('DD MMM YYYY');
  };

  const creatorTemplate = (rowData) => {
    if (!rowData.creator) return 'System';
    return `${rowData.creator.firstName} ${rowData.creator.lastName}`;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => editCoupon(rowData)}>
          <EditIcon />
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDeleteCoupon(rowData)}>
          <DeleteIcon />
        </Button>
      </React.Fragment>
    );
  };

  const AddAction = () => {
    return (
      <Button variant="contained" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
    );
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>
      <BreadcrumbButton title="Manage Coupons" action={<AddAction />}>
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Coupons
        </Typography>
      </BreadcrumbButton>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <DataTable
              value={couponsList}
              loading={loading}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              tableStyle={{ minWidth: '50rem' }}
            >
              <Column field="code" header="Coupon Code" sortable></Column>
              <Column header="Type" body={typeTemplate} sortable></Column>
              <Column header="Value" body={valueTemplate} sortable></Column>
              <Column field="minOrderAmount" header={`Min Order (${CURRENCY_SYMBOL})`} sortable></Column>
              <Column header="Usage Limit" body={limitTemplate} sortable></Column>
              <Column header="Expiry Date" body={expiryTemplate} sortable></Column>
              <Column header="Status" body={activeTemplate} sortable></Column>
              <Column header="Created By" body={creatorTemplate} sortable></Column>
              <Column field="createdAt" header="Created At" body={dateTemplate} sortable></Column>
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
          </Card>
        </Grid>
      </Grid>

      <AddEditCouponModal
        open={open}
        couponId={couponId}
        handleClose={handleClose}
        onSuccess={fetchCoupons}
      />
    </>
  );
};

export default ManageCoupons;
