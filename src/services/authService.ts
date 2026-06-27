// services/authService.ts
import api from '../views/Utils/api';

// users
export const registerUser = (data) => api.post('/api/user/register', data);
export const loginUser = (data) => api.post('/api/user/login', data);
export const userExists = (id, data) => api.post(`/api/user/exists/${id}`, data);
export const getAllUsers = (options) => api.get(`/api/user/get`, options);
export const getUser = (id) => api.get(`/api/user/get/${id}`);
export const updateUser = (id, data) => api.post(`/api/user/update/${id}`, data);
export const updatePassword = (id, data) => api.post(`/api/user/update-password/${id}`, data);
export const deleteUser = (id) => api.delete(`/api/user/delete/${id}`);


// // addresses
// export const getUserAddresses = (id) => api.get(`/api/address/get/user/${id}`)
// export const addAddress = (data) => api.post("/api/address/add", data)
// export const deleteAddress = (id) => api.post(`/api/address/delete/${id}`)
// export const makeAddressDefault = (id, userId) => api.post(`/api/address/update/default/${id}/${userId}`)
// export const getAddress = (id) => api.get(`/api/address/get/${id}`)
// export const updateAddress = (id, data) => api.post(`/api/address/update/${id}`, data)
