import api from './axios';
export const dashboard = () => api.get('/analytics/user/dashboard').then(r => r.data);
export const urlAnalytics = (shortCode) => api.get(`/analytics/${shortCode}`).then(r => r.data);
