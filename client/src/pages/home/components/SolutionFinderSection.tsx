import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Solution } from '@/lib/types';

const SolutionFinderSection = () => {
  const { t } = useLanguage();

  const { data: solutions = [], isLoading } = useQuery<Solution[]>({
    queryKey: ['/api/solutions'],
    retry: 3,
    staleTime: 30000,
  });

  if (isLoading) {
    return <SolutionFinderSkeleton />;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t('solutions.title')}</h2>
          <p className="text-neutral-600">{t('solutions.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions?.map((solution) => (
            <Card key={solution.id} className="shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {solution.name || t('common.untitled')}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {solution.description || t('common.noDescription')}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">
                    {(solution.impactScore || 0).toLocaleString()} {t('common.impactScore')}
                  </span>
                  <Button variant="outline" size="sm">
                    {t('common.learnMore')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionFinderSkeleton = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm">
            <div className="p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionFinderSection;