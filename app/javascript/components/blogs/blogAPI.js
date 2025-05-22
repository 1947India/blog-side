import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getBlogs = (token) =>
  axios.get(`${API_URL}/blogs`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const getBlog = (id, token) =>
  axios.get(`${API_URL}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const createBlog = (data, token) =>
  axios.post(`${API_URL}/blogs`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const updateBlog = (id, data, token) =>
  axios.put(`${API_URL}/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const deleteBlog = (id, token) =>
  axios.delete(`${API_URL}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
export const searchBlog = (query, token) =>
  axios.get(`${API_URL}/blogs/search?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
export const getAllUsers = (token) =>
  axios.get(`${API_URL}/sessions/fetch_user`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
export const getAllPublished = (token) =>
  axios.get(`${API_URL}/blogs/filter?published=false`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
export const updateUser = (id, userData, token) => {
  return axios.patch(`${API_URL}/admin/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};