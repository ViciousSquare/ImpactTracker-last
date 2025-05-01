import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { 
  LeaderboardItem, 
  TrendingItem, 
  SECTOR_OPTIONS, 
  REGION_OPTIONS, 
  SDG_OPTIONS,
  Sector,
  ImpactGrade
} from '@/lib/types';
import TrendingTicker from '@/components/ui/trending-ticker';
import BadgeWithIcon from '@/components/ui/badge-with-icon';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { ChevronRight } from 'lucide-react';

const LeaderboardSection = () => {
  const { t } = useLanguage();
  const [region, setRegion] = useState('all');
  const [sdg, setSdg] = useState('all');
  
  // Carousel ref for manual scrolling
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch trending items
  const { data: trendingItems, isLoading: trendingLoading } = useQuery<TrendingItem[]>({
    queryKey: ['/api/trending'],
  });

  // Fetch leaderboard data with filters
  const { data: leaderboardData, isLoading: leaderboardLoading } = useQuery<{
    items: LeaderboardItem[];
    total: number;
  }>({
    queryKey: ['/api/leaderboard', 'all', region, sdg, 1],
  });

  // Generate additional test data for demonstration purposes
  const generateMockOrganizationsForSectors = () => {
    if (!leaderboardData || !leaderboardData.items) return {};
    
    const sectorData: Record<string, LeaderboardItem[]> = {};
    
    // Group existing items by sector
    leaderboardData.items.forEach(item => {
      if (!sectorData[item.sector]) {
        sectorData[item.sector] = [];
      }
      sectorData[item.sector].push(item);
    });
    
    // Make sure each sector has at least 5 items by creating variations of existing items
    SECTOR_OPTIONS.filter(s => s.value !== 'all').forEach(sectorOption => {
      const sector = sectorOption.value as Sector; // Type assertion to Sector
      if (!sectorData[sector] || sectorData[sector].length < 5) {
        // Use items from other sectors if this sector has no items
        const sourceItems = sectorData[sector] || leaderboardData.items;
        const neededItems = 5 - (sectorData[sector]?.length || 0);
        
        if (!sectorData[sector]) {
          sectorData[sector] = [];
        }
        
        for (let i = 0; i < neededItems; i++) {
          const baseItem = sourceItems[i % sourceItems.length];
          if (baseItem) {
            // Get valid ImpactGrade and ensure type safety
            const gradeOptions: ImpactGrade[] = ['A+', 'A', 'A-', 'B+', 'B'];
            const randomGrade = gradeOptions[Math.floor(Math.random() * gradeOptions.length)];
            
            sectorData[sector].push({
              ...baseItem,
              id: baseItem.id + 1000 + i, // Create a unique ID
              name: `${sector} Organization ${i+1}`,
              sector: sector,
              impactScore: Math.floor(70 + Math.random() * 30),
              impactGrade: randomGrade,
              yearlyChange: Math.floor(Math.random() * 20) - 5,
            });
          }
        }
      }
    });
    
    return sectorData;
  };
  
  const sectorData = generateMockOrganizationsForSectors();

  // Define verification type icon and text
  const getVerificationDetails = (type: string) => {
    switch (type) {
      case 'audited':
        return { icon: 'verified', text: t('verification.audited'), className: 'text-info' };
      case 'verified':
        return { icon: 'fact_check', text: t('verification.verified'), className: 'text-neutral-500' };
      default:
        return { icon: 'description', text: t('verification.selfReported'), className: 'text-neutral-500' };
    }
  };
  
  // Add horizontal scrolling with mouse drag
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      carousel.classList.add('cursor-grabbing');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };
    
    const handleMouseLeave = () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
    };
    
    const handleMouseUp = () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    };
    
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t('leaderboard.title')}</h2>
            <p className="text-neutral-600">{t('leaderboard.subtitle')}</p>
          </div>
          
          {/* Filter controls */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 h-auto w-auto">
                <SelectValue placeholder={t('leaderboard.allRegions')} />
              </SelectTrigger>
              <SelectContent>
                {REGION_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sdg} onValueChange={setSdg}>
              <SelectTrigger className="bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 h-auto w-auto">
                <SelectValue placeholder={t('leaderboard.allSDGs')} />
              </SelectTrigger>
              <SelectContent>
                {SDG_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Trending tickers */}
        {trendingLoading ? (
          <div className="mb-6 bg-neutral-900 text-white rounded-md p-4 h-10">
            <Skeleton className="h-4 w-full bg-white/20" />
          </div>
        ) : trendingItems && trendingItems.length > 0 ? (
          <TrendingTicker items={trendingItems} />
        ) : (
          <div className="mb-6 bg-neutral-900 text-white rounded-md p-4 text-center">
            No trending data available
          </div>
        )}
        
        {/* Sector-based horizontal scrolling leaderboards */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          
          {/* Sector Lists - Horizontal Scrolling */}
          <div className="py-6 border-t border-neutral-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{t('leaderboard.bySector')}</h3>
                <p className="text-sm text-neutral-600">{t('leaderboard.exploreBySector')}</p>
              </div>
              <Link 
                href="/leaderboard" 
                className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
              >
                {t('leaderboard.viewAll')}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <div className="flex space-x-2 mb-4">
                <CarouselPrevious className="relative static left-0 right-auto top-0 -translate-y-0 translate-x-0 border-neutral-200" />
                <CarouselNext className="relative static right-0 left-auto top-0 -translate-y-0 translate-x-0 border-neutral-200" />
              </div>
              
              <CarouselContent>
                {SECTOR_OPTIONS.filter(s => s.value !== 'all').map((sectorOption) => (
                  <CarouselItem key={sectorOption.value} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden h-full flex flex-col">
                      {/* Sector Header */}
                      <div className="bg-primary-50 p-4 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 rounded-md p-2">
                              <span className="material-icons text-primary-600">
                                {sectorOption.value === 'Food Security' ? 'volunteer_activism' : 
                                sectorOption.value === 'Housing' ? 'house' :
                                sectorOption.value === 'Education' ? 'school' :
                                sectorOption.value === 'Environment' ? 'eco' :
                                sectorOption.value === 'Economic Development' ? 'trending_up' :
                                sectorOption.value === 'Social Services' ? 'support' :
                                sectorOption.value === 'Arts & Culture' ? 'palette' :
                                'healing'}
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-neutral-900">{sectorOption.label}</h3>
                          </div>
                          <Link 
                            href={`/leaderboard?sector=${encodeURIComponent(sectorOption.value)}`}
                            className="text-primary-500 hover:text-primary-600"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Vertical List of Organizations */}
                      {leaderboardData ? (
                        <div className="overflow-hidden">
                          <table className="min-w-full divide-y divide-neutral-200">
                            <thead className="bg-neutral-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                  {t('leaderboard.table.rank')}
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                  {t('leaderboard.table.organization')}
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                  {t('leaderboard.table.impactIQ')}
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                  {t('leaderboard.table.grade')}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                              {leaderboardData.items
                                .filter(item => item.sector === sectorOption.value)
                                .slice(0, 5)
                                .map((item) => (
                                  <tr key={item.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                                      {item.rank}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <Link 
                                        href={`/organization/${item.id}`} 
                                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                      >
                                        {item.name}
                                      </Link>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <div className="text-sm font-medium text-neutral-900">
                                        {item.impactScore}
                                        {item.yearlyChange !== 0 && (
                                          <span className={`ml-1 text-xs ${item.yearlyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.yearlyChange > 0 ? '▲' : '▼'}{Math.abs(item.yearlyChange)}%
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <BadgeWithIcon 
                                        text={item.impactGrade} 
                                        variant="success"
                                      />
                                    </td>
                                  </tr>
                                ))
                              }
                              {/* No results message */}
                              {leaderboardData.items.filter(item => item.sector === sectorOption.value).length === 0 && (
                                <tr>
                                  <td colSpan={4} className="px-4 py-4 text-center text-neutral-500">
                                    No organizations in this sector.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // Loading state
                        <div className="p-4">
                          {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="mb-3 flex items-center">
                              <Skeleton className="h-4 w-6 mr-2" />
                              <Skeleton className="h-4 flex-1" />
                              <Skeleton className="h-4 w-12 ml-2" />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* View More Link */}
                      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 mt-auto">
                        <Link 
                          href={`/leaderboard?sector=${encodeURIComponent(sectorOption.value)}`} 
                          className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center justify-center w-full"
                        >
                          <span>{t('leaderboard.seeMoreInSector')}</span>
                          <span className="material-icons text-sm ml-1">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          
          {/* No pagination needed as we're showing all sectors in horizontal scroll */}
        </div>
        
        {/* View more link */}
        <div className="mt-6 text-center">
          <Link 
            href="/leaderboard"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
          >
            View full leaderboard
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
