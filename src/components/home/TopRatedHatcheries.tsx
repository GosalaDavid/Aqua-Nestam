"use client";

import { Star, MapPin, Trophy, ArrowUpRight, Award } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const hatcheries = [
    {
        id: 1,
        name: "Blue Ocean Hatchery",
        location: "Vijayawada, AP",
        rating: 4.8,
        reviews: 156,
        description: "Premium quality shrimp seeds with high survival rate",
        seedAvailable: true,
        isVerified: true,
        image: "🦐",
        specialty: "Vannamei Shrimp",
        color: "from-blue-500/20 to-cyan-500/20",
        accent: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: 2,
        name: "Aqua Elite Farms",
        location: "Nellore, AP",
        rating: 4.6,
        reviews: 98,
        description: "Certified organic fish and shrimp seed supplier",
        seedAvailable: true,
        isVerified: false,
        image: "🐟",
        specialty: "Mixed Species",
        color: "from-emerald-500/20 to-teal-500/20",
        accent: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        id: 3,
        name: "Coastal Hatchery Co.",
        location: "Kakinada, AP",
        rating: 4.9,
        reviews: 203,
        description: "Leading supplier of disease-resistant seeds",
        seedAvailable: false,
        isVerified: true,
        image: "🦞",
        specialty: "Prawn Seeds",
        color: "from-orange-500/20 to-amber-500/20",
        accent: "text-orange-600",
        bg: "bg-orange-50"
    }
];

export default function TopRatedHatcheries() {
    const { t } = useTranslation();
    return (
        <section className="py-2">
            <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Trophy size={18} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-dark text-lg tracking-tight">{t('topRated')}</h3>
                </div>
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                    {t('viewAll')} <ArrowUpRight size={14} />
                </button>
            </div>

            {/* Premium Horizontal Carousel */}
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
                {hatcheries.map((hatchery) => (
                    <Link
                        href={`/hatchery/${hatchery.id}`}
                        key={hatchery.id}
                        className="flex-shrink-0 w-64 rounded-3xl bg-white/70 backdrop-blur-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 snap-start relative overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 block"
                    >
                        {/* Decorative background gradient */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hatchery.color} rounded-full blur-3xl -mr-10 -mt-10 opacity-60 group-hover:opacity-100 transition-opacity`} />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="relative">
                                    <div className={`h-14 w-14 rounded-2xl ${hatchery.bg} flex items-center justify-center text-2xl shadow-inner`}>
                                        {hatchery.image}
                                    </div>
                                    {hatchery.isVerified && (
                                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 z-20 animate-in fade-in zoom-in duration-500">
                                            <img
                                                src="/images/verified-badge.png"
                                                alt="Verified"
                                                className="w-full h-full object-contain drop-shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-amber-700">{hatchery.rating}</span>
                                </div>
                            </div>

                            <div className="space-y-1 mb-4">
                                <h4 className="font-bold text-dark text-sm tracking-tight leading-tight group-hover:text-primary transition-colors">
                                    {hatchery.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <MapPin size={10} className="text-muted" />
                                    <p className="text-[10px] text-muted font-medium uppercase tracking-wider">{hatchery.location}</p>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                                {hatchery.description}
                            </p>

                            {/* Specialty Tag & Status */}
                            <div className="flex items-center justify-between mt-auto">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg ${hatchery.bg} ${hatchery.accent} text-[10px] font-bold tracking-tight`}>
                                    {hatchery.specialty}
                                </span>

                                <div className="flex items-center gap-1">
                                    <span className={`h-1.5 w-1.5 rounded-full ${hatchery.seedAvailable ? "bg-success animate-pulse" : "bg-gray-300"}`} />
                                    <span className={`text-[10px] font-bold ${hatchery.seedAvailable ? "text-success" : "text-muted"}`}>
                                        {hatchery.seedAvailable ? t('available') : t('stockOut')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
