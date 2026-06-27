/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// material-ui
import {
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Rating
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { showSuccess, showError } from '../Utils/toast';

// ==============================|| MANAGE ORDERS ||============================== //

const ManageOrders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      const { success, message, data, error } = res.data;
      if (success) {
        setOrdersList(data || []);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || 'Order status updated successfully');
        fetchOrders();
      } else {
        showError(message || 'Failed to update order status');
      }
    } catch (err) {
      console.error(err);
      showError('Error updating order status');
    }
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
    setDetailsOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderIdTemplate = (rowData) => {
    return <span style={{ fontWeight: 'bold' }}>#{rowData.id}</span>;
  };

  const customerTemplate = (rowData) => {
    if (!rowData.user) return <span>Unknown User</span>;
    return (
      <div>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          {rowData.user.firstName} {rowData.user.lastName}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block">
          {rowData.user.email}
        </Typography>
        {rowData.user.mobileNumber && (
          <Typography variant="caption" color="textSecondary" display="block">
            {rowData.user.mobileNumber}
          </Typography>
        )}
      </div>
    );
  };

  const addressTemplate = (rowData) => {
    if (!rowData.address) return <span style={{ color: '#aaa' }}>No Address</span>;
    const { addressLine1, addressLine2, city, state, postalCode, country } = rowData.address;
    return (
      <Typography variant="body2" style={{ whiteSpace: 'normal', maxWidth: '200px' }}>
        {addressLine1}
        {addressLine2 ? `, ${addressLine2}` : ''}
        <br />
        {city}, {state} - {postalCode}
        {country ? `, ${country}` : ''}
      </Typography>
    );
  };

  const amountTemplate = (rowData) => {
    return <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>${parseFloat(rowData.totalAmount).toFixed(2)}</span>;
  };

  const statusTemplate = (rowData) => {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error',
      'cancelled by customer': 'error',
      'cancelled by seller': 'error',
      'cancelled by admin': 'error'
    };

    return (
      <FormControl size="small" style={{ minWidth: 120 }}>
        <Select
          value={rowData.status}
          onChange={(e) => handleStatusChange(rowData.id, e.target.value)}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
            bgcolor: 'action.hover',
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          <MenuItem value="pending">
            <Chip label="Pending" color="warning" size="small" style={{ width: '100%' }} />
          </MenuItem>
          <MenuItem value="processing">
            <Chip label="Processing" color="info" size="small" style={{ width: '100%' }} />
          </MenuItem>
          <MenuItem value="shipped">
            <Chip label="Shipped" color="primary" size="small" style={{ width: '100%' }} />
          </MenuItem>
          <MenuItem value="delivered">
            <Chip label="Delivered" color="success" size="small" style={{ width: '100%' }} />
          </MenuItem>
          <MenuItem value="cancelled">
            <Chip label="Cancelled" color="error" size="small" style={{ width: '100%' }} />
          </MenuItem>
          {rowData.status === 'cancelled by customer' && (
            <MenuItem value="cancelled by customer">
              <Chip label="Cancelled by Customer" color="error" size="small" style={{ width: '100%' }} />
            </MenuItem>
          )}
          {rowData.status === 'cancelled by seller' && (
            <MenuItem value="cancelled by seller">
              <Chip label="Cancelled by Seller" color="error" size="small" style={{ width: '100%' }} />
            </MenuItem>
          )}
          {rowData.status === 'cancelled by admin' && (
            <MenuItem value="cancelled by admin">
              <Chip label="Cancelled by Admin" color="error" size="small" style={{ width: '100%' }} />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <Tooltip title="View Order Items" arrow>
        <Button variant="contained" color="secondary" size="small" onClick={() => openDetails(rowData)} style={{ minWidth: 'unset' }}>
          <VisibilityIcon fontSize="small" />
        </Button>
      </Tooltip>
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  return (
    <>
      <BreadcrumbButton title="Manage Orders">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Orders
        </Typography>
      </BreadcrumbButton>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable
              value={ordersList}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              loading={loading}
              tableStyle={{ minWidth: '50rem' }}
              sortField="createdAt"
              sortOrder={-1}
            >
              <Column field="id" header="Order ID" body={orderIdTemplate} sortable style={{ width: '8rem' }} />
              <Column header="Customer" body={customerTemplate} style={{ minWidth: '12rem' }} />
              <Column header="Shipping Address" body={addressTemplate} style={{ minWidth: '15rem' }} />
              <Column field="totalAmount" header="Total Amount" body={amountTemplate} sortable style={{ width: '10rem' }} />
              <Column field="status" header="Status" body={statusTemplate} sortable style={{ width: '12rem' }} />
              <Column field="createdAt" header="Placed At" body={dateTemplate} sortable style={{ minWidth: '12rem' }} />
              <Column header="Actions" body={actionTemplate} style={{ width: '8rem', textAlign: 'center' }} />
            </DataTable>
          </Card>
        </Grid>
      </Grid>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={closeDetails} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <ShoppingBagIcon color="secondary" />
            <Typography variant="h4">Order Details #{selectedOrder?.id}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Items Summary
              </Typography>
              <List disablePadding>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <React.Fragment key={item.id || index}>
                      <ListItem sx={{ py: 1.5, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                          <ListItemText
                            primary={item.product?.name || 'Unknown Product'}
                            secondary={`Quantity: ${item.quantity} | Unit Price: $${parseFloat(item.price).toFixed(2)}`}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                        {(() => {
                          const itemReview = selectedOrder.reviews?.find((r) => r.productId === item.productId);
                          if (itemReview) {
                            return (
                              <Box sx={{ mt: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1, width: '100%' }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Rating value={itemReview.rating} readOnly size="small" />
                                  <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                    Product Review
                                  </Typography>
                                </Box>
                                {itemReview.comment && (
                                  <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                    "{itemReview.comment}"
                                  </Typography>
                                )}
                              </Box>
                            );
                          }
                          return null;
                        })()}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No items in this order.
                  </Typography>
                )}
                
                {(() => {
                  const orderReview = selectedOrder.reviews?.find((r) => r.productId === null);
                  if (orderReview) {
                    return (
                      <Box sx={{ my: 2, p: 1.5, bgcolor: '#f0f4f8', borderLeft: '4px solid #1e88e5', borderRadius: '0 4px 4px 0', width: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1e88e5' }}>
                          Customer Order Feedback
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Rating value={orderReview.rating} readOnly size="small" />
                        </Box>
                        {orderReview.comment && (
                          <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic', color: 'text.secondary' }}>
                            "{orderReview.comment}"
                          </Typography>
                        )}
                      </Box>
                    );
                  }
                  return null;
                })()}

                <ListItem sx={{ py: 1.5, px: 0 }}>
                  <ListItemText primary="Total" primaryTypographyProps={{ variant: 'h5' }} />
                  <Typography variant="h5" color="secondary">
                    ${parseFloat(selectedOrder.totalAmount).toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageOrders;
