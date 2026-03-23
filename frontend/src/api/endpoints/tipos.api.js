import axiosClient from '../axiosClient';

const BASE = '/tipos';
export const tipos = {
    getAll: () => axiosClient.get(BASE),
    getById: (id) => axiosClient.get(`${BASE}/${id}`),
    create: (data) => axiosClient.post(BASE, data),
    update: (id, data) => axiosClient.put(`${BASE}/${id}`, data),
    remove: (id) => axiosClient.delete(`${BASE}/${id}`),
};
