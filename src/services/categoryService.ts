// services/categoryService.ts
import api from '../views/Utils/api';

export const getAllCategories = (options?: any) => api.get('/api/category/get', options);
export const getCategory = (id: string | number) => api.get(`/api/category/get/${id}`);
export const addCategory = (data: any) => api.post('/api/category/add', data);
export const updateCategory = (id: string | number, data: any) => api.post(`/api/category/update/${id}`, data);
export const deleteCategory = (id: string | number) => api.delete(`/api/category/delete/${id}`);
export const uploadCategoryImage = (formData: FormData) => api.post('/api/category/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
