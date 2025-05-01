import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { 
  LeaderboardItem, 
  TrendingItem, 
  SECTOR_OPTIONS, 
  REGION_OPTIONS, 
  SDG_OPTIONS 
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
  const [sector, setSector] = useState('all');
  const [region, setRegion] = useState('all');
  const [sdg, setSdg] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch trending items
  const { data: trendingItems, isLoading: trendingLoading } = useQuery<TrendingItem[]>({
    queryKey: ['/api/trending'],
  });

  // Fetch leaderboard data with filters
  const { data: leaderboardData, isLoading: leaderboardLoading } = useQuery<{
    items: LeaderboardItem[];
    total: number;
  }>({
    queryKey: ['/api/leaderboard', sector, region, sdg, currentPage],
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 h-auto w-auto">
                <SelectValue placeholder={t('leaderboard.allSectors')} />
              </SelectTrigger>
              <SelectContent>
                {SECTOR_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
        
        {/* Leaderboard table */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.rank')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.organization')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <span>{t('leaderboard.table.impactIQ')}</span>
                      <span className="material-icons ml-1 text-neutral-500 cursor-pointer">unfold_more</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <span>{t('leaderboard.table.socialROI')}</span>
                      <span className="material-icons ml-1 text-neutral-500 cursor-pointer">unfold_more</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.sector')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.region')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.grade')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                    {t('leaderboard.table.verification')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {leaderboardLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="table-row-hover">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-4" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="ml-3">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20 mt-1" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-3 w-16 mt-1" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-6 w-8 rounded-full" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-20" />
                      </td>
                    </tr>
                  ))
                ) : leaderboardData && leaderboardData.items.length > 0 ? (
                  leaderboardData.items.map((item) => {
                    const verificationDetails = getVerificationDetails(item.verificationType);
                    
                    return (
                      <tr key={item.id} className="table-row-hover">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {item.rank}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div 
                            className="flex items-center cursor-pointer"
                            onClick={() => window.location.href = `/organization/${item.id}`}
                          >
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                              <span className="material-icons">
                                {item.sector === 'Food Security' ? 'volunteer_activism' : 
                                 item.sector === 'Housing' ? 'house' :
                                 item.sector === 'Education' ? 'school' :
                                 item.sector === 'Environment' ? 'eco' :
                                 'healing'}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-neutral-900">{item.name}</div>
                              <div className="text-xs text-neutral-500">{item.sector}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-900">{item.impactScore}</div>
                          <div className={`text-xs ${item.yearlyChange >= 0 ? 'text-success' : 'text-error'}`}>
                            {item.yearlyChange > 0 ? '+' : ''}{item.yearlyChange}% {t('common.fromLastYear')}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900">
                          ${item.socialROI.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900">
                          {item.sector}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900">
                          {item.region}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <BadgeWithIcon 
                            text={item.impactGrade} 
                            variant="success"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900">
                          <div className={`flex items-center ${verificationDetails.className}`}>
                            <span className="material-icons text-sm mr-1">{verificationDetails.icon}</span>
                            {verificationDetails.text}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-neutral-500">
                      No organizations found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
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
          
          {/* Pagination */}
          {leaderboardData && leaderboardData.total > 0 && (
            <div className="bg-neutral-50 px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  {t('leaderboard.pagination.previous')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * 5 >= leaderboardData.total}
                >
                  {t('leaderboard.pagination.next')}
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-700">
                    {t('leaderboard.pagination.showing')} <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> {t('leaderboard.pagination.to')} <span className="font-medium">{Math.min(currentPage * 5, leaderboardData.total)}</span> {t('leaderboard.pagination.of')} <span className="font-medium">{leaderboardData.total}</span> {t('leaderboard.pagination.results')}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 text-sm font-medium"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">{t('leaderboard.pagination.previous')}</span>
                      <span className="material-icons text-sm">chevron_left</span>
                    </Button>
                    
                    {/* Page buttons */}
                    {Array.from({ length: Math.min(5, Math.ceil(leaderboardData.total / 5)) }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page 
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' 
                            : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    {/* Conditional ellipsis */}
                    {Math.ceil(leaderboardData.total / 5) > 5 && (
                      <span className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700">
                        ...
                      </span>
                    )}
                    
                    {/* Last page button */}
                    {Math.ceil(leaderboardData.total / 5) > 5 && (
                      <Button
                        variant={currentPage === Math.ceil(leaderboardData.total / 5) ? "default" : "outline"}
                        size="sm"
                        className="bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        onClick={() => handlePageChange(Math.ceil(leaderboardData.total / 5))}
                      >
                        {Math.ceil(leaderboardData.total / 5)}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 text-sm font-medium"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage * 5 >= leaderboardData.total}
                    >
                      <span className="sr-only">{t('leaderboard.pagination.next')}</span>
                      <span className="material-icons text-sm">chevron_right</span>
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* View more link */}
        <div className="mt-6 text-center">
          <div 
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
            onClick={() => window.location.href = "/leaderboard"}
          >
            View full leaderboard
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
