"use client";

import { useState, useMemo } from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import ServicesTabs from '@/components/home/ServicesGrid';
import OngoingActivityCard from '@/components/home/OngoingActivityCard';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import TopRatedHatcheries from '@/components/home/TopRatedHatcheries';
import AllHatcheriesList from '@/components/home/AllHatcheriesList';
import BottomNav from '@/components/shared/BottomNav';
import { Search, SlidersHorizontal, X, MapPin, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const districts = [
  "All Districts",
  "Nellore",
  "Vijayawada",
  "Kakinada",
  "Guntur",
  "Visakhapatnam",
  "Bhimavaram",
  "Ongole"
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-page pb-20 relative font-sans">
      <HomeHeader />

      <main className="px-4 space-y-6">
        {/* Search Bar & Filter */}
        <div className="flex gap-2 sticky top-2 z-30 transition-all duration-300">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors z-10" size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-2xl bg-white/90 backdrop-blur-md pl-12 pr-4 text-sm font-bold text-dark shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted/60 transition-all relative z-0"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/50 active:scale-90 transition-all ${selectedDistrict !== "All Districts" ? 'bg-primary text-white' : 'bg-white/80 backdrop-blur-md text-dark'
              }`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Featured Carousel */}
        {!searchQuery && selectedDistrict === "All Districts" && <FeaturedCarousel />}

        {/* Services Tabs - Only show when not searching */}
        {!searchQuery && selectedDistrict === "All Districts" && <ServicesTabs />}

        {/* Content based on Search / Filter */}
        <div className="space-y-6">
          <TopRatedHatcheries />
          <AllHatcheriesList searchQuery={searchQuery} district={selectedDistrict} />
        </div>
      </main>

      {/* District Filter Modal / Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl p-6 overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-dark">Select District</h3>
                <p className="text-xs text-muted font-medium mt-0.5">Filter hatcheries by location</p>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-dark active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2 pb-24 scrollbar-hide">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => {
                    setSelectedDistrict(district);
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${selectedDistrict === district
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${selectedDistrict === district ? 'bg-primary text-white' : 'bg-white text-muted'
                      }`}>
                      <MapPin size={18} />
                    </div>
                    <span className={`font-bold ${selectedDistrict === district ? 'text-primary' : 'text-dark'}`}>
                      {district}
                    </span>
                  </div>
                  {selectedDistrict === district && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
