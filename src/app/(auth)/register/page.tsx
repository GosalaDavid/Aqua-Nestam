"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { User, Phone, ArrowLeft, ShieldCheck, MapPin, Ruler } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pondLocation, setPondLocation] = useState('');
    const [pondSize, setPondSize] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
        setLoading(true);
        setError('');

        try {
            // Mocking OTP send
            setTimeout(() => {
                setStep('otp');
                setLoading(false);
            }, 1000);
        } catch (err: any) {
            setError('Failed to send OTP. Please try again.');
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Testing OTP: 1234
            if (otp === '1234') {
                const mockUser = {
                    _id: 'user_new',
                    name: name,
                    email: '', // Not required for phone login
                    role: 'farmer' as const
                };
                login('mock_token', mockUser);
                router.push('/');
            } else {
                throw new Error('Invalid OTP. Use 1234 for testing.');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Bar */}
            <div className="px-6 py-4 flex items-center justify-between">
                <button
                    onClick={() => step === 'otp' ? setStep('details') : router.back()}
                    className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gray-50 text-dark active:scale-95 transition-all"
                >
                    <ArrowLeft size={22} />
                </button>
                <div className="h-11 w-11" /> {/* Spacer */}
            </div>

            <div className={`flex-1 px-8 pt-6 pb-12 flex flex-col ${step === 'details' ? 'overflow-y-auto' : ''}`}>
                {/* Header Section */}
                <div className="mb-10">
                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                        {step === 'details' ? <User size={30} /> : <Phone size={30} />}
                    </div>
                    <h1 className="text-3xl font-bold text-dark tracking-tight leading-none mb-3">
                        {step === 'details' ? 'Join Us' : 'Enter OTP'}
                    </h1>
                    <p className="text-muted font-bold text-sm leading-relaxed max-w-[240px]">
                        {step === 'details'
                            ? 'Register as an Aqua Farmer to start growing better.'
                            : `We've sent a 4-digit code to +91 ${phone}`}
                    </p>
                </div>

                {/* Form Section */}
                <div className="space-y-8">
                    {error && (
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2">
                            <ShieldCheck size={18} className="flex-shrink-0" />
                            <p className="text-xs font-bold uppercase tracking-wide">{error}</p>
                        </div>
                    )}

                    {step === 'details' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full h-16 pl-12 pr-6 rounded-[22px] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white text-base font-bold outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-gray-200 pr-3">
                                        <span className="text-sm font-bold text-dark/40">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phone}
                                        maxLength={10}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                        required
                                        className="w-full h-16 pl-16 pr-6 rounded-[22px] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white text-base font-bold outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30">
                                        <MapPin size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Pond Location (e.g. Nellore)"
                                        value={pondLocation}
                                        onChange={(e) => setPondLocation(e.target.value)}
                                        className="w-full h-16 pl-12 pr-6 rounded-[22px] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white text-base font-bold outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30">
                                        <Ruler size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Pond Size (e.g. 5 Acres)"
                                        value={pondSize}
                                        onChange={(e) => setPondSize(e.target.value)}
                                        className="w-full h-16 pl-12 pr-6 rounded-[22px] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white text-base font-bold outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !name || phone.length < 10}
                                className="w-full h-16 bg-primary text-white rounded-[24px] font-bold text-sm tracking-[0.2em] uppercase shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Registering...' : 'Register as Farmer'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-10">
                            <div className="flex justify-between gap-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <input
                                        key={i}
                                        type="tel"
                                        maxLength={1}
                                        value={otp[i] || ''}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val.length <= 1) {
                                                const newOtp = otp.split('');
                                                newOtp[i] = val;
                                                setOtp(newOtp.join(''));
                                                if (val && i < 3) {
                                                    const next = e.target.nextElementSibling as HTMLInputElement;
                                                    next?.focus();
                                                }
                                            }
                                        }}
                                        className="w-full h-16 rounded-[22px] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white text-center text-2xl font-black outline-none transition-all"
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length < 4}
                                className="w-full h-16 bg-primary text-white rounded-[24px] font-black text-sm tracking-[0.2em] uppercase shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify & Complete'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="mt-10 pt-10 text-center border-t border-gray-50">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-widest">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-black hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
