// services/orderService.ts
import api from '../views/Utils/api';

export const getAllOrders = () => api.get('/api/order');
export const updateOrderStatus = (id: string | number, status: string) => api.put(`/api/order/${id}/status`, { status });
