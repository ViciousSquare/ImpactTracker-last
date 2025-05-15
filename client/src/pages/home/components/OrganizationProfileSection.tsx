import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { OrganizationProfile } from '@/lib/types';
import BadgeWithIcon from '@/components/ui/badge-with-icon';
import ProgressWithLabel from '@/components/ui/progress-with-label';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useMemo, useRef, useEffect } from 'react';
import { MetricTooltip } from '@/components/ui/metric-tooltip';

const OrganizationProfileSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { data: organizations, isLoading } = useQuery<OrganizationProfile[]>({
    queryKey: ['/api/organizations/featured'],
  });
  
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
      if (carousel) {
        carousel.removeEventListener('mousedown', handleMouseDown);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        carousel.removeEventListener('mouseup', handleMouseUp);
        carousel.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Determine which organization to display
  const organization = useMemo(() => {
    if (!organizations || organizations.length === 0) return undefined;
    
    // If we have a selected org ID, find that org
    if (selectedOrgId) {
      const selected = organizations.find(org => org.id === selectedOrgId);
      if (selected) return selected;
    }
    
    // Default to the first one
    return organizations[0];
  }, [organizations, selectedOrgId]);

  const getVerificationBadge = (type: string) => {
    switch (type) {
      case 'audited':
        return { text: t('verification.audited'), icon: 'verified', className: 'text-info' };
      case 'verified':
        return { text: t('verification.verified'), icon: 'fact_check', className: 'text-neutral-500' };
      default:
        return { text: t('verification.selfReported'), icon: 'description', className: 'text-neutral-500' };
    }
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'Food Security':
        return 'volunteer_activism';
      case 'Housing':
        return 'house';
      case 'Education':
        return 'school';
      case 'Environment':
        return 'eco';
      case 'Health & Wellbeing':
      case 'Health':
        return 'healing';
      default:
        return 'category';
    }
  };

  // Placeholder for the chart that would use D3.js or Recharts in the real implementation
  const ChartPlaceholder = () => (
    <div className="w-full h-full bg-white rounded border border-neutral-200 p-2 flex items-center justify-center">
      <div className="text-center">
        <div className="text-neutral-400 material-icons text-4xl">insert_chart</div>
        <p className="text-xs text-neutral-500 mt-2">Impact IQ Score Trend (2019-2023)</p>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50/60 via-white to-teal-50/60 border-t border-b border-amber-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-100/60 mb-3">
              <span className="text-xs font-medium text-amber-800">Featured Organizations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading gradient-heading-primary mb-2">{t('org.featuredTitle')}</h2>
            <p className="text-neutral-600 text-lg max-w-xl">{t('org.featuredSubtitle')}</p>
          </div>
          
          <Link href="/organizations">
            <div className="mt-4 md:mt-0 inline-flex items-center bg-white hover:bg-amber-50 text-amber-700 font-medium px-5 py-2 rounded-full shadow-sm border border-amber-200 cursor-pointer transition-all duration-300">
              {t('org.viewAll')}
              <span className="material-icons ml-1 text-sm">arrow_forward</span>
            </div>
          </Link>
        </div>
        
        {/* Organization Selection Carousel */}
        {!isLoading && organizations && organizations.length > 1 && (
          <div className="mb-6 overflow-x-auto scrollbar-hide cursor-grab" ref={carouselRef} style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {organizations.map((org, index) => (
                <div 
                  key={org.id}
                  className={`flex-none cursor-pointer transition-all duration-300 rounded-lg p-4 border-2 ${
                    organization?.id === org.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-transparent hover:bg-neutral-50'
                  }`}
                  onClick={() => {
                    setSelectedOrgId(org.id);
                  }}
                  style={{ width: '200px' }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-md w-10 h-10 flex items-center justify-center">
                      <span className="material-icons text-primary-500">
                        {getSectorIcon(org.sector)}
                      </span>
                    </div>
                    <div className="ml-3 truncate">
                      <div className="font-medium text-sm text-neutral-900 truncate">{org.name}</div>
                      <div className="text-xs text-neutral-500 truncate">{org.sector}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          {isLoading ? (
            <OrganizationProfileSkeleton />
          ) : organization ? (
            <>
              {/* Organization header */}
              <div className="relative">
                <div className="bg-primary-600 h-16 md:h-24"></div>
                <div className="absolute top-2 right-2">
                  {organization.verificationType && (
                    <MetricTooltip metric="verificationType">
                      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-md px-3 py-1 text-xs font-medium text-primary-500 flex items-center">
                        <span className="material-icons text-sm mr-1">
                          {getVerificationBadge(organization.verificationType).icon}
                        </span>
                        {getVerificationBadge(organization.verificationType).text}
                      </div>
                    </MetricTooltip>
                  )}
                </div>
                <div className="px-4 sm:px-6 pb-4 relative -mt-12 flex flex-col md:flex-row">
                  <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
                    <div className="h-24 w-24 bg-primary-100 rounded-md flex items-center justify-center">
                      <span className="material-icons text-primary-500 text-4xl">
                        {getSectorIcon(organization.sector)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 md:pt-12 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900">{organization.name}</h3>
                        <p className="text-neutral-600 text-sm">
                          {organization.sector} | {organization.region} {organization.established ? `| Est. ${organization.established}` : ''}
                        </p>
                      </div>
                      
                      <div className="flex items-center mt-2 md:mt-0">
                        <MetricTooltip metric="impactScore">
                          <span className="text-2xl font-serif font-bold text-neutral-900">{organization.impactScore}</span>
                          <span className="ml-2 text-xs text-neutral-700 leading-tight">
                            Impact IQ<br />Score
                          </span>
                        </MetricTooltip>
                        <MetricTooltip metric="impactGrade" className="ml-3">
                          <BadgeWithIcon
                            text={organization.impactGrade}
                            variant="success"
                          />
                        </MetricTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Organization tabs */}
              <div className="border-t border-neutral-200">
                <div className="px-4 sm:px-6">
                  <nav className="flex -mb-px">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`whitespace-nowrap py-4 px-1 font-medium text-sm mr-8 border-b-2 ${
                        activeTab === 'overview'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {t('org.tabs.overview')}
                    </button>
                    <button 
                      onClick={() => setActiveTab('impactMetrics')}
                      className={`whitespace-nowrap py-4 px-1 font-medium text-sm mr-8 border-b-2 ${
                        activeTab === 'impactMetrics'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {t('org.tabs.impactMetrics')}
                    </button>
                    <button 
                      onClick={() => setActiveTab('programs')}
                      className={`whitespace-nowrap py-4 px-1 font-medium text-sm mr-8 border-b-2 ${
                        activeTab === 'programs'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {t('org.tabs.programs')}
                    </button>
                    <button 
                      onClick={() => setActiveTab('reports')}
                      className={`whitespace-nowrap py-4 px-1 font-medium text-sm border-b-2 ${
                        activeTab === 'reports'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {t('org.tabs.reports')}
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Organization content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - description */}
                  <div className="md:col-span-1">
                    <div className="mb-6">
                      <h4 className="font-medium text-neutral-900 mb-2">{t('org.mission')}</h4>
                      <p className="text-sm text-neutral-700">
                        {organization.mission}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-neutral-900 mb-2">{t('org.sdgAlignment')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {organization.sdgAlignment.map((sdg, index) => (
                          <BadgeWithIcon
                            key={index}
                            text={sdg}
                            className="bg-primary-100 text-primary-800"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">{t('org.keyStats')}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.peopleReached')}</span>
                          <span className="font-medium text-neutral-900">{organization.stats.peopleReached}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <MetricTooltip metric="socialROI">
                            <span className="text-neutral-600">{t('org.stats.socialROI')}</span>
                          </MetricTooltip>
                          <span className="font-medium text-neutral-900">${organization.stats.socialROI} per $1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.programs')}</span>
                          <span className="font-medium text-neutral-900">{organization.stats.programs} nationwide</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.funding')}</span>
                          <span className="font-medium text-neutral-900">{organization.stats.funding} (2023)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.programAllocation')}</span>
                          <span className="font-medium text-neutral-900">{organization.stats.programAllocation}% of funds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right columns - metrics */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Impact IQ Breakdown */}
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <h4 className="font-medium text-neutral-900 mb-3">
                          <MetricTooltip metric="impactBreakdown">{t('org.impactBreakdown')}</MetricTooltip>
                        </h4>
                        <div className="space-y-3">
                          <ProgressWithLabel
                            label={t('org.metrics.reportingQuality')}
                            value={organization.metrics.reportingQuality}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.reach')}
                            value={organization.metrics.reach}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.socialROI')}
                            value={organization.metrics.socialROI}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.outcomeEffectiveness')}
                            value={organization.metrics.outcomeEffectiveness}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.transparencyGovernance')}
                            value={organization.metrics.transparencyGovernance}
                            max={20}
                          />
                        </div>
                      </div>
                      
                      {/* Annual Impact Trend */}
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <h4 className="font-medium text-neutral-900 mb-3">{t('org.annualTrend')}</h4>
                        <div className="h-48 flex items-center justify-center">
                          <ChartPlaceholder />
                        </div>
                      </div>
                      
                      {/* Top Programs */}
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 md:col-span-2">
                        <h4 className="font-medium text-neutral-900 mb-3">{t('org.topPrograms')}</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-neutral-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-700">Program</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-700">{t('org.program.peopleReached')}</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-700">{t('org.program.socialROI')}</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-700">{t('org.program.score')}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 bg-white">
                              {organization.topPrograms.map((program, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 text-sm text-neutral-900">{program.name}</td>
                                  <td className="px-3 py-2 text-sm text-neutral-900">{program.peopleReached.toLocaleString()}</td>
                                  <td className="px-3 py-2 text-sm text-neutral-900">
                                    <MetricTooltip metric="socialROI">
                                      ${program.socialROI.toFixed(2)}
                                    </MetricTooltip>
                                  </td>
                                  <td className="px-3 py-2">
                                    <MetricTooltip metric="impactGrade">
                                      <BadgeWithIcon 
                                        text={program.impactGrade}
                                        variant="success"
                                      />
                                    </MetricTooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 text-center">
                          <span 
                            className="text-sm text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
                            onClick={() => window.location.href = `/organization/${organization.id}/programs`}
                          >
                            {t('org.viewAllPrograms').replace('{count}', organization.stats.programs.toString())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-neutral-500">
              No featured organization data available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const OrganizationProfileSkeleton = () => (
  <>
    <div className="relative">
      <div className="bg-primary-600 h-16 md:h-24"></div>
      <div className="px-4 sm:px-6 pb-4 relative -mt-12 flex flex-col md:flex-row">
        <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
          <Skeleton className="h-24 w-24 rounded-md" />
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-4 md:pt-12 flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
            
            <div className="flex items-center mt-2 md:mt-0">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="ml-3 h-6 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border-t border-neutral-200">
      <div className="px-4 sm:px-6">
        <div className="flex -mb-px py-4 space-x-8">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
    
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-2/3 mt-1" />
          </div>
          
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>
          
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <Skeleton className="h-5 w-40 mb-3" />
              <div className="space-y-3">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <Skeleton className="h-5 w-36 mb-3" />
              <Skeleton className="h-48 w-full rounded" />
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 md:col-span-2">
              <Skeleton className="h-5 w-44 mb-3" />
              <Skeleton className="h-32 w-full rounded" />
              <div className="mt-3 text-center">
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default OrganizationProfileSection;
