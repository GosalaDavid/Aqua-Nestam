"use client";

import { useSettingsStore } from '@/store/settingsStore';
import { translations, TranslationKeys, Language } from '@/utils/translations';

export function useTranslation() {
    const { language } = useSettingsStore();

    // Default to 'en' if no language is set or if specified language doesn't exist
    const currentLang: Language = (language as Language) || 'en';

    const t = (key: TranslationKeys): string => {
        const langMap = translations[currentLang] as Record<TranslationKeys, string>;
        const fallback = translations['en'] as Record<TranslationKeys, string>;
        return langMap[key] || fallback[key] || key;
    };

    return { t, currentLang };
}
