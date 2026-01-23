"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (token && user) {
      if (user.role === 'farmer') router.push('/pond/dashboard');
      else if (user.role === 'hatchery') router.push('/hatchery/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, token, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <div className="animate-pulse text-white text-2xl font-bold">
        Aqua Nestam...
      </div>
    </div>
  );
}
