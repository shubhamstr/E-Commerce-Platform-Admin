// services/productService.ts
import api from '../views/Utils/api';

export const getAllProducts = (options?: any) => api.get('/api/product/get', options);
export const getProduct = (id: string | number) => api.get(`/api/product/get/${id}`);
export const addProduct = (data: any) => api.post('/api/product/add', data);
export const updateProduct = (id: string | number, data: any) => api.post(`/api/product/update/${id}`, data);
export const deleteProduct = (id: string | number) => api.delete(`/api/product/delete/${id}`);
export const uploadProductImage = (formData: FormData) => api.post('/api/product/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const bulkImportProducts = (data: any) => api.post('/api/product/bulk-import', data);

