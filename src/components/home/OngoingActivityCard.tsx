import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function OngoingActivityCard() {
    const { t } = useTranslation();
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-orange-400 p-4 text-white shadow-lg shadow-orange-200">
            {/* Background Patterns */}
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-8 translate-y-8 rounded-full bg-white/10 blur-lg"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full border-2 border-white/30 bg-white/20 flex items-center justify-center backdrop-blur-md">
                            <div className="h-7 w-7 rounded-full bg-white/90">
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-base">David Michel</h2>
                            <p className="text-[10px] text-orange-50 font-medium">✨ {t('professionalFarmer')}</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="block font-bold text-lg">₹349<span className="text-xs font-normal text-orange-100">/hr</span></span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium text-orange-50">
                        <span>{t('taskProgress')}</span>
                        <span>75% {t('almostDone')}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                        <div className="h-full w-3/4 rounded-full bg-white"></div>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
                        <CheckCircle2 size={12} />
                        <span>{t('verified')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
