import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'farmer' | 'hatchery';
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: Cookies.get('token') || null,
    setAuth: (user, token) => {
        Cookies.set('token', token, { expires: 7 }); // 7 Days
        set({ user, token });
    },
    logout: () => {
        Cookies.remove('token');
        set({ user: null, token: null });
    },
}));
