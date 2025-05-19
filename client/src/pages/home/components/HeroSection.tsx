import { useLanguage } from '@/contexts/LanguageContext';
import { PlatformStatistics } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroSectionProps {
  stats: PlatformStatistics;
  loading: boolean;
}

const HeroSection = ({ stats, loading }: HeroSectionProps) => {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/solution-finder?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Format the impact value as currency
  const formatImpactValue = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <section className="relative overflow-hidden text-white py-12 md:py-16">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 z-0"></div>
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDBoLTZ2Nmg2di02eiIvPjwvZz48L2c+PC9zdmc+Cg==')]
        opacity-20 z-0"></div>
      
      {/* Warm decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <span className="text-xs font-medium text-white">{t('common.preview')} • Basic Impacts Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-white to-amber-100 bg-clip-text text-transparent">
              {t('hero.title')}
            </h2>
            <p className="text-amber-100 text-lg mb-6 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <span className="material-icons absolute left-3 top-3 text-neutral-500">search</span>
                <Input 
                  type="text" 
                  placeholder={t('hero.search')}
                  className="pl-10 pr-4 py-3 rounded-xl w-full text-neutral-800 focus:ring-2 focus:ring-amber-300 border-0 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="btn-gradient btn-gradient-secondary rounded-xl px-6 py-3 font-medium text-base"
              >
                {t('hero.cta')}
              </Button>
            </form>
            <div className="flex gap-3 mt-3">
              <span className="text-white/70 text-xs flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 inline-block mr-1"></span>
                Trusted by 2400+ organizations
              </span>
              <span className="text-white/70 text-xs flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-300 inline-block mr-1"></span>
                100% transparent
              </span>
            </div>
          </div>
          
          <div className="md:w-5/12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-6 px-4 sm:px-6 flex justify-between shadow-lg">
              {loading ? (
                <>
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                </>
              ) : (
                <>
                  <div className="text-center px-1 sm:px-3">
                    <div className="bg-amber-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-100 material-icons">business</span>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                      {stats.organizationCount.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white/80">{t('hero.stats.organizations')}</p>
                  </div>
                  
                  <div className="text-center px-1 sm:px-3">
                    <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-orange-100 material-icons">dashboard</span>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                      {stats.programCount.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white/80">{t('hero.stats.programs')}</p>
                  </div>
                  
                  <div className="text-center px-1 sm:px-3">
                    <div className="bg-teal-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-teal-100 material-icons">attach_money</span>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent whitespace-nowrap">
                      {formatImpactValue(stats.impactValue)}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white/80">{t('hero.stats.impactValue')}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatSkeleton = () => (
  <div className="text-center px-1 sm:px-2 flex-1">
    <Skeleton className="h-7 w-16 sm:w-20 mb-1 mx-auto bg-white/40" />
    <Skeleton className="h-3 w-16 sm:w-20 mx-auto bg-white/30" />
  </div>
);

export default HeroSection;
