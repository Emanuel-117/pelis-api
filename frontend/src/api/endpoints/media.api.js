import axiosClient from '../axiosClient';

const BASE = '/media';
export const media = {
    getAll: (params) => axiosClient.get(BASE, { params }),
    getById: (id) => axiosClient.get(`${BASE}/${id}`),
    getBySerial: (serial) => axiosClient.get(`${BASE}/serial/${serial}`),
    create: (data) => axiosClient.post(BASE, data),
    update: (id, data) => axiosClient.put(`${BASE}/${id}`, data),
    remove: (id) => axiosClient.delete(`${BASE}/${id}`),
};
