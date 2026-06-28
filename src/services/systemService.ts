// services/systemService.ts
import api from '../views/Utils/api';

export const getSystemHealth = () => api.get('/api/system/health');
export const getSystemLogs = () => api.get('/api/system/logs');
