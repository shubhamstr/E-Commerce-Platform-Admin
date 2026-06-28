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
  Box,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

// icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getAuditLogs } from '../../services/systemService';
import { showSuccess, showError } from '../Utils/toast';

// ==============================|| MANAGE AUDIT LOGS ||============================== //

const ManageAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering state
  const [actionFilter, setActionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [userQuery, setUserQuery] = useState('');

  // Dialog state for previewing log details
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLog, setPreviewLog] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (actionFilter) params.action = actionFilter;
      if (statusFilter) params.status = statusFilter;
      if (userQuery) params.userQuery = userQuery;

      const res = await getAuditLogs(params);
      const { success, data, message, error } = res.data;
      if (success) {
        setLogs(data);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch audit logs');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  const handleResetFilters = () => {
    setActionFilter('');
    setStatusFilter('');
    setUserQuery('');
    // Delay slightly or use direct values to ensure state reflects
    setTimeout(() => {
      fetchLogs();
    }, 100);
    showSuccess('Filters reset.');
  };

  const openPreview = (log) => {
    setPreviewLog(log);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewLog(null);
  };

  // Render Chip for Action
  const actionTemplate = (rowData) => {
    let color = 'default';
    if (rowData.action.includes('CREATE')) color = 'success';
    else if (rowData.action.includes('DELETE')) color = 'error';
    else if (rowData.action.includes('UPDATE')) color = 'warning';
    else if (rowData.action.includes('LOGIN')) color = 'primary';
    else if (rowData.action.includes('REGISTER')) color = 'info';

    return (
      <Chip
        label={rowData.action}
        color={color}
        size="small"
        variant="filled"
        style={{ fontWeight: 600, fontSize: '0.75rem' }}
      />
    );
  };

  // Render Chip for Status
  const statusTemplate = (rowData) => {
    const isSuccess = rowData.status === 'success';
    return (
      <Chip
        label={rowData.status.toUpperCase()}
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

  const actorTemplate = (rowData) => {
    if (rowData.userEmail) {
      return (
        <div>
          <Typography variant="body2" style={{ fontWeight: 600 }}>{rowData.userEmail}</Typography>
          <Typography variant="caption" color="textSecondary">Role: {rowData.userRole || 'N/A'}</Typography>
        </div>
      );
    }
    return <Typography variant="body2" color="textSecondary">Anonymous / System</Typography>;
  };

  const entityTemplate = (rowData) => {
    if (rowData.entityType) {
      return (
        <div>
          <Typography variant="body2" style={{ fontWeight: 500 }}>{rowData.entityType}</Typography>
          <Typography variant="caption" color="textSecondary">ID: {rowData.entityId || 'N/A'}</Typography>
        </div>
      );
    }
    return <Typography variant="body2" color="textSecondary">N/A</Typography>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Tooltip title="View Audit Details" arrow>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => openPreview(rowData)}
          style={{ minWidth: 'unset' }}
        >
          <VisibilityIcon fontSize="small" />
        </Button>
      </Tooltip>
    );
  };

  const actionTypes = [
    'USER_LOGIN', 'USER_REGISTER', 'SELLER_REGISTER', 'FORGOT_PASSWORD', 'RESET_PASSWORD', 
    'UPDATE_USER', 'APPROVE_SELLER', 'CREATE_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT', 
    'CREATE_CATEGORY', 'UPDATE_CATEGORY', 'DELETE_CATEGORY', 'CREATE_COUPON', 'UPDATE_COUPON', 
    'DELETE_COUPON', 'PLACE_ORDER', 'UPDATE_ORDER_STATUS', 'CANCEL_ORDER'
  ];

  return (
    <>
      <BreadcrumbButton title="Audit Logs">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Security & Audit Logs
        </Typography>
      </BreadcrumbButton>
      
      {/* Search & Filter Panel */}
      <Card style={{ padding: '20px', marginBottom: '24px' }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Search User / Role"
                variant="outlined"
                size="small"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="email or role..."
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="action-filter-label">Action Type</InputLabel>
                <Select
                  labelId="action-filter-label"
                  value={actionFilter}
                  label="Action Type"
                  onChange={(e) => setActionFilter(e.target.value)}
                >
                  <MenuItem value="">All Actions</MenuItem>
                  {actionTypes.map((act) => (
                    <MenuItem key={act} value={act}>{act}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="failure">Failure</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box display="flex" gap={1}>
                <Button variant="contained" color="primary" type="submit" startIcon={<RefreshIcon />}>
                  Apply
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Logs Grid Section */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card style={{ padding: '8px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Typography variant="h4" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SecurityIcon color="primary" />
                Security Audit Log Entries
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={fetchLogs}
                disabled={loading}
              >
                Refresh
              </Button>
            </Box>
            
            <DataTable
              value={logs}
              paginator
              rows={10}
              loading={loading}
              rowsPerPageOptions={[10, 25, 50, 100]}
              tableStyle={{ minWidth: '50rem' }}
              sortField="createdAt"
              sortOrder={-1}
            >
              <Column field="createdAt" header="Timestamp" body={dateTemplate} sortable style={{ minWidth: '11rem' }} />
              <Column header="Actor" body={actorTemplate} style={{ minWidth: '14rem' }} />
              <Column field="action" header="Action" body={actionTemplate} sortable style={{ minWidth: '12rem' }} />
              <Column header="Target Entity" body={entityTemplate} style={{ minWidth: '10rem' }} />
              <Column field="description" header="Description" sortable style={{ minWidth: '20rem' }} />
              <Column field="status" header="Status" body={statusTemplate} sortable style={{ minWidth: '8rem', textAlign: 'center' }} />
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '5rem', textAlign: 'center' }} />
            </DataTable>
          </Card>
        </Grid>
      </Grid>

      {/* Audit Log Details Modal */}
      <Dialog
        open={previewOpen}
        onClose={closePreview}
        maxWidth="md"
        fullWidth
        aria-labelledby="audit-preview-title"
      >
        {previewLog && (
          <>
            <DialogTitle id="audit-preview-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="h4" style={{ fontWeight: 600 }}>Security Audit Event</Typography>
                <Typography variant="caption" color="textSecondary">Log ID: {previewLog.id}</Typography>
              </div>
              {statusTemplate(previewLog)}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="textSecondary">Actor Identity</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{previewLog.userEmail || 'Anonymous / System'}</Typography>
                  {previewLog.userId && (
                    <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>User ID: {previewLog.userId}</Typography>
                  )}
                  {previewLog.userRole && (
                    <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>Role: {previewLog.userRole}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="textSecondary">Action Performed</Typography>
                  <Box mt={0.5}>{actionTemplate(previewLog)}</Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="textSecondary">Timestamp</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{moment(previewLog.createdAt).format('DD MMM YYYY hh:mm:ss a')}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider style={{ margin: '8px 0' }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Target Resource Type</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{previewLog.entityType || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Target Resource ID</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{previewLog.entityId || 'N/A'}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Detailed Description</Typography>
                  <Typography variant="body1" style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px', marginTop: '6px', borderLeft: '3px solid #2196f3' }}>
                    {previewLog.description}
                  </Typography>
                </Grid>

                {previewLog.changes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '6px' }}>Captured State Changes</Typography>
                    <Box style={{ backgroundColor: '#1e1e1e', color: '#a9b2c3', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '13px' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        {(() => {
                          try {
                            const parsed = JSON.parse(previewLog.changes);
                            return JSON.stringify(parsed, null, 2);
                          } catch (e) {
                            return previewLog.changes;
                          }
                        })()}
                      </pre>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Divider style={{ margin: '8px 0' }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="textSecondary">Request IP Address</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600, fontFamily: 'monospace' }}>{previewLog.ipAddress || 'Unknown'}</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="subtitle2" color="textSecondary">Client User Agent</Typography>
                  <Typography variant="body2" style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{previewLog.userAgent || 'Unknown'}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closePreview} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ManageAuditLogs;
