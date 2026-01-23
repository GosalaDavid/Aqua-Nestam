"use client";

import { useLanguageStore } from '@/store/languageStore';

export const LanguageSelector = () => {
    const { language, setLanguage } = useLanguageStore();

    return (
        <div className="flex gap-2 items-center">
            <button
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'en'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => setLanguage('en')}
            >
                English
            </button>
            <span className="text-gray-300">|</span>
            <button
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'te'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => setLanguage('te')}
            >
                తెలుగు
            </button>
        </div>
    );
};
