"use client";

import { Bell, Languages, Check } from 'lucide-react';
import { useState } from 'react';
import AquaNestamLogo from '@/components/shared/AquaNestamLogo';
import { useSettingsStore } from '@/store/settingsStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/utils/translations';

export default function HomeHeader() {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const { language, setLanguage } = useSettingsStore();
    const { t } = useTranslation();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setShowLanguageMenu(false);
    };

    return (
        <div className="bg-gradient-to-b from-secondary to-secondary/50 pb-3">
            {/* Top Bar: Brand + Actions */}
            <header className="px-4 py-3 flex items-center justify-between">
                <AquaNestamLogo />

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm border border-gray-100 hover:border-primary/20 active:scale-95 transition-all"
                        >
                            <Languages size={18} />
                        </button>

                        {/* Language Dropdown Menu */}
                        {showLanguageMenu && (
                            <div className="absolute right-0 top-11 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-[100] min-w-[140px] animate-in fade-in zoom-in duration-200 origin-top-right">
                                <div className="p-1">
                                    {[
                                        { code: 'en', label: 'English' },
                                        { code: 'te', label: 'తెలుగు' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code as Language)}
                                            className={`w-full px-3 py-2.5 rounded-xl text-left text-sm font-bold flex items-center justify-between transition-colors ${language === lang.code
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-dark hover:bg-gray-50'
                                                }`}
                                        >
                                            {lang.label}
                                            {language === lang.code && <Check size={14} strokeWidth={3} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white ring-2 ring-primary"></span>
                    </button>
                </div>
            </header>

            {/* Profile Section */}
            <div className="px-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-[18px] bg-gradient-to-tr from-primary via-orange-400 to-yellow-400 p-0.5 shadow-lg shadow-primary/20">
                    <div className="h-full w-full rounded-[16px] bg-white flex items-center justify-center text-primary font-bold text-lg overflow-hidden">
                        F
                    </div>
                </div>
                <div>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{t('welcomeBack')}</p>
                    <p className="text-lg font-bold text-dark leading-tight">{t('farmer')}</p>
                </div>
            </div>
        </div>
    );
}
