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
import { FilterMatchMode } from 'primereact/api';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllProducts, deleteProduct } from '../../services/productService';
import { showSuccess, showError } from '../Utils/toast';
import styles from './styles.module.css';
import AddEditProductModal from './AddEditProductModal';

const ManageProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 5,
    sortField: 'createdAt',
    sortOrder: -1,
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      description: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
  });
  const [productId, setProductId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setProductId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProduct = (product) => {
    setProductId(product.id);
    setOpen(true);
  };

  const getProducts = async () => {
    setLoading(true);
    const options = {
      params: {
        page: lazyParams.first / lazyParams.rows + 1,
        limit: lazyParams.rows,
        sortField: lazyParams.sortField,
        sortOrder: lazyParams.sortOrder,
        filters: JSON.stringify(lazyParams.filters)
      }
    };
    try {
      const res = await getAllProducts(options);
      const { success, message, data, error } = res.data;
      if (success) {
        setProductsList(data.records);
        setTotalRecords(data.total);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (rowData) => {
    if (window.confirm(`Are you sure you want to delete product "${rowData.name}"?`)) {
      try {
        const res = await deleteProduct(rowData.id);
        const { success, message } = res.data;
        if (success) {
          showSuccess(message || 'Product deleted successfully');
          getProducts();
        } else {
          showError(message || 'Failed to delete product');
        }
      } catch (error) {
        console.error(error);
        const errMsg = error.response?.data?.message || 'Delete failed';
        showError(errMsg);
      }
    }
  };

  const imageTemplate = (rowData) => {
    if (rowData.imageUrl) {
      return (
        <img
          src={`${import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:5000'}${rowData.imageUrl}`}
          alt={rowData.name}
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />
      );
    }
    return <span>No Image</span>;
  };

  const categoryTemplate = (rowData) => {
    return rowData.category?.name || <span style={{ color: '#aaa', fontStyle: 'italic' }}>None</span>;
  };

  const priceTemplate = (rowData) => {
    return `$${Number(rowData.price).toFixed(2)}`;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button variant="contained" className={styles.rightMargin} onClick={() => editProduct(rowData)}>
          <EditIcon />
        </Button>
        <Button variant="contained" color="error" className="mr-2" onClick={() => handleDeleteProduct(rowData)}>
          <DeleteIcon />
        </Button>
      </React.Fragment>
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  const AddAction = () => {
    return (
      <Button variant="contained" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
    );
  };

  useEffect(() => {
    getProducts();
  }, [lazyParams]);

  return (
    <>
      <BreadcrumbButton title="Manage Products" action={<AddAction />}>
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Products
        </Typography>
      </BreadcrumbButton>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable
              value={productsList}
              lazy
              paginator
              filters={lazyParams.filters}
              globalFilterFields={['name', 'description', 'price', 'stock']}
              filterDisplay="row"
              totalRecords={totalRecords}
              loading={loading}
              onPage={(e) => {
                setLazyParams({ ...lazyParams, first: e.first, rows: e.rows });
              }}
              first={lazyParams.first}
              rows={lazyParams.rows}
              onSort={(e) => {
                setLazyParams({ ...lazyParams, sortField: e.sortField, sortOrder: e.sortOrder });
              }}
              sortField={lazyParams.sortField}
              sortOrder={lazyParams.sortOrder}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
            >
              <Column header="Image" body={imageTemplate} style={{ width: '100px' }}></Column>
              <Column field="name" header="Name" sortable filter></Column>
              <Column field="description" header="Description" sortable filter></Column>
              <Column header="Category" body={categoryTemplate}></Column>
              <Column field="price" header="Price" sortable body={priceTemplate}></Column>
              <Column field="stock" header="Stock" sortable></Column>
              <Column field="createdAt" header="Created At" sortable body={dateTemplate} style={{ minWidth: '13rem' }}></Column>
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
          </Card>
        </Grid>
      </Grid>
      <AddEditProductModal handleClose={handleClose} productId={productId} open={open} onSuccess={getProducts} />
    </>
  );
};

export default ManageProducts;
