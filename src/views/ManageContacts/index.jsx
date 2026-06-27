/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// material-ui
import { Card, Grid, Typography, Button, Chip, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadIcon from '@mui/icons-material/Markunread';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllContacts, markContactRead, deleteContact } from '../../services/contactService';
import { showSuccess, showError } from '../Utils/toast';
import styles from './styles.module.css';

// ==============================|| MANAGE CONTACTS ||============================== //

const ManageContacts = () => {
  const [contactsList, setContactsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    sortField: 'createdAt',
    sortOrder: -1,
    filters: {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      subject: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createdAt: { value: null, matchMode: FilterMatchMode.EQUALS }
    }
  });

  const getContacts = async () => {
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
      const res = await getAllContacts(options);
      const { success, message, data, error } = res.data;
      if (success) {
        setContactsList(data.records);
        setTotalRecords(data.total);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch contacts');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (rowData) => {
    if (rowData.isRead) return;
    try {
      const res = await markContactRead(rowData.id);
      const { success, message } = res.data;
      if (success) {
        showSuccess('Marked as read.');
        getContacts();
      } else {
        showError(message || 'Failed to mark as read.');
      }
    } catch (err) {
      showError('Failed to mark contact as read.');
    }
  };

  const handleDeleteContact = async (rowData) => {
    if (window.confirm(`Are you sure you want to delete this contact from "${rowData.firstName} ${rowData.lastName || ''}".trim()?`)) {
      try {
        const res = await deleteContact(rowData.id);
        const { success, message } = res.data;
        if (success) {
          showSuccess(message || 'Contact deleted successfully.');
          getContacts();
        } else {
          showError(message || 'Failed to delete contact.');
        }
      } catch (err) {
        console.error(err);
        showError('Delete failed.');
      }
    }
  };

  const isReadTemplate = (rowData) => {
    return (
      <Chip
        label={rowData.isRead ? 'Read' : 'Unread'}
        color={rowData.isRead ? 'default' : 'primary'}
        size="small"
        variant={rowData.isRead ? 'outlined' : 'filled'}
        icon={rowData.isRead ? <MarkEmailReadIcon fontSize="small" /> : <MarkunreadIcon fontSize="small" />}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {!rowData.isRead && (
          <Tooltip title="Mark as Read" arrow>
            <Button
              variant="contained"
              color="info"
              size="small"
              className={styles.rightMargin}
              onClick={() => handleMarkRead(rowData)}
              style={{ minWidth: 'unset', marginRight: 6 }}
            >
              <MarkEmailReadIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Delete Contact" arrow>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteContact(rowData)}
            style={{ minWidth: 'unset' }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  const nameTemplate = (rowData) => {
    return `${rowData.firstName} ${rowData.lastName || ''}`.trim();
  };

  const messageTemplate = (rowData) => {
    if (!rowData.message) return <span style={{ color: '#aaa' }}>—</span>;
    return (
      <span title={rowData.message} style={{ cursor: 'help' }}>
        {rowData.message.length > 60 ? rowData.message.substring(0, 60) + '...' : rowData.message}
      </span>
    );
  };

  const rowClassName = (rowData) => {
    return { 'unread-row': !rowData.isRead };
  };

  useEffect(() => {
    getContacts();
  }, [lazyParams]);

  return (
    <>
      <BreadcrumbButton title="Manage Contacts">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Manage Contacts
        </Typography>
      </BreadcrumbButton>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable
              value={contactsList}
              lazy
              paginator
              filters={lazyParams.filters}
              globalFilterFields={['firstName', 'email', 'subject', 'createdAt']}
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
              rowClassName={rowClassName}
            >
              <Column header="Name" body={nameTemplate} sortField="firstName" sortable style={{ minWidth: '10rem' }} />
              <Column field="email" header="Email" sortable filter style={{ minWidth: '12rem' }} />
              <Column field="subject" header="Subject" sortable filter style={{ minWidth: '10rem' }} />
              <Column header="Message" body={messageTemplate} style={{ minWidth: '16rem' }} />
              <Column field="isRead" header="Status" body={isReadTemplate} style={{ minWidth: '8rem' }} />
              <Column field="createdAt" header="Received At" sortable body={dateTemplate} style={{ minWidth: '13rem' }} filter />
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '10rem' }} />
            </DataTable>
          </Card>
        </Grid>
      </Grid>
      <style>{`
        .unread-row td {
          font-weight: 600;
          background-color: #f0f7ff !important;
        }
      `}</style>
    </>
  );
};

export default ManageContacts;
