"use client";

import { useState } from 'react';
import { TestTube, ShoppingBag, Stethoscope, AlertTriangle, ChevronRight, Droplets, FlaskConical, Microchip, Leaf, Activity, BadgeCheck, Shield, HeartPulse } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKeys } from '@/utils/translations';

const services = [
    {
        id: 'lab',
        nameKey: 'labTest' as TranslationKeys,
        icon: TestTube,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        activeBg: 'bg-blue-600',
        descKey: 'labDesc' as TranslationKeys,
        items: [
            { icon: Droplets, labelKey: 'waterAnalysis' as TranslationKeys, sub: 'pH, Salinity, Ammonia' },
            { icon: Microchip, labelKey: 'pcrTesting' as TranslationKeys, sub: 'Virus & Disease detection' },
            { icon: FlaskConical, labelKey: 'soilHealth' as TranslationKeys, sub: 'Mineral & Nutrient check' }
        ]
    },
    {
        id: 'feed',
        nameKey: 'feed' as TranslationKeys,
        icon: ShoppingBag,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        activeBg: 'bg-orange-600',
        descKey: 'feedDesc' as TranslationKeys,
        items: [
            { icon: Leaf, labelKey: 'organicFeed' as TranslationKeys, sub: 'Natural growth boosters' },
            { icon: BadgeCheck, labelKey: 'probiotics' as TranslationKeys, sub: 'Gut health & immunity' },
            { icon: Activity, labelKey: 'growthPlan' as TranslationKeys, sub: 'Species-specific programs' }
        ]
    },
    {
        id: 'consult',
        nameKey: 'consult' as TranslationKeys,
        icon: Stethoscope,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        activeBg: 'bg-emerald-600',
        descKey: 'consultDesc' as TranslationKeys,
        items: [
            { icon: Activity, labelKey: 'expertAdvice' as TranslationKeys, sub: '24/7 technical support' },
            { icon: BadgeCheck, labelKey: 'pondAudit' as TranslationKeys, sub: 'On-site health inspection' },
            { icon: Leaf, labelKey: 'strategy' as TranslationKeys, sub: 'Improve harvest efficiency' }
        ]
    },
    {
        id: 'disease-alerts',
        nameKey: 'careAlerts' as TranslationKeys,
        icon: AlertTriangle,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        activeBg: 'bg-purple-600',
        descKey: 'careDesc' as TranslationKeys,
        items: [
            { icon: AlertTriangle, labelKey: 'seasonalAlerts' as TranslationKeys, sub: 'Disease outbreak warnings' },
            { icon: Shield, labelKey: 'preventionTips' as TranslationKeys, sub: 'Proactive care guidelines' },
            { icon: HeartPulse, labelKey: 'treatmentGuide' as TranslationKeys, sub: 'Quick response protocols' }
        ]
    },
];

export default function ServicesTabs() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const { t } = useTranslation();
    const activeService = services.find(s => s.id === activeTab);

    return (
        <section className="space-y-5 animate-in fade-in duration-700">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-dark text-lg tracking-tight">{t('ourServices')}</h3>
                <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
                    <div className="h-1.5 w-4 rounded-full bg-primary"></div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between items-center bg-white/50 backdrop-blur-md p-1.5 rounded-[24px] border border-white/60 shadow-sm">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setActiveTab(activeTab === service.id ? null : service.id)}
                        className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-[20px] transition-all duration-300 relative flex-1 ${activeTab === service.id
                            ? 'bg-white shadow-[0_8px_15px_rgb(0,0,0,0.05)] translate-y-[-2px]'
                            : 'hover:bg-white/40'
                            }`}
                    >
                        <div className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${activeTab === service.id ? service.activeBg : service.bg
                            }`}>
                            <service.icon
                                size={22}
                                className={activeTab === service.id ? 'text-white' : service.color}
                            />
                        </div>
                        <span className={`text-[11px] font-bold tracking-tight transition-colors duration-300 ${activeTab === service.id ? 'text-dark' : 'text-muted'
                            }`}>
                            {t(service.nameKey)}
                        </span>
                        {activeTab === service.id && (
                            <div className={`absolute bottom-0 h-1 w-4 rounded-full ${service.activeBg} opacity-60 translate-y-2`}></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Content Display - Only show when a service is selected */}
            {activeService && (
                <div className="relative group perspective-1000 animate-in slide-in-from-top-4 fade-in duration-500">
                    <div className="p-5 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_rgb(0,0,0,0.05)] transition-all duration-500 transform-gpu group-hover:shadow-[0_20px_45px_rgb(0,0,0,0.08)]">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h4 className="font-bold text-dark text-base tracking-tight leading-none">
                                    {t(activeService.nameKey)} <span className="text-primary font-medium">{t('servicesTitle')}</span>
                                </h4>
                                <p className="text-[11px] text-muted font-medium pr-4 leading-relaxed">
                                    {t(activeService.descKey)}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2.5">
                                {activeService.items.map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white/60 hover:bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300 text-left group/btn"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`h-9 w-9 rounded-xl ${activeService.bg} flex items-center justify-center group-hover/btn:scale-110 transition-transform`}>
                                                <item.icon className={activeService.color} size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-dark">{t(item.labelKey)}</p>
                                                <p className="text-[10px] text-muted font-medium">{item.sub}</p>
                                            </div>
                                        </div>
                                        <div className="h-7 w-7 rounded-full bg-gray-50 flex items-center justify-center text-muted group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                                            <ChevronRight size={14} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button className={`w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-lg active:scale-95 transition-all duration-300 ${activeService.activeBg} shadow-${activeService.id}-500/20`}>
                                {t('exploreOptions')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
