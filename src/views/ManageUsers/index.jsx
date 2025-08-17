/* eslint-disable react-hooks/exhaustive-deps */
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
import { FilterMatchMode } from 'primereact/api';

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
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 5,
    sortField: 'createdAt',
    sortOrder: -1,
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userType: { value: null, matchMode: FilterMatchMode.CONTAINS },
      isLogin: { value: null, matchMode: FilterMatchMode.EQUALS },
      createdAt: { value: null, matchMode: FilterMatchMode.EQUALS }
    }
  });

  const getUsers = async () => {
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
    const res = await getAllUsers(options);
    const { success, message, data, error } = res.data;
    if (success) {
      // showSuccess(message);
      setUsersList(data.records);
      setTotalRecords(data.total);
      setLoading(false);
    } else {
      console.error(error);
      showError(message);
      setLoading(false);
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
  }, [lazyParams]);

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
            <DataTable
              value={usersList}
              lazy
              paginator
              filters={lazyParams.filters}
              globalFilterFields={['email', 'userType', 'isLogin', 'createdAt']}
              filterDisplay="row"
              totalRecords={totalRecords}
              loading={loading}
              onPage={(e) => {
                console.log(e);
                setLazyParams({ ...lazyParams, first: e.first, rows: e.rows });
              }}
              first={lazyParams.first}
              rows={lazyParams.rows}
              onSort={(e) => {
                console.log(e);
                setLazyParams({ ...lazyParams, sortField: e.sortField, sortOrder: e.sortOrder });
              }}
              sortField={lazyParams.sortField}
              sortOrder={lazyParams.sortOrder}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
            >
              {/* <Column field="firstName" header="First Name" sortable filter></Column> */}
              {/* <Column field="lastName" header="Last Name" sortable filter></Column> */}
              {/* <Column field="mobileNumber" header="Mobile Number" sortable filter></Column> */}
              <Column field="email" header="Email" sortable filter></Column>
              <Column field="userType" header="User Type" sortable filter></Column>
              <Column field="isLogin" header="Is Login" body={loginTemplate} filter></Column>
              <Column field="createdAt" header="Created At" sortable body={dateTemplate} style={{ minWidth: '13rem' }} filter></Column>
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageUsers;
