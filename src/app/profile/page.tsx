"use client";

import { useAuthStore } from '@/store/authStore';
import {
    User,
    Settings,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Shield,
    Globe,
    FileText,
    MessageSquare,
    Waves,
    ShoppingBag,
    Users,
    Activity,
    ThermometerSun,
    Sprout,
    LifeBuoy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKeys } from '@/utils/translations';

export default function ProfilePage() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const menuGroups = [
        {
            title: t('pondManagement'),
            items: [
                {
                    icon: <Waves size={20} className="text-blue-500" />,
                    label: t('myPondDashboard'),
                    href: "/pond/dashboard",
                    bg: "bg-blue-50"
                },
                {
                    icon: <Activity size={20} className="text-rose-500" />,
                    label: t('waterSoilHealth'),
                    href: "/pond/health",
                    bg: "bg-rose-50",
                    value: t('checkReports')
                },
                {
                    icon: <ThermometerSun size={20} className="text-orange-500" />,
                    label: t('weatherAlerts'),
                    href: "/pond/weather",
                    bg: "bg-orange-50"
                },
            ]
        },
        {
            title: t('shoppingOrders'),
            items: [
                {
                    icon: <ShoppingBag size={20} className="text-emerald-500" />,
                    label: t('mySeedPurchases'),
                    href: "/orders",
                    bg: "bg-emerald-50"
                },
                {
                    icon: <Sprout size={20} className="text-lime-600" />,
                    label: t('browseTopHatcheries'),
                    href: "/",
                    bg: "bg-lime-50"
                },
            ]
        },
        {
            title: t('expertSupportTitle'),
            items: [
                {
                    icon: <LifeBuoy size={20} className="text-indigo-500" />,
                    label: t('askAquaExpert'),
                    href: "/support/expert",
                    bg: "bg-indigo-50",
                    value: t('priority247')
                },
                {
                    icon: <Users size={20} className="text-purple-500" />,
                    label: t('farmerCommunity'),
                    href: "/network",
                    bg: "bg-purple-50"
                },
            ]
        },
        {
            title: t('appSettings'),
            items: [
                {
                    icon: <Globe size={20} className="text-amber-500" />,
                    label: t('appLanguageAlt'),
                    href: "/settings/language",
                    bg: "bg-amber-50",
                    value: "తెలుగు / EN"
                },
                {
                    icon: <Shield size={20} className="text-cyan-500" />,
                    label: t('securityPrivacy'),
                    href: "/settings/security",
                    bg: "bg-cyan-50"
                },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-page pb-32 relative overflow-x-hidden">
            {/* Header / Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-primary/10 via-page to-page -z-10" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />

            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white shadow-xl shadow-black/5 active:scale-95 transition-all"
                >
                    <ChevronLeft size={22} className="text-dark" />
                </button>
                <h1 className="text-lg font-bold text-dark tracking-tight">{t('profileSettingsTitle')}</h1>
                <div className="w-11" /> {/* Spacer */}
            </div>

            {/* Profile Info Card */}
            <div className="px-6 mt-4 mb-8 flex flex-col items-center">
                <div className="relative group">
                    <div className="h-28 w-28 rounded-[40px] bg-white p-1.5 shadow-2xl relative z-10">
                        <div className="h-full w-full rounded-[34px] bg-gradient-to-br from-primary via-primary to-orange-400 flex items-center justify-center text-white overflow-hidden shadow-inner">
                            {user ? (
                                <span className="text-4xl font-bold">
                                    {user.name?.charAt(0)}
                                </span>
                            ) : (
                                <User size={40} className="text-white/50" />
                            )}
                        </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary border-4 border-page group-hover:scale-110 transition-transform cursor-pointer z-20">
                        <Settings size={18} />
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-bold text-dark tracking-tight leading-none">
                        {user?.name || t('guestFarmer')}
                    </h2>
                    <p className="text-muted text-sm font-medium mt-2">{user?.email || t('joinCommunity')}</p>
                    <div className="mt-3 inline-flex px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                            {t('aquaFarmer')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Invite Promotion Card - Adapted from reference */}
            <div className="px-6 mb-8">
                <div className="relative h-24 w-full bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-[32px] overflow-hidden group shadow-xl shadow-purple-500/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 flex items-center justify-between h-full px-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white leading-tight">{t('referFarmer')}</h3>
                                <p className="text-[10px] font-medium text-white/70 mt-0.5">{t('inviteOthers')}</p>
                            </div>
                        </div>
                        <button className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all border border-white/10">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
                </div>
            </div>

            {/* Menu Sections */}
            <div className="px-6 space-y-10">
                {menuGroups.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                            {group.title}
                            <div className="h-px flex-1 bg-gray-100" />
                        </h3>

                        <div className="bg-white/60 backdrop-blur-md border border-white rounded-[32px] overflow-hidden shadow-sm shadow-black/5">
                            {group.items.map((item, itemIdx) => (
                                <Link
                                    key={itemIdx}
                                    href={item.href}
                                    className={`group flex items-center justify-between p-4.5 hover:bg-white/80 transition-all ${itemIdx !== group.items.length - 1 ? 'border-b border-gray-50' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`h-11 w-11 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-dark tracking-tight">{item.label}</h4>
                                            {item.value && (
                                                <p className="text-[10px] font-bold text-primary mt-0.5 uppercase tracking-wide">
                                                    {item.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-hover:text-dark group-hover:bg-white group-hover:shadow-md transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Login/Logout Button */}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="w-full h-16 rounded-[28px] bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase shadow-sm shadow-rose-200/50 active:scale-[0.98] active:bg-rose-100 transition-all mb-10"
                    >
                        <LogOut size={20} />
                        {t('logOutAccount')}
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="w-full h-16 rounded-[28px] bg-primary text-white flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase shadow-xl shadow-primary/20 active:scale-[0.98] transition-all mb-10"
                    >
                        <LogOut size={20} className="rotate-180" />
                        {t('loginJoinNow')}
                    </Link>
                )}
            </div>
        </div>
    );
}
