"use client";

import { useSettingsStore } from '@/store/settingsStore';
import { useRouter } from 'next/navigation';
import { Check, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export default function LanguageSelectionPage() {
    const { setLanguage, language } = useSettingsStore();
    const router = useRouter();
    const { t } = useTranslation();

    const handleSelect = (code: string) => {
        setLanguage(code as any);
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col px-6 py-12">
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="h-20 w-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mb-6">
                    <Globe size={40} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-dark tracking-tight mb-2">
                    {t('chooseLanguage')}
                </h1>
                <p className="text-muted font-bold text-sm uppercase tracking-widest leading-relaxed">
                    మీ భాషను ఎంచుకోండి
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                        className={`group relative flex items-center justify-between p-5 rounded-[28px] border-2 transition-all duration-300 active:scale-[0.98] ${language === lang.code
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                            <span className={`text-lg font-bold tracking-tight ${language === lang.code ? 'text-primary' : 'text-dark'}`}>
                                {lang.native}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-muted tracking-widest mt-0.5">
                                {lang.name}
                            </span>
                        </div>

                        {language === lang.code && (
                            <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                                <Check size={18} strokeWidth={3} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted leading-relaxed">
                    {t('anytimeSettings')}
                </p>
            </div>
        </div>
    );
}
