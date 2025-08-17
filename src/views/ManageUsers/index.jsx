/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import { getAllUsers } from '../../services/authService';
import { showSuccess, showError } from '../Utils/toast';

// ==============================|| MANAGE USERS ||============================== //

const ManageUsers = () => {
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Breadcrumb title="Manage Users">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Users
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable value={usersList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="firstName" header="First Name" sortable></Column>
              <Column field="lastName" header="Last Name" sortable></Column>
              <Column field="mobileNumber" header="Mobile Number" sortable></Column>
              <Column field="email" header="Email" sortable></Column>
              <Column field="userType" header="User Type" sortable></Column>
              <Column field="isLogin" header="Is Login"></Column>
              <Column field="createdAt" header="Created At" sortable></Column>
            </DataTable>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageUsers;
