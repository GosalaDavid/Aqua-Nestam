"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { language } = useSettingsStore();
    const { token } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // Skip guard for onboarding and auth routes themselves to avoid loops
        if (
            pathname.startsWith('/onboarding') ||
            pathname === '/login' ||
            pathname === '/register'
        ) {
            return;
        }

        // 1. Check Language
        if (!language) {
            router.replace('/onboarding/language');
            return;
        }

        // 2. Check Auth
        if (!token) {
            router.replace('/login');
            return;
        }
    }, [isMounted, language, token, pathname, router]);

    // During hydration or initial redirect, show nothing or a loader
    if (!isMounted) return null;

    return <>{children}</>;
}