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
  LinearProgress, 
  Box,
  Divider
} from '@mui/material';

// icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import TimerIcon from '@mui/icons-material/Timer';
import InfoIcon from '@mui/icons-material/Info';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

// table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// project import
import BreadcrumbButton from 'component/BreadcrumbButton';
import { gridSpacing } from 'config.js';
import { getSystemHealth, getSystemLogs } from '../../services/systemService';
import { showSuccess, showError } from '../Utils/toast';

// ==============================|| MANAGE SYSTEM LOGS & HEALTH ||============================== //

const ManageSystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [healthLoading, setHealthLoading] = useState(false);
  
  // Dialog state for previewing log metadata
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLog, setPreviewLog] = useState(null);

  const fetchHealth = async () => {
    setHealthLoading(true);
    try {
      const res = await getSystemHealth();
      const { success, data, message, error } = res.data;
      if (success) {
        setHealth(data);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch application health metrics');
      }
    } catch (err) {
      console.error(err);
      showError('Error fetching health metrics');
    } finally {
      setHealthLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await getSystemLogs();
      const { success, data, message, error } = res.data;
      if (success) {
        setLogs(data);
      } else {
        console.error(error);
        showError(message || 'Failed to fetch system logs');
      }
    } catch (err) {
      console.error(err);
      showError('Error while fetching system logs');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAll = () => {
    fetchHealth();
    fetchLogs();
    showSuccess('System data refreshed.');
  };

  useEffect(() => {
    fetchHealth();
    fetchLogs();
  }, []);

  const openPreview = (log) => {
    setPreviewLog(log);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewLog(null);
  };

  // Format uptime (seconds to days/hours/minutes)
  const formatUptime = (seconds) => {
    if (!seconds) return 'N/A';
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);

    return parts.join(' ');
  };

  // Format bytes to MB
  const toMB = (bytes) => {
    if (!bytes) return 0;
    return Math.round(bytes / 1024 / 1024);
  };

  const statusTemplate = (rowData) => {
    let color = 'default';
    let icon = <InfoIcon fontSize="small" />;
    
    if (rowData.level === 'error') {
      color = 'error';
      icon = <ErrorIcon fontSize="small" />;
    } else if (rowData.level === 'warn') {
      color = 'warning';
      icon = <WarningIcon fontSize="small" />;
    } else if (rowData.level === 'info') {
      color = 'info';
      icon = <InfoIcon fontSize="small" />;
    }

    return (
      <Chip
        label={rowData.level.toUpperCase()}
        color={color}
        size="small"
        variant="outlined"
        icon={icon}
      />
    );
  };

  const dateTemplate = (rowData) => {
    return moment(rowData.createdAt).format('DD MMM YYYY hh:mm a');
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Tooltip title="View Detailed Log" arrow>
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

  // Memory Usage helper variables
  const heapUsed = health?.memory?.heapUsed ? toMB(health.memory.heapUsed) : 0;
  const heapTotal = health?.memory?.heapTotal ? toMB(health.memory.heapTotal) : 100;
  const memoryPercentage = Math.min(Math.round((heapUsed / heapTotal) * 100), 100);

  return (
    <>
      <BreadcrumbButton title="System & Operational Logs">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          App Health & Logs
        </Typography>
      </BreadcrumbButton>
      
      {/* Health Metrics Dashboard Cards */}
      <Grid container spacing={gridSpacing} style={{ marginBottom: '24px' }}>
        
        {/* System Health */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  SYSTEM STATUS
                </Typography>
                <Typography variant="h3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                  HEALTHY
                  <span className="pulse-green" style={{ marginLeft: '10px' }} />
                </Typography>
              </div>
              <SettingsSuggestIcon fontSize="large" color="primary" style={{ opacity: 0.8 }} />
            </Box>
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Platform: <strong>{health?.platform || 'N/A'}</strong> | Node: <strong>{health?.nodeVersion || 'N/A'}</strong>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Database Health */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ padding: '20px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  DATABASE CONNECTION
                </Typography>
                <Typography variant="h3" style={{ fontWeight: 700, color: health?.database?.status === 'healthy' ? '#2e7d32' : '#d32f2f' }}>
                  {health?.database?.status === 'healthy' ? 'CONNECTED' : 'DISCONNECTED'}
                </Typography>
              </div>
              <StorageIcon fontSize="large" color={health?.database?.status === 'healthy' ? 'success' : 'error'} style={{ opacity: 0.8 }} />
            </Box>
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Query response latency: <strong>{health?.database?.latencyMs ?? 0} ms</strong>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Memory Allocation */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ padding: '20px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  HEAP MEMORY USAGE
                </Typography>
                <Typography variant="h3" style={{ fontWeight: 700 }}>
                  {heapUsed} MB / {heapTotal} MB
                </Typography>
              </div>
              <MemoryIcon fontSize="large" color="secondary" style={{ opacity: 0.8 }} />
            </Box>
            <Box mt={2}>
              <LinearProgress variant="determinate" value={memoryPercentage} color={memoryPercentage > 85 ? 'error' : memoryPercentage > 60 ? 'warning' : 'primary'} />
              <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: '4px' }}>
                Usage: <strong>{memoryPercentage}%</strong> of allocated heap
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Server Uptime */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ padding: '20px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  SERVER UPTIME
                </Typography>
                <Typography variant="h3" style={{ fontWeight: 700 }}>
                  {formatUptime(health?.uptime)}
                </Typography>
              </div>
              <TimerIcon fontSize="large" color="info" style={{ opacity: 0.8 }} />
            </Box>
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Server Started At: <strong>{health?.timestamp ? moment(new Date(health.timestamp)).subtract(health.uptime, 'seconds').format('DD MMM hh:mm a') : 'N/A'}</strong>
              </Typography>
            </Box>
          </Card>
        </Grid>

      </Grid>

      {/* Logs Grid Section */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card style={{ padding: '8px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Typography variant="h4" style={{ fontWeight: 600 }}>System & Operational Log Entries</Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={handleRefreshAll}
                disabled={loading || healthLoading}
              >
                Refresh Data
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
              <Column field="level" header="Level" body={statusTemplate} sortable filter style={{ minWidth: '8rem' }} />
              <Column field="source" header="Source" sortable filter style={{ minWidth: '10rem' }} />
              <Column field="message" header="Message" sortable filter style={{ minWidth: '25rem' }} />
              <Column field="createdAt" header="Timestamp" body={dateTemplate} sortable style={{ minWidth: '12rem' }} />
              <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '6rem', textAlign: 'center' }} />
            </DataTable>
          </Card>
        </Grid>
      </Grid>

      {/* Log Details Modal */}
      <Dialog
        open={previewOpen}
        onClose={closePreview}
        maxWidth="md"
        fullWidth
        aria-labelledby="log-preview-title"
      >
        {previewLog && (
          <>
            <DialogTitle id="log-preview-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="h4" style={{ fontWeight: 600 }}>Log Entry Details</Typography>
                <Typography variant="caption" color="textSecondary">ID: {previewLog.id}</Typography>
              </div>
              {statusTemplate(previewLog)}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Source / Module</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{previewLog.source}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Timestamp</Typography>
                  <Typography variant="body1" style={{ fontWeight: 600 }}>{moment(previewLog.createdAt).format('DD MMM YYYY hh:mm:ss a')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Log Message</Typography>
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '6px' }}>
                    {previewLog.message}
                  </Typography>
                </Grid>
                {previewLog.meta && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '6px' }}>Extended Metadata / Context</Typography>
                    <Box style={{ backgroundColor: '#1e1e1e', color: '#a9b2c3', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '13px' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        {(() => {
                          try {
                            const parsed = JSON.parse(previewLog.meta);
                            return JSON.stringify(parsed, null, 2);
                          } catch (e) {
                            return previewLog.meta;
                          }
                        })()}
                      </pre>
                    </Box>
                  </Grid>
                )}
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

      <style>{`
        .pulse-green {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #4caf50;
          box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
          }
        }
      `}</style>
    </>
  );
};

export default ManageSystemLogs;
