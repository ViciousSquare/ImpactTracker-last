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
    <section className="bg-primary-500 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('hero.title')}</h2>
            <p className="text-primary-100 mb-4">{t('hero.subtitle')}</p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <span className="material-icons absolute left-3 top-3 text-neutral-500">search</span>
                <Input 
                  type="text" 
                  placeholder={t('hero.search')}
                  className="pl-10 pr-4 py-3 rounded-md w-full text-neutral-800 focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-[#FF7D00] hover:bg-[#E56F00] text-white font-medium py-3 px-6 rounded-md whitespace-nowrap">
                {t('hero.cta')}
              </Button>
            </form>
          </div>
          <div className="md:w-5/12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 flex justify-between">
              {loading ? (
                <>
                  <StatSkeleton />
                  <StatSkeleton />
                  <StatSkeleton />
                </>
              ) : (
                <>
                  <div className="text-center px-4">
                    <p className="text-2xl md:text-3xl font-bold font-serif mb-1">
                      {stats.organizationCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-primary-100">{t('hero.stats.organizations')}</p>
                  </div>
                  
                  <div className="text-center px-4">
                    <p className="text-2xl md:text-3xl font-bold font-serif mb-1">
                      {stats.programCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-primary-100">{t('hero.stats.programs')}</p>
                  </div>
                  
                  <div className="text-center px-4">
                    <p className="text-2xl md:text-3xl font-bold font-serif mb-1">
                      {formatImpactValue(stats.impactValue)}
                    </p>
                    <p className="text-xs text-primary-100">{t('hero.stats.impactValue')}</p>
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
  <div className="text-center px-4 flex-1">
    <Skeleton className="h-8 w-16 mb-1 mx-auto bg-white/20" />
    <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
  </div>
);

export default HeroSection;
