/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// material-ui
import { Card, Grid, Typography, Button, Chip, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAllEmailLogs, resendEmailLog } from '../../services/emailLogService';
import { showSuccess, showError } from '../Utils/toast';
import styles from './styles.module.css';

// ==============================|| MANAGE EMAIL LOGS ||============================== //

const ManageEmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resendingId, setResendingId] = useState(null);
  
  // Dialog state for previewing email HTML
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLog, setPreviewLog] = useState(null);

  const getLogs = async () => {
    setLoading(true);
    try {
      const res = await getAllEmailLogs();
      const { success, message, data, error } = res.data;
      if (success) {
        setLogs(data);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch email logs');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching email logs');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (rowData) => {
    setResendingId(rowData.id);
    try {
      const res = await resendEmailLog(rowData.id);
      const { success, message } = res.data;
      if (success) {
        showSuccess(message || 'Email resent successfully.');
        getLogs();
      } else {
        showError(message || 'Resend failed.');
        getLogs();
      }
    } catch (err) {
      console.error(err);
      showError('Failed to trigger email resend.');
    } finally {
      setResendingId(null);
    }
  };

  const openPreview = (log) => {
    setPreviewLog(log);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewLog(null);
  };

  const statusTemplate = (rowData) => {
    const isSuccess = rowData.status === 'success';
    return (
      <Chip
        label={rowData.status}
        color={isSuccess ? 'success' : 'error'}
        size="small"
        variant="outlined"
        icon={isSuccess ? <CheckCircleIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
      />
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  const actionBodyTemplate = (rowData) => {
    const isFailed = rowData.status === 'failed';
    const isResending = resendingId === rowData.id;
    return (
      <React.Fragment>
        <Tooltip title="Preview Content" arrow>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => openPreview(rowData)}
            style={{ minWidth: 'unset', marginRight: 6 }}
          >
            <VisibilityIcon fontSize="small" />
          </Button>
        </Tooltip>
        {isFailed && (
          <Tooltip title="Resend Email" arrow>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              disabled={isResending}
              onClick={() => handleResend(rowData)}
              style={{ minWidth: 'unset' }}
            >
              <ReplayIcon fontSize="small" className={isResending ? 'spin' : ''} />
            </Button>
          </Tooltip>
        )}
      </React.Fragment>
    );
  };

  const templateNameTemplate = (rowData) => {
    const names = {
      'forgot-password': 'Forgot Password',
      'order-place': 'Order Placed',
      'order-status': 'Order Status Update',
      'seller-approved': 'Seller Approval'
    };
    return names[rowData.templateName] || rowData.templateName;
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <>
      <BreadcrumbButton title="Email Logs">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Email Logs
        </Typography>
      </BreadcrumbButton>
      
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <DataTable
              value={logs}
              paginator
              rows={10}
              loading={loading}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
              sortField="createdAt"
              sortOrder={-1}
            >
              <Column field="toEmail" header="Recipient" sortable filter style={{ minWidth: '14rem' }} />
              <Column field="subject" header="Subject" sortable filter style={{ minWidth: '15rem' }} />
              <Column field="templateName" header="Template" body={templateNameTemplate} sortable filter style={{ minWidth: '10rem' }} />
              <Column field="status" header="Status" body={statusTemplate} sortable filter style={{ minWidth: '8rem' }} />
              <Column field="createdAt" header="Sent At" body={dateTemplate} sortable style={{ minWidth: '12rem' }} />
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
            </DataTable>
          </Card>
        </Grid>
      </Grid>

      {/* HTML Email Preview Modal */}
      <Dialog
        open={previewOpen}
        onClose={closePreview}
        maxWidth="md"
        fullWidth
        aria-labelledby="email-preview-title"
      >
        {previewLog && (
          <>
            <DialogTitle id="email-preview-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="h5" style={{ fontWeight: 600 }}>{previewLog.subject}</Typography>
                <Typography variant="caption" color="textSecondary">To: {previewLog.toEmail}</Typography>
              </div>
              <Chip label={previewLog.status} color={previewLog.status === 'success' ? 'success' : 'error'} size="small" />
            </DialogTitle>
            <DialogContent dividers style={{ padding: 0, height: '60vh' }}>
              {previewLog.errorMessage && (
                <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '10px 20px', fontSize: '13px', borderBottom: '1px solid #FFCDD2' }}>
                  <strong>Error details:</strong> {previewLog.errorMessage}
                </div>
              )}
              <iframe
                title="Email HTML Preview"
                srcDoc={previewLog.body}
                style={{ width: '100%', height: '100%', border: 'none', background: '#f5f5f5' }}
              />
            </DialogContent>
            <DialogActions>
              {previewLog.status === 'failed' && (
                <Button
                  onClick={() => {
                    handleResend(previewLog);
                    closePreview();
                  }}
                  color="secondary"
                  variant="contained"
                  startIcon={<ReplayIcon />}
                >
                  Resend
                </Button>
              )}
              <Button onClick={closePreview} color="primary" variant="outlined">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};

export default ManageEmailLogs;
