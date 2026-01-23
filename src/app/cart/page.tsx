"use client";

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Trash2, ChevronLeft, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export default function CartPage() {
    const { items, removeItem, clearCart } = useCartStore();
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-page pb-32">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg px-4 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-dark active:scale-95 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="font-bold text-dark text-xl tracking-tight">{t('yourCart')}</h1>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-xs font-bold text-error bg-error/5 px-3 py-1.5 rounded-full"
                    >
                        {t('clearAll')}
                    </button>
                )}
            </div>

            <div className="px-4 py-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="h-24 w-24 rounded-[40px] bg-white shadow-xl flex items-center justify-center text-gray-200">
                            <ShoppingCart size={40} />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-dark">{t('cartEmpty')}</h2>
                            <p className="text-sm text-muted font-medium">{t('cartEmptyDesc')}</p>
                        </div>
                        <Link
                            href="/"
                            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all"
                        >
                            {t('exploreHatcheries')}
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-muted uppercase tracking-widest px-1">
                            {items.length} {items.length === 1 ? t('hatcherySaved') : t('hatcheriesSaved')}
                        </p>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white/70 backdrop-blur-md border border-white/60 p-4 rounded-[32px] shadow-sm hover:shadow-md transition-all flex items-center gap-4 relative overflow-hidden"
                            >
                                {/* Mini Image Icon */}
                                <div className="h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl shadow-inner">
                                    {item.image}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <h3 className="font-black text-dark leading-tight">{item.name}</h3>
                                    <div className="flex items-center gap-1.5 text-muted">
                                        <MapPin size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-wide">{item.location}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-primary flex items-center gap-1">
                                        {item.specialty}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 relative z-10">
                                    <Link
                                        href={`/hatchery/${item.id}`}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-90 transition-all"
                                    >
                                        <ArrowRight size={18} />
                                    </Link>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-error border border-error/10 shadow-sm active:scale-90 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Subtle decorative gradient */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl -mr-10 -mt-10 opacity-50" />
                            </div>
                        ))}

                        {/* Order Summary / Quick Action */}
                        <div className="mt-8 p-6 bg-dark text-white rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold tracking-tight">{t('readyToOrder')}</h4>
                                        <p className="text-xs font-medium text-white/60">{t('contactDirectly')}</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                                        <ExternalLink size={20} />
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-white text-dark py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-gray-100 active:scale-[0.98] transition-all shadow-xl"
                                >
                                    {t('proceedBulkQuote')}
                                </button>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl transition-transform group-hover:scale-125 duration-1000" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
