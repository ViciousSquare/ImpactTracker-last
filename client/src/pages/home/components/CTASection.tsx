import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 bg-primary-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="mb-6 text-primary-100">
              {t('cta.subtitle')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white flex items-center justify-center text-primary-500">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-2 text-sm text-primary-50">{t('cta.feature1')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white flex items-center justify-center text-primary-500">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-2 text-sm text-primary-50">{t('cta.feature2')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white flex items-center justify-center text-primary-500">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-2 text-sm text-primary-50">{t('cta.feature3')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white flex items-center justify-center text-primary-500">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-2 text-sm text-primary-50">{t('cta.feature4')}</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/join">
                <Button className="bg-white hover:bg-neutral-100 text-primary-600 font-medium">
                  {t('cta.join')}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="ml-4 border-white hover:bg-primary-700 text-white font-medium">
                  {t('cta.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-primary-500">
                    <span className="material-icons">business</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{t('cta.portal')}</p>
                    <p className="text-xs text-primary-200">{t('cta.portalSubtitle')}</p>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-white text-primary-500 rounded-full">
                  {t('common.preview')}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('cta.uploadReport')}</span>
                    <span className="material-icons text-primary-200">upload_file</span>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('cta.updateMetrics')}</span>
                    <span className="material-icons text-primary-200">analytics</span>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('cta.managePrograms')}</span>
                    <span className="material-icons text-primary-200">folder_open</span>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t('cta.requestVerification')}</span>
                    <span className="material-icons text-primary-200">verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
