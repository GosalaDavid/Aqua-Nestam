"use client";

import { Star, MapPin, Search, Award, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const allHatcheries = [
    {
        id: 1,
        name: "Blue Ocean Hatchery",
        location: "Vijayawada, AP",
        district: "Vijayawada",
        rating: 4.8,
        reviews: 156,
        image: "🦐",
        specialty: "Vannamei Shrimp",
        seedAvailable: true,
        isVerified: true,
        color: "from-blue-500/10 to-cyan-500/10",
        accent: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: 2,
        name: "Aqua Elite Farms",
        location: "Nellore, AP",
        district: "Nellore",
        rating: 4.6,
        reviews: 98,
        image: "🐟",
        specialty: "Mixed Species",
        seedAvailable: true,
        isVerified: false,
        color: "from-emerald-500/10 to-teal-500/10",
        accent: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        id: 3,
        name: "Coastal Hatchery Co.",
        location: "Kakinada, AP",
        district: "Kakinada",
        rating: 4.9,
        reviews: 203,
        image: "🦞",
        specialty: "Prawn Seeds",
        seedAvailable: false,
        isVerified: true,
        color: "from-orange-500/10 to-amber-500/10",
        accent: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        id: 4,
        name: "Marine Seeds Ltd.",
        location: "Guntur, AP",
        district: "Guntur",
        rating: 4.5,
        reviews: 87,
        image: "🐠",
        specialty: "Fish Seeds",
        seedAvailable: true,
        isVerified: true,
        color: "from-purple-500/10 to-pink-500/10",
        accent: "text-purple-600",
        bg: "bg-purple-50"
    }
];

interface AllHatcheriesListProps {
    searchQuery?: string;
    district?: string;
}

export default function AllHatcheriesList({ searchQuery = "", district = "All Districts" }: AllHatcheriesListProps) {
    const { t } = useTranslation();

    const filteredHatcheries = allHatcheries.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDistrict = district === "All Districts" || h.district === district;

        return matchesSearch && matchesDistrict;
    });

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-dark text-lg tracking-tight">
                        {searchQuery || district !== "All Districts" ? t('filteredResults') : t('allHatcheries')}
                    </h3>
                    <span className="text-xs font-bold text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                        {filteredHatcheries.length}
                    </span>
                </div>
                {!(searchQuery || district !== "All Districts") && (
                    <button className="text-[11px] font-bold text-muted flex items-center gap-1 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm">
                        {t('sortBy')}: {t('rating')}
                    </button>
                )}
            </div>

            {/* Vertical List */}
            <div className="space-y-3">
                {filteredHatcheries.length > 0 ? (
                    filteredHatcheries.map((hatchery) => (
                        <Link
                            href={`/hatchery/${hatchery.id}`}
                            key={hatchery.id}
                            className="group rounded-[32px] bg-white/80 backdrop-blur-md p-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-white/60 flex items-center gap-4 transition-all hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 relative overflow-hidden active:scale-[0.98] block"
                        >
                            {/* Dynamic Decorative background gradient */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hatchery.color} rounded-full blur-3xl -mr-10 -mt-10 opacity-40 group-hover:opacity-100 transition-opacity`} />

                            {/* Image with Accent Bg */}
                            <div className="relative z-10">
                                <div className={`h-16 w-16 rounded-[22px] ${hatchery.bg} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
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

                            {/* Info */}
                            <div className="flex-1 min-w-0 relative z-10">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-dark text-[15px] tracking-tight truncate group-hover:text-primary transition-colors">
                                        {hatchery.name}
                                    </h4>
                                </div>

                                <div className="flex items-center gap-3 mt-1.5">
                                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-100/50">
                                        <Star size={10} className="fill-amber-400 text-amber-400" />
                                        <span className="text-[10px] font-bold text-amber-700">{hatchery.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={10} className="text-muted" />
                                        <span className="text-[10px] text-muted font-bold truncate uppercase tracking-widest">{hatchery.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2.5">
                                    <span className={`text-[10px] font-bold ${hatchery.accent} ${hatchery.bg} px-2.5 py-1 rounded-lg tracking-tight`}>
                                        {hatchery.specialty}
                                    </span>
                                    <div className="flex items-center gap-1.5 ml-1">
                                        <span className={`h-1.5 w-1.5 rounded-full ${hatchery.seedAvailable ? "bg-success animate-pulse" : "bg-gray-300"}`} />
                                        <span className={`text-[10px] font-bold ${hatchery.seedAvailable ? "text-success" : "text-muted"}`}>
                                            {hatchery.seedAvailable ? t('inStock') : t('outOfStock')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Simple Action */}
                            <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center text-muted group-hover:bg-primary group-hover:text-white transition-all relative z-10">
                                <ChevronRight size={20} />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200">
                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Search className="text-muted" size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-dark">{t('noHatcheries')}</p>
                            <p className="text-xs text-muted">{t('adjustSearch')}</p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-xs font-bold text-primary underline"
                        >
                            {t('resetFilters')}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
