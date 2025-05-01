import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();

  const platformLinks = [
    { name: t('nav.leaderboard'), href: '/leaderboard' },
    { name: t('nav.solutionFinder'), href: '/solution-finder' },
    { name: 'Organization Directory', href: '/organizations' },
    { name: 'Impact Reports', href: '/reports' },
    { name: 'Methodology', href: '/methodology' },
  ];

  const organizationLinks = [
    { name: 'Join Basic Impacts', href: '/join' },
    { name: 'Claim Your Profile', href: '/claim' },
    { name: 'Upload Reports', href: '/upload' },
    { name: 'Verification Process', href: '/verification' },
    { name: 'Impact Measurement Guide', href: '/guide' },
  ];

  const aboutLinks = [
    { name: 'Our Mission', href: '/mission' },
    { name: 'Team', href: '/team' },
    { name: 'Partners', href: '/partners' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <span className="material-icons text-sm">bar_chart</span>
              </div>
              <h2 className="ml-2 text-xl font-semibold text-white">Basic<span className="text-primary-500">Impacts</span></h2>
            </div>
            <p className="text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="material-icons">linkedin</span>
              </a>
            </div>
          </div>
          
          {/* Platform links */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For Organizations links */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.forOrganizations')}</h3>
            <ul className="space-y-2">
              {organizationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About links */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
            <Link href="/terms">
              <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{t('footer.termsOfService')}</span>
            </Link>
            <span className="hidden md:inline mx-2 text-neutral-600">•</span>
            <Link href="/privacy">
              <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{t('footer.privacyPolicy')}</span>
            </Link>
            <span className="hidden md:inline mx-2 text-neutral-600">•</span>
            <Link href="/cookies">
              <span className="text-neutral-400 hover:text-white text-sm cursor-pointer">{t('footer.cookiePolicy')}</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 flex items-center text-neutral-500 text-sm">
              <span className="material-icons text-xs mr-1">language</span>
              <select 
                className="bg-transparent border-none text-neutral-400 focus:ring-0"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <p className="text-sm text-neutral-500">{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
