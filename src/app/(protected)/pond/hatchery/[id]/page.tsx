"use client";

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Star, MapPin, ChevronRight, FileText, Camera, MessageSquare, PhoneCall } from 'lucide-react';
import Link from 'next/link';

// Mock Data (matches the mock data in home components for consistency)
const hatcheries = [
    {
        id: 1,
        name: "Blue Ocean Hatchery",
        location: "Vijayawada, AP",
        district: "Vijayawada",
        rating: 4.8,
        reviews: 156,
        description: "Premium quality shrimp seeds with high survival rate and fast growth potential.",
        seedAvailable: true,
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
        district: "Nellore",
        rating: 4.6,
        reviews: 98,
        description: "Certified organic fish and shrimp seed supplier with decades of trust.",
        seedAvailable: true,
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
        district: "Kakinada",
        rating: 4.9,
        reviews: 203,
        description: "Leading supplier of disease-resistant seeds optimized for local conditions.",
        seedAvailable: false,
        image: "🦞",
        specialty: "Prawn Seeds",
        color: "from-orange-500/20 to-amber-500/20",
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
        description: "High performance fish seeds for intensive aquaculture systems.",
        seedAvailable: true,
        image: "🐠",
        specialty: "Fish Seeds",
        color: "from-purple-500/20 to-pink-500/10",
        accent: "text-purple-600",
        bg: "bg-purple-50"
    }
];

export default function HatcheryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const hatchery = hatcheries.find(h => h.id === id) || hatcheries[0];

    return (
        <div className="min-h-screen bg-page pb-24 relative overflow-x-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 flex items-center justify-between px-4 py-3">
                <button
                    onClick={() => router.back()}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-dark active:scale-90 transition-all shadow-sm"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="font-black text-dark text-lg tracking-tight">Hatchery Detail</h1>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 shadow-sm">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black text-amber-700">{hatchery.rating}</span>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative h-64 w-full px-4 mt-4">
                <div className={`h-full w-full rounded-[40px] bg-gradient-to-br ${hatchery.color} flex items-center justify-center relative overflow-hidden shadow-2xl border border-white/50`}>
                    <span className="text-8xl animate-pulse">{hatchery.image}</span>

                    {/* Floating Status Badge */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white">
                        <span className={`h-2.5 w-2.5 rounded-full ${hatchery.seedAvailable ? 'bg-success animate-pulse' : 'bg-gray-400'}`} />
                        <span className={`text-xs font-black ${hatchery.seedAvailable ? 'text-success' : 'text-gray-500'}`}>
                            {hatchery.seedAvailable ? 'Seeds Available' : 'Currently Out of Stock'}
                        </span>
                    </div>

                    {/* Decorative Blur */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl`} />
                </div>
            </div>

            {/* Content Section */}
            <div className="px-4 mt-8 space-y-8 animate-in slide-in-from-bottom duration-700">
                {/* Basic Info */}
                <div className="space-y-2">
                    <h2
                        className="text-3xl font-black text-dark leading-tight"
                        style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}
                    >
                        {hatchery.name}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[90%]">
                        {hatchery.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 inline-flex px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <MapPin size={16} className="text-primary" />
                        <span className="text-xs font-black text-dark uppercase tracking-wider">{hatchery.location}</span>
                    </div>
                </div>

                {/* Quick Action Links Overlay Prototype */}
                <div className="space-y-3">
                    <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em] px-1">Resources & Care</h3>

                    {/* Seed Test Reports */}
                    <button className="w-full group bg-white hover:bg-primary/[0.02] border border-gray-100 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                <FileText size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-black text-dark">Seed Test Reports</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">Lab Certified Results</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>

                    {/* Seed Images/Videos */}
                    <button className="w-full group bg-white hover:bg-primary/[0.02] border border-gray-100 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110">
                                <Camera size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-black text-dark">Seed Images / Videos</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">Live Media Updates</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>

                    {/* Reviews */}
                    <button className="w-full group bg-white hover:bg-primary/[0.02] border border-gray-100 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                                <MessageSquare size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-black text-dark">User Reviews ({hatchery.reviews}+)</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">What Farmers Say</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>
                </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-[60] flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-dark border border-gray-200 active:scale-95 transition-all">
                    <PhoneCall size={20} />
                </button>
                <button
                    disabled={!hatchery.seedAvailable}
                    className={`flex-1 h-14 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 disabled:grayscale disabled:opacity-50 ${hatchery.seedAvailable
                            ? 'bg-primary text-white shadow-primary/20'
                            : 'bg-gray-200 text-gray-400 shadow-none'
                        }`}
                >
                    Order Now
                </button>
            </div>
        </div>
    );
}
