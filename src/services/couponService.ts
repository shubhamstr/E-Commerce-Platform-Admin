// services/couponService.ts
import api from '../views/Utils/api';

export const getAllCoupons = () => api.get('/api/coupon');
export const getCoupon = (id: string | number) => api.get(`/api/coupon/${id}`);
export const addCoupon = (data: any) => api.post('/api/coupon', data);
export const updateCoupon = (id: string | number, data: any) => api.put(`/api/coupon/${id}`, data);
export const deleteCoupon = (id: string | number) => api.delete(`/api/coupon/${id}`);
