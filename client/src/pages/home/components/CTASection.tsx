import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 md:py-20 text-white overflow-hidden">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 z-0"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      
      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4 text-xs">
              {t('common.preview')} • Impact Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {t('cta.title')}
            </h2>
            <p className="mb-8 text-lg text-purple-100 max-w-lg leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-3 text-white/90">{t('cta.feature1')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-3 text-white/90">{t('cta.feature2')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-3 text-white/90">{t('cta.feature3')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md">
                  <span className="material-icons text-xs">check</span>
                </div>
                <p className="ml-3 text-white/90">{t('cta.feature4')}</p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/join">
                <Button 
                  className="bg-white hover:bg-white/90 text-purple-700 font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('cta.join')}
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="ml-4 border-white/40 hover:border-white hover:bg-white/10 text-white font-medium px-6 py-2.5 rounded-xl"
                >
                  {t('cta.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    <span className="material-icons">business</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-white">{t('cta.portal')}</p>
                    <p className="text-xs text-white/80">{t('cta.portalSubtitle')}</p>
                  </div>
                </div>
                <div className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-sm">
                  {t('common.preview')}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/10 hover:bg-white/20 transition-colors duration-200 p-4 rounded-lg cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white group-hover:text-white">{t('cta.uploadReport')}</span>
                    <span className="material-icons text-white/80 group-hover:text-white">upload_file</span>
                  </div>
                </div>
                
                <div className="bg-white/10 hover:bg-white/20 transition-colors duration-200 p-4 rounded-lg cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white group-hover:text-white">{t('cta.updateMetrics')}</span>
                    <span className="material-icons text-white/80 group-hover:text-white">analytics</span>
                  </div>
                </div>
                
                <div className="bg-white/10 hover:bg-white/20 transition-colors duration-200 p-4 rounded-lg cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white group-hover:text-white">{t('cta.managePrograms')}</span>
                    <span className="material-icons text-white/80 group-hover:text-white">folder_open</span>
                  </div>
                </div>
                
                <div className="bg-white/10 hover:bg-white/20 transition-colors duration-200 p-4 rounded-lg cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white group-hover:text-white">{t('cta.requestVerification')}</span>
                    <span className="material-icons text-white/80 group-hover:text-white">verified</span>
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
