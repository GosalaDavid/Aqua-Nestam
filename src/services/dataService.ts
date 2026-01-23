import api from '@/lib/axios';

// Hatchery Services
export const getMyHatchery = async () => {
    const response = await api.get('/hatcheries/me');
    return response.data;
};

export const createOrUpdateHatchery = async (data: any) => {
    const response = await api.post('/hatcheries', data);
    return response.data;
};

export const getHatcheries = async () => {
    const response = await api.get('/hatcheries');
    return response.data;
};

// Order Services
export const createOrder = async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
};

export const getMyOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};
