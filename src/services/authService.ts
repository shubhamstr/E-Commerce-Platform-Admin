/* eslint-disable @typescript-eslint/no-explicit-any */
// services/authService.ts
import api from "../views/Utils/api"

// users
// export const registerUser = (data: any) => api.post("/api/user/register", data)
export const loginUser = (data: any) => api.post("/api/user/login", data)
export const userExists = (id: any, data: any) => api.post(`/api/user/exists/${id}`, data)
export const getAllUsers = () => api.get(`/api/user/get`)
// export const getUser = (id: any) => api.get(`/api/user/get/${id}`)
// export const updateUser = (id: any, data: any) => api.post(`/api/user/update/${id}`, data)
// export const updatePassword = (id: any, data: any) => api.post(`/api/user/update-password/${id}`, data)

// // addresses
// export const getUserAddresses = (id: any) => api.get(`/api/address/get/user/${id}`)
// export const addAddress = (data: any) => api.post("/api/address/add", data)
// export const deleteAddress = (id: any) => api.post(`/api/address/delete/${id}`)
// export const makeAddressDefault = (id: any, userId: any) => api.post(`/api/address/update/default/${id}/${userId}`)
// export const getAddress = (id: any) => api.get(`/api/address/get/${id}`)
// export const updateAddress = (id: any, data: any) => api.post(`/api/address/update/${id}`, data)
