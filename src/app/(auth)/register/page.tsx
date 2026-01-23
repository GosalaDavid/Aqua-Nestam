"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { registerUser } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function RegisterPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer' // Default
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await registerUser(formData);
            if (res.success) {
                setAuth(res, res.token);
                // Redirect
                if (res.role === 'farmer') router.push('/pond/dashboard');
                else if (res.role === 'hatchery') router.push('/hatchery/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-light">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-primary">Create Account</h1>
                    <p className="text-muted">Join Aqua Nestam today.</p>
                </div>

                <Card className="p-6 space-y-4 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.role === 'farmer'
                                        ? 'border-primary bg-blue-50 text-primary'
                                        : 'border-gray-200 text-muted hover:border-blue-200'
                                    }`}
                                onClick={() => setFormData({ ...formData, role: 'farmer' })}
                            >
                                🐟 Pond Owner
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.role === 'hatchery'
                                        ? 'border-primary bg-blue-50 text-primary'
                                        : 'border-gray-200 text-muted hover:border-blue-200'
                                    }`}
                                onClick={() => setFormData({ ...formData, role: 'hatchery' })}
                            >
                                🏭 Hatchery Owner
                            </button>
                        </div>

                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Sign In
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
