import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    image: string;
    location: string;
    price?: string; // Optional if you want to add price later
    specialty: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) => set((state) => {
                const exists = state.items.find((i) => i.id === item.id);
                if (exists) return state;
                return { items: [...state.items, item] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'aqua-nestam-cart',
        }
    )
);
