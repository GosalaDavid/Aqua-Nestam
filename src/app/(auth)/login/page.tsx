"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { loginUser } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await loginUser(formData);
            if (res.success) {
                setAuth(res, res.token);
                // Role based redirect
                if (res.role === 'farmer') router.push('/pond/dashboard');
                else if (res.role === 'hatchery') router.push('/hatchery/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-light">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-primary">Aqua Nestam</h1>
                    <p className="text-muted">Welcome back! Please login.</p>
                </div>

                <Card className="p-6 space-y-4 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Logging in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
