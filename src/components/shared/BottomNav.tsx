import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, User, HelpCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const { items } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const { t } = useTranslation();

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            {/* Home */}
            <Link href="/" className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${pathname === '/' ? 'text-primary scale-110' : 'text-gray-400 hover:text-primary'}`}>
                <div className={`p-1 rounded-xl ${pathname === '/' ? 'bg-primary/10' : ''}`}>
                    <Home size={22} strokeWidth={pathname === '/' ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('home')}</span>
            </Link>

            {/* Search */}
            <Link href="/search" className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${pathname === '/search' ? 'text-primary scale-110' : 'text-gray-400 hover:text-primary'}`}>
                <div className={`p-1 rounded-xl ${pathname === '/search' ? 'bg-primary/10' : ''}`}>
                    <Search size={22} strokeWidth={pathname === '/search' ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('search')}</span>
            </Link>

            {/* Support */}
            <Link href="/support" className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${pathname === '/support' ? 'text-primary scale-110' : 'text-gray-400 hover:text-primary'}`}>
                <div className={`p-1 rounded-xl ${pathname === '/support' ? 'bg-primary/10' : ''}`}>
                    <HelpCircle size={22} strokeWidth={pathname === '/support' ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('support')}</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${pathname === '/cart' ? 'text-primary scale-110' : 'text-gray-400 hover:text-primary'}`}>
                <div className={`relative p-1 rounded-xl ${pathname === '/cart' ? 'bg-primary/10' : ''}`}>
                    <ShoppingCart size={22} strokeWidth={pathname === '/cart' ? 2.5 : 2} />
                    {items.length > 0 && isMounted && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                            {items.length}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('cart')}</span>
            </Link>

            {/* Account */}
            <Link href="/profile" className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${pathname === '/profile' ? 'text-primary scale-110' : 'text-gray-400 hover:text-primary'}`}>
                <div className={`p-1 rounded-xl ${pathname === '/profile' ? 'bg-primary/10' : ''}`}>
                    <User size={22} strokeWidth={pathname === '/profile' ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('account')}</span>
            </Link>
        </nav>
    );
}
