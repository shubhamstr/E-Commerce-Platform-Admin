// services/emailLogService.ts
import api from '../views/Utils/api';

export const getAllEmailLogs = () => api.get('/api/email-log');
export const resendEmailLog = (id: string | number) => api.post(`/api/email-log/resend/${id}`);
