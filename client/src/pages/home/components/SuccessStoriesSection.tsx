import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { OrganizationProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import BadgeWithIcon from '@/components/ui/badge-with-icon';
import ProgressWithLabel from '@/components/ui/progress-with-label';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const SuccessStoriesSection = () => {
  const { t } = useLanguage();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  
  const { data: successStories, isLoading } = useQuery<OrganizationProfile[]>({
    queryKey: ['/api/organizations/success-stories'],
  });

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

  if (isLoading) {
    return <SuccessStoriesSkeleton />;
  }

  if (!successStories || successStories.length === 0) {
    return null;
  }

  const activeStory = successStories[activeStoryIndex];

  return (
    <section className="py-12 bg-white border-t border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t('successStories.title')}</h2>
            <p className="text-neutral-600">{t('successStories.subtitle')}</p>
          </div>
          
          <div
            className="mt-2 md:mt-0 inline-flex items-center text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
            onClick={() => window.location.href = "/success-stories"}
          >
            {t('successStories.viewAll')}
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Story navigation sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {successStories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryIndex(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    index === activeStoryIndex
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center text-primary-500 flex-shrink-0">
                      <span className="material-icons">
                        {getSectorIcon(story.sector)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-neutral-900 text-sm">{story.name}</h3>
                      <p className="text-xs text-neutral-500">{story.sector}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main story content */}
          <div className="lg:col-span-9">
            <Card className="shadow-sm">
              <div className="relative">
                <div className="bg-primary-600 h-32"></div>
                <div className="absolute top-2 right-2">
                  {activeStory.verificationType && (
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-md px-3 py-1 text-xs font-medium text-primary-500 flex items-center">
                      <span className="material-icons text-sm mr-1">
                        {getVerificationBadge(activeStory.verificationType).icon}
                      </span>
                      {getVerificationBadge(activeStory.verificationType).text}
                    </div>
                  )}
                </div>
                <div className="px-6 pb-4 relative -mt-16 flex flex-col md:flex-row">
                  <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
                    <div className="h-24 w-24 bg-primary-100 rounded-md flex items-center justify-center">
                      <span className="material-icons text-primary-500 text-4xl">
                        {getSectorIcon(activeStory.sector)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 md:pt-12 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900">{activeStory.name}</h3>
                        <p className="text-neutral-600 text-sm">
                          {activeStory.sector} | {activeStory.region} {activeStory.established ? `| Est. ${activeStory.established}` : ''}
                        </p>
                      </div>
                      
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className="text-2xl font-serif font-bold text-neutral-900">{activeStory.impactScore}</span>
                        <span className="ml-2 text-xs text-neutral-700 leading-tight">
                          Impact IQ<br />Score
                        </span>
                        <BadgeWithIcon
                          text={activeStory.impactGrade}
                          variant="success"
                          className="ml-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - description */}
                  <div className="md:col-span-1">
                    <div className="mb-6">
                      <h4 className="font-medium text-neutral-900 mb-2">{t('org.mission')}</h4>
                      <p className="text-sm text-neutral-700">
                        {activeStory.mission}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-neutral-900 mb-2">{t('org.sdgAlignment')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeStory.sdgAlignment.map((sdg, index) => (
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
                          <span className="font-medium text-neutral-900">{activeStory.stats.peopleReached}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.socialROI')}</span>
                          <span className="font-medium text-neutral-900">${activeStory.stats.socialROI} per $1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">{t('org.stats.programs')}</span>
                          <span className="font-medium text-neutral-900">{activeStory.stats.programs} nationwide</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right columns - metrics */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Impact IQ Breakdown */}
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <h4 className="font-medium text-neutral-900 mb-3">{t('org.impactBreakdown')}</h4>
                        <div className="space-y-3">
                          <ProgressWithLabel
                            label={t('org.metrics.reportingQuality')}
                            value={activeStory.metrics.reportingQuality}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.reach')}
                            value={activeStory.metrics.reach}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.socialROI')}
                            value={activeStory.metrics.socialROI}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.outcomeEffectiveness')}
                            value={activeStory.metrics.outcomeEffectiveness}
                            max={20}
                          />
                          
                          <ProgressWithLabel
                            label={t('org.metrics.transparencyGovernance')}
                            value={activeStory.metrics.transparencyGovernance}
                            max={20}
                          />
                        </div>
                      </div>
                      
                      {/* Top Programs */}
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <h4 className="font-medium text-neutral-900 mb-3">{t('org.topPrograms')}</h4>
                        <div className="space-y-3">
                          {activeStory.topPrograms.map((program, index) => (
                            <div key={index} className="bg-white p-3 rounded border border-neutral-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h5 className="font-medium text-sm">{program.name}</h5>
                                  <div className="flex items-center text-xs text-neutral-500 mt-1">
                                    <span>{program.peopleReached.toLocaleString()} people</span>
                                    <span className="mx-2">•</span>
                                    <span>${program.socialROI.toFixed(2)} ROI</span>
                                  </div>
                                </div>
                                <BadgeWithIcon 
                                  text={program.impactGrade}
                                  variant="success"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        className="bg-primary-500 hover:bg-primary-600 text-white"
                        onClick={() => window.location.href = `/organization/${activeStory.id}`}
                      >
                        {t('successStories.viewFullProfile')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const SuccessStoriesSkeleton = () => (
  <section className="py-12 bg-white border-t border-b border-neutral-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-4 w-32 mt-2 md:mt-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Story navigation sidebar skeleton */}
        <div className="lg:col-span-3">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Main story content skeleton */}
        <div className="lg:col-span-9">
          <Card className="shadow-sm">
            <div className="relative">
              <Skeleton className="h-32 w-full" />
              <div className="px-6 pb-4 relative -mt-16 flex flex-col md:flex-row">
                <Skeleton className="h-32 w-32 rounded-lg" />
                <div className="mt-4 md:mt-0 md:ml-4 md:pt-12 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-4/5 mb-6" />
                  
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Skeleton className="h-10 w-48 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

export default SuccessStoriesSection;