import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/utils/translations';

interface SettingsState {
    language: Language | null;
    hasCompletedOnboarding: boolean;
    setLanguage: (lang: Language) => void;
    completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            language: null,
            hasCompletedOnboarding: false,
            setLanguage: (lang: Language) => set({ language: lang }),
            completeOnboarding: () => set({ hasCompletedOnboarding: true }),
        }),
        {
            name: 'app-settings',
        }
    )
);
