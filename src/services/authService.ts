import api from '@/lib/axios';

// Generic Send OTP (for both Register and Login)
export const sendOtp = async (data: any) => {
    const response = await api.post('/auth/send-otp', data);
    return response.data;
};

// Generic Verify OTP (for both Register and Login)
export const verifyOtp = async (data: any) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// Legacy support if needed, but preferably use sendOtp
export const loginUser = async (data: any) => {
    // Redirect to sendOtp if possible or just use sendOtp
    return sendOtp(data);
};

export const registerUser = async (data: any) => {
    return sendOtp(data);
};
