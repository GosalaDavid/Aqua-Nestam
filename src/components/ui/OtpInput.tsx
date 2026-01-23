import React, { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
    length?: number;
    onComplete: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 4, onComplete }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        // Trigger onComplete if all filled
        const otpString = newOtp.join('');
        if (otpString.length === length && newOtp.every(val => val !== '')) {
            onComplete(otpString);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(data)) return;

        const newOtp = [...otp];
        data.split('').forEach((char, index) => {
            if (index < length) newOtp[index] = char;
        });
        setOtp(newOtp);

        const otpString = newOtp.join('');
        if (otpString.length === length) {
            onComplete(otpString);
            inputRefs.current[length - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center my-6">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="•"
                />
            ))}
        </div>
    );
};
