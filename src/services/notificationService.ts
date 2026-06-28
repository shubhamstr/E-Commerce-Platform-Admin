// services/notificationService.ts
import api from '../views/Utils/api';

export const getNotifications = () => api.get('/api/notification');
export const markAsRead = (id: string | number) => api.put(`/api/notification/${id}/read`);
export const markAllAsRead = () => api.put('/api/notification/read-all');
