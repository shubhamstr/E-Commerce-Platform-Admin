// services/contactService.ts
import api from '../views/Utils/api';

export const getAllContacts = (options?: any) => api.get('/api/contact/get', options);
export const markContactRead = (id: string | number) => api.patch(`/api/contact/mark-read/${id}`);
export const deleteContact = (id: string | number) => api.delete(`/api/contact/delete/${id}`);
