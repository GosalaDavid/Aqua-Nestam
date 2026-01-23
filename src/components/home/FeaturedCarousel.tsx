"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKeys } from '@/utils/translations';

const carouselItems = [
    {
        id: 1,
        titleKey: "premiumAqua" as TranslationKeys,
        subtitleKey: "expertSubtitle" as TranslationKeys,
        bgColor: "from-blue-500 to-cyan-400",
        icon: "🐟"
    },
    {
        id: 2,
        titleKey: "marketInsights" as TranslationKeys,
        subtitleKey: "realtimeSubtitle" as TranslationKeys,
        bgColor: "from-green-500 to-emerald-400",
        icon: "📊"
    },
    {
        id: 3,
        titleKey: "qualityFeed" as TranslationKeys,
        subtitleKey: "feedSubtitle" as TranslationKeys,
        bgColor: "from-orange-500 to-amber-400",
        icon: "🌾"
    }
];

export default function FeaturedCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="relative h-32 overflow-hidden rounded-2xl">
                {carouselItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex
                            ? 'opacity-100 translate-x-0'
                            : index < currentIndex
                                ? 'opacity-0 -translate-x-full'
                                : 'opacity-0 translate-x-full'
                            }`}
                    >
                        <div className={`h-full w-full bg-gradient-to-r ${item.bgColor} p-4 flex items-center justify-between rounded-2xl shadow-lg`}>
                            <div className="flex items-center gap-3">
                                <div className="text-4xl">{item.icon}</div>
                                <div>
                                    <h3 className="text-white font-bold text-base">{t(item.titleKey)}</h3>
                                    <p className="text-white/90 text-xs mt-0.5">{t(item.subtitleKey)}</p>
                                </div>
                            </div>
                            <button className="rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white hover:bg-white/30 transition-colors">
                                {t('explore')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-1.5 mt-3">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${index === currentIndex
                            ? 'w-6 bg-primary'
                            : 'w-1.5 bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
