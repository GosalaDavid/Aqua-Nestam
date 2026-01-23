"use client";

import { useState } from 'react';
import {
    ChevronLeft,
    HelpCircle,
    PhoneCall,
    MessageCircle,
    AlertCircle,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Calendar,
    User,
    ChevronDown,
    Image as ImageIcon,
    Video,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function SupportPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [issueType, setIssueType] = useState('');
    const [showComplaintForm, setShowComplaintForm] = useState(false);

    // Mock data for tickets
    const tickets = [
        {
            id: "TKT-8821",
            type: "Delivery Delay",
            orderId: "ORD-9901",
            status: "In Progress",
            statusColor: "text-blue-600 bg-blue-50",
            date: "Today, 10:30 AM",
            assigned: "Ravi (Support Team)"
        }
    ];

    // Mock data for recent orders
    const recentOrders = [
        { id: "ORD-9901", hatchery: "Sri Rama Hatcheries", date: "20 Jan" },
        { id: "ORD-9852", hatchery: "Vinayaka Seeds", date: "15 Jan" }
    ];

    const faqs = [
        { q: "How to place order?", a: "యాప్‌లో 'Order Now' క్లిక్ చేసి వివరాలు ఎంచుకోండి. (Select details and click Order Now in the app.)" },
        { q: "How to track order?", a: "మీ ఆర్డర్ స్థితిని 'My Orders' విభాగంలో చూడవచ్చు. (Check order status in My Orders section.)" },
        { q: "What if seed quality issue?", a: "వెంటనే ఫోటో తీసి ఇక్కడ complaint అందించండి. (Take a photo and raise a complaint here immediately.)" }
    ];

    return (
        <div className="min-h-screen bg-page pb-32 relative overflow-x-hidden">
            {/* 1. SUPPORT HEADER */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-dark shadow-sm border border-gray-100 active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-dark tracking-tight leading-tight">{t('support')} / సహాయం</h1>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mt-0.5">మీ సమస్యకు మేము సహాయం చేస్తాము</p>
                    </div>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <HelpCircle size={22} />
                </div>
            </div>

            <div className="px-6 py-6 space-y-8">

                {/* 2. QUICK HELP ACTIONS */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">{t('quickHelp')}</h3>
                        <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm animate-pulse">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t('available247')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white p-4 rounded-[28px] border border-gray-50 flex flex-col items-center gap-3 shadow-sm hover:border-primary/20 transition-all active:scale-[0.98]">
                            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <PhoneCall size={28} className="fill-white/10" />
                            </div>
                            <div className="space-y-0.5 text-center">
                                <h4 className="text-sm font-bold text-dark">{t('callUs')}</h4>
                                <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Instant Voice Help</p>
                            </div>
                        </button>
                        <button className="bg-white p-4 rounded-[28px] border border-gray-50 flex flex-col items-center gap-3 shadow-sm hover:border-primary/20 transition-all active:scale-[0.98]">
                            <div className="h-14 w-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                                <MessageCircle size={28} className="fill-white/10" />
                            </div>
                            <div className="space-y-0.5 text-center">
                                <h4 className="text-sm font-bold text-dark">{t('whatsapp')}</h4>
                                <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Fast Chat Help</p>
                            </div>
                        </button>
                    </div>

                    <button
                        onClick={() => setShowComplaintForm(!showComplaintForm)}
                        className={`w-full p-5 rounded-[32px] border transition-all duration-300 active:scale-[0.98] ${showComplaintForm ? 'bg-white border-primary text-primary shadow-xl shadow-primary/5' : 'bg-dark border-transparent text-white shadow-2xl shadow-black/20'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${showComplaintForm ? 'bg-primary text-white' : 'bg-white/10 text-white'}`}>
                                <AlertCircle size={24} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold uppercase tracking-widest">{t('raiseComplaint')}</h4>
                                <p className={`text-[10px] font-bold mt-0.5 ${showComplaintForm ? 'text-primary/60' : 'text-white/50'}`}>మీ సమస్యను ఇక్కడ తెలపండి</p>
                            </div>
                        </div>
                        <ChevronDown size={20} className={`transition-transform ${showComplaintForm ? 'rotate-180' : 'text-white/30'}`} />
                    </button>
                </div>

                {/* 3. RAISE NEW ISSUE / COMPLAINT FORM */}
                {showComplaintForm && (
                    <div className="bg-white rounded-[40px] border border-gray-100 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 space-y-6">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Issue Type</label>
                            <div className="flex flex-wrap gap-2">
                                {['Seed Quality', 'Delivery Delay', 'PL Size Issue', 'Payment', 'Other'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setIssueType(type)}
                                        className={`px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wide transition-all ${issueType === type
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                            : 'bg-gray-50 text-muted border border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Select Order</label>
                            <div className="space-y-2">
                                <select className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-4 text-sm font-bold text-dark appearance-none focus:border-primary outline-none transition-all">
                                    <option>Select Related Order</option>
                                    {recentOrders.map(o => (
                                        <option key={o.id}>{o.id} - {o.hatchery}</option>
                                    ))}
                                    <option>No related order</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Description (Optional)</label>
                            <textarea
                                placeholder="సమస్యను కొంచెం వివరించండి... (Tell us more about the issue)"
                                className="w-full rounded-3xl bg-gray-50 border border-gray-100 p-5 text-sm font-medium text-dark focus:border-primary outline-none transition-all min-h-[120px]"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center gap-3 text-blue-600 hover:bg-blue-100 active:scale-95 transition-all">
                                <ImageIcon size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">Image</span>
                            </button>
                            <button className="flex-1 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center gap-3 text-orange-600 hover:bg-orange-100 active:scale-95 transition-all">
                                <Video size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">Video</span>
                            </button>
                        </div>

                        <button className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-sm tracking-[0.2em] uppercase shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
                            Submit Issue
                        </button>
                    </div>
                )}

                {/* 5. MY SUPPORT TICKETS */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] px-1">My Support Requests</h3>
                    <div className="space-y-4">
                        {tickets.map((t) => (
                            <div key={t.id} className="bg-white/70 backdrop-blur-md rounded-[32px] border border-white p-6 shadow-sm shadow-black/5 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-xs font-bold text-dark">{t.id}</span>
                                            <div className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${t.statusColor}`}>
                                                {t.status}
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-dark tracking-tight">{t.type}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{t.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-muted uppercase leading-none">Assigned To</p>
                                            <p className="text-[11px] font-bold text-dark mt-0.5">{t.assigned}</p>
                                        </div>
                                    </div>
                                    <button className="h-9 px-4 rounded-xl bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-dark hover:bg-gray-100 active:scale-95 transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. HELP & FAQ SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] px-1">Help & FAQs</h3>
                    <div className="grid gap-4">
                        {faqs.map((f, i) => (
                            <button key={i} className="bg-white p-5 rounded-[28px] border border-gray-100 text-left group hover:border-primary/20 transition-all active:scale-[0.98]">
                                <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors">{f.q}</h4>
                                <p className="text-[11px] font-bold text-muted mt-2 leading-relaxed">{f.a}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 10. TRUST & SAFETY MESSAGE */}
                <div className="bg-gradient-to-br from-dark to-gray-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-primary">
                                <ShieldCheck size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Your Trust is Our Primary Priority</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Admin monitored orders and payments",
                                "Verified hatcheries with lab reports",
                                "Fair dispute resolution for every farmer"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span className="text-xs font-bold text-white/70">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                </div>

            </div>
        </div>
    );
}
