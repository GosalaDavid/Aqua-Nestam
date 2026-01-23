"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function WelcomePage() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-dark">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-110 animate-slow-zoom"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1590483734724-38fa1f477a10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full min-h-screen px-7 pb-12 pt-20">
                {/* Branding */}
                <div className="flex flex-col items-start mb-auto">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tighter">
                            Aqua Nestam
                        </h1>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4 tracking-tight">
                        {t('growFarmBetter')}
                    </h2>
                    <p className="text-white/70 text-lg font-medium leading-relaxed">
                        {t('welcomeHeroDesc')}
                    </p>

                    {/* Carousel Indicators (Mock) */}
                    <div className="flex gap-2 mt-8">
                        <div className="h-1.5 w-6 bg-primary rounded-full" />
                        <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
                        <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
                        <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-[20px] font-bold text-lg shadow-2xl shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        {t('loginToAccount')}
                    </button>

                    <button
                        onClick={() => router.push('/register')}
                        className="w-full h-16 bg-white border border-gray-200 text-dark rounded-[20px] font-bold text-lg active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        {t('registerAsFarmer')}
                    </button>
                </div>

                {/* Footer Info */}
                <div className="mt-10 text-center">
                    <p className="text-white/40 text-[11px] font-medium leading-relaxed">
                        {t('agreeToOur')}<br />
                        <Link href="/legal/terms" className="underline hover:text-white/60">{t('termsOfService')}</Link> | <Link href="/legal/privacy" className="underline hover:text-white/60">{t('privacyPolicy')}</Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    );
}
