import api from './axios';
export const shorten = (data) => api.post('/url/shorten', data).then(r => r.data);
export const listUrls = (params) => api.get('/url/user/all', { params }).then(r => r.data);
export const updateUrl = (id, data) => api.put(`/url/${id}`, data).then(r => r.data);
export const deleteUrl = (id) => api.delete(`/url/${id}`).then(r => r.data);
