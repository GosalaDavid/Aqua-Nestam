import { ReactNode } from 'react';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl border border-gray-100 bg-white text-card-foreground shadow-sm ${className}`}>
            {children}
        </div>
    );
}
