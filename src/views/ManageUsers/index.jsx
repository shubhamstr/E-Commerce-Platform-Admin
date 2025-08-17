/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllUsers } from '../../services/authService';
import { showSuccess, showError } from '../Utils/toast';
import styles from './styles.module.css';

// ==============================|| MANAGE USERS ||============================== //

const ManageUsers = () => {
  const auth = useSelector((state) => state.auth);
  const [usersList, setUsersList] = useState([]);

  const getUsers = async () => {
    const res = await getAllUsers();
    const { success, message, data, error } = res.data;
    if (success) {
      showSuccess(message);
      setUsersList(data);
    } else {
      console.error(error);
      showError(message);
    }
  };

  const actionBodyTemplate = (rowData) => {
    let isDisabled = false;
    // console.log(rowData, auth);
    if (auth.userData.userId === rowData.id) {
      isDisabled = true;
    }
    return (
      <React.Fragment>
        <Button variant="contained" disabled={isDisabled} className={styles.rightMargin} onClick={() => editProduct(rowData)}>
          <EditIcon />
        </Button>
        <Button variant="contained" disabled={isDisabled} color="error" className="mr-2" onClick={() => confirmDeleteProduct(rowData)}>
          <DeleteIcon />
        </Button>
      </React.Fragment>
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  const loginTemplate = (rowData) => {
    return rowData.loginToken ? 'Yes' : 'No';
  };

  const AddAction = () => {
    return (
      <Button variant="contained" onClick={() => editProduct(rowData)}>
        <AddIcon />
      </Button>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <BreadcrumbButton title="Manage Users" action={<AddAction />}>
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Users
        </Typography>
      </BreadcrumbButton>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable value={usersList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="firstName" header="First Name" sortable></Column>
              <Column field="lastName" header="Last Name" sortable></Column>
              <Column field="mobileNumber" header="Mobile Number" sortable></Column>
              <Column field="email" header="Email" sortable></Column>
              <Column field="userType" header="User Type" sortable></Column>
              <Column field="isLogin" header="Is Login" body={loginTemplate}></Column>
              <Column field="createdAt" header="Created At" sortable body={dateTemplate} style={{ minWidth: '13rem' }}></Column>
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageUsers;
