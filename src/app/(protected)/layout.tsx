"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, token, logout } = useAuthStore();

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        if (user) {
            // Strict Role Check based on URL
            if (pathname.startsWith('/pond') && user.role !== 'farmer') {
                router.push('/hatchery/dashboard');
            } else if (pathname.startsWith('/hatchery') && user.role !== 'hatchery') {
                router.push('/pond/dashboard');
            }
        }
    }, [token, user, pathname, router]);

    if (!user || !token) return null;

    return (
        <div className="min-h-screen bg-page">
            {/* Simple Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-primary">Aqua Nestam</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium hidden md:block">
                            {user.name} ({user.role === 'farmer' ? 'Farmer' : 'Supplier'})
                        </span>
                        <button
                            onClick={() => { logout(); router.push('/login'); }}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
