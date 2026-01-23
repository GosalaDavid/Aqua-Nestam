"use client";

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Star, MapPin, ChevronRight, FileText, Camera, MessageSquare, PhoneCall, BadgeCheck, ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

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
    const { addItem, items } = useCartStore();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: hatchery.id,
            name: hatchery.name,
            image: hatchery.image,
            location: hatchery.location,
            specialty: hatchery.specialty
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const isInCart = items.some(i => i.id === hatchery.id);

    return (
        <div className="min-h-screen bg-page pb-48 relative overflow-x-hidden">
            {/* Transparent Floating Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-dark active:scale-90 transition-all shadow-lg border border-white pointer-events-auto"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="w-10" />
            </div>

            {/* Hero Image Section */}
            <div className="relative h-56 w-full px-4 -mt-16">
                <div className={`h-full w-full rounded-[40px] bg-gradient-to-br ${hatchery.color} flex items-center justify-center relative overflow-hidden shadow-xl border border-white/50 animate-in zoom-in duration-500`}>

                    {/* C.A.A Approved Badge - TOP LEFT */}
                    <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-success/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white/20">
                        <BadgeCheck size={14} className="text-white" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">C.A.A Approved</span>
                    </div>

                    <span className="text-6xl animate-pulse">{hatchery.image}</span>

                    {/* Rating Badge - Repositioned for visibility */}
                    <div className="absolute bottom-4 right-6 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-lg border border-white">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-700">{hatchery.rating}</span>
                    </div>

                    {/* Floating Status Badge */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white">
                        <span className={`h-2 w-2 rounded-full ${hatchery.seedAvailable ? 'bg-success animate-pulse' : 'bg-gray-400'}`} />
                        <span className={`text-[10px] font-bold ${hatchery.seedAvailable ? 'text-success' : 'text-gray-500'}`}>
                            {hatchery.seedAvailable ? 'In Stock' : 'Out of Stock'}
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
                        className="text-3xl font-bold text-dark leading-tight"
                        style={{ fontFamily: 'var(--font-noto-telugu), sans-serif' }}
                    >
                        {hatchery.name}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[90%]">
                        {hatchery.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 inline-flex px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <MapPin size={16} className="text-primary" />
                        <span className="text-xs font-bold text-dark uppercase tracking-wider">{hatchery.location}</span>
                    </div>
                </div>

                {/* Quick Action Links Overlay Prototype */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] px-1 text-center">Resources & Care</h3>

                    {/* Seed Test Reports */}
                    <button className="w-full group bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50/50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                <FileText size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-dark">Test Reports</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">Lab Certified Results</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>

                    {/* Seed Images/Videos */}
                    <button className="w-full group bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-orange-50/50 flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110">
                                <Camera size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-dark">Images / Videos</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">Live Media Updates</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>

                    {/* Reviews */}
                    <button className="w-full group bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-[28px] flex items-center justify-between transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50/50 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                                <MessageSquare size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-dark">User Reviews ({hatchery.reviews}+)</h4>
                                <p className="text-[10px] text-muted font-bold mt-0.5 uppercase tracking-wide">What Farmers Say</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>
                </div>
            </div>

            {/* Added to Cart Notification */}
            {added && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-300 font-bold">
                    <Check size={18} />
                    Hatchery added to cart!
                </div>
            )}

            {/* Fixed Bottom Action Bar - Fully Transparent / Floating */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-page via-page/80 to-transparent z-[60] flex gap-3 pb-10">
                <button className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-lg active:scale-95 transition-all">
                    <PhoneCall size={20} className="fill-emerald-600/10" />
                </button>
                <button
                    disabled={!hatchery.seedAvailable}
                    className={`flex-1 h-14 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 disabled:grayscale disabled:opacity-50 ${hatchery.seedAvailable
                        ? 'bg-primary text-white shadow-primary/30'
                        : 'bg-gray-200 text-gray-400 shadow-none'
                        }`}
                >
                    Order Now
                </button>
                <button
                    onClick={handleAddToCart}
                    className={`h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center border transition-all active:scale-95 shadow-lg ${isInCart ? 'text-emerald-600 border-emerald-100' : 'text-primary border-white'
                        }`}
                >
                    {isInCart ? <Check size={20} /> : <ShoppingCart size={20} />}
                </button>
            </div>
        </div>
    );
}
