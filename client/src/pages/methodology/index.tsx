import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MethodologyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            Impact Measurement Methodology
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A comprehensive breakdown of the why, how, what, and who behind the Basic Impacts accountability platform.
          </p>
        </div>

        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Why We Exist</h2>
            <p className="mb-4">
              Basic Impacts was created to address critical gaps in the social impact sector:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <span className="font-medium">Lack of standardization</span> - Impact measurement methods vary widely across organizations and sectors
              </li>
              <li>
                <span className="font-medium">Limited transparency</span> - Impact claims often lack rigorous verification and validation
              </li>
              <li>
                <span className="font-medium">Accessibility challenges</span> - Impact data is typically siloed or presented in complex formats
              </li>
              <li>
                <span className="font-medium">Resource constraints</span> - Smaller organizations struggle to implement robust impact measurement
              </li>
            </ul>
            <p>
              By addressing these challenges, we aim to create a more transparent, accountable, and effective social impact ecosystem across Canada.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">How We Measure Impact</h2>
            <p className="mb-4">
              Our Impact IQ methodology combines quantitative and qualitative metrics to provide a comprehensive assessment:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Impact IQ Components</h3>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-primary-400 pl-4 py-2">
                <h4 className="font-medium">Reporting Quality (20%)</h4>
                <p className="text-neutral-600">Assessment of data collection methods, comprehensiveness, and frequency of reporting.</p>
              </div>
              
              <div className="border-l-4 border-primary-400 pl-4 py-2">
                <h4 className="font-medium">Reach (20%)</h4>
                <p className="text-neutral-600">The scale of impact relative to the social need (people served, geographic coverage).</p>
              </div>
              
              <div className="border-l-4 border-primary-400 pl-4 py-2">
                <h4 className="font-medium">Social ROI (20%)</h4>
                <p className="text-neutral-600">Return on investment calculation comparing resources invested to quantifiable social outcomes.</p>
              </div>
              
              <div className="border-l-4 border-primary-400 pl-4 py-2">
                <h4 className="font-medium">Outcome Effectiveness (20%)</h4>
                <p className="text-neutral-600">Evaluation of the depth, quality, and sustainability of the impact achieved.</p>
              </div>
              
              <div className="border-l-4 border-primary-400 pl-4 py-2">
                <h4 className="font-medium">Transparency & Governance (20%)</h4>
                <p className="text-neutral-600">Assessment of the organization's accountability, transparency, and ethical practices.</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Verification Levels</h3>
            <p className="mb-4">
              We classify impact data according to three verification levels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-700">Audited</h4>
                <p className="text-sm text-neutral-600">Impact verified by an independent third-party through a comprehensive audit process.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700">Verified</h4>
                <p className="text-sm text-neutral-600">Impact claims verified by Basic Impacts through documentation review and spot checks.</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-700">Self-Reported</h4>
                <p className="text-sm text-neutral-600">Impact data provided by the organization without external verification.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">What We Measure</h2>
            <p className="mb-6">
              Our platform captures a diverse range of impact metrics across multiple dimensions:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-primary-600 mb-2">Sector-Specific Metrics</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Food Security (meals provided, reduction in food insecurity)</li>
                  <li>Housing (units created, people housed, housing stability)</li>
                  <li>Education (learning outcomes, graduation rates, skills developed)</li>
                  <li>Health & Wellbeing (health improvements, quality of life measures)</li>
                  <li>Environment (emissions reduced, waste diverted, conservation impact)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-600 mb-2">Cross-Sector Metrics</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>UN Sustainable Development Goals alignment</li>
                  <li>Community engagement and participation</li>
                  <li>Diversity, equity, and inclusion</li>
                  <li>Systems change and policy influence</li>
                  <li>Innovation and replicability</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Impact Grading System</h3>
            <p className="mb-4">
              Based on the combined Impact IQ score, organizations are assigned a grade:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <span className="font-bold text-lg text-green-700">A+, A, A-</span>
                <p className="text-sm text-neutral-600">Outstanding impact</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <span className="font-bold text-lg text-blue-700">B+, B, B-</span>
                <p className="text-sm text-neutral-600">Strong impact</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <span className="font-bold text-lg text-amber-700">C+, C, C-</span>
                <p className="text-sm text-neutral-600">Moderate impact</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <span className="font-bold text-lg text-red-700">D, F</span>
                <p className="text-sm text-neutral-600">Limited impact</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Who We Are</h2>
            <p className="mb-6">
              Basic Impacts is a collaborative initiative developed by a diverse group of stakeholders committed to enhancing impact accountability in Canada.
            </p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Our Team</h3>
            <p className="mb-4">
              Our multidisciplinary team includes experts in:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Impact measurement and evaluation</li>
              <li>Data science and analytics</li>
              <li>Social innovation and entrepreneurship</li>
              <li>Non-profit management and governance</li>
              <li>Technology and user experience design</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Advisory Council</h3>
            <p className="mb-4">
              Our methodology is guided by an advisory council representing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Non-Profit Sector</h4>
                <p className="text-sm text-neutral-600">Leaders from diverse service organizations</p>
              </div>
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Academic Institutions</h4>
                <p className="text-sm text-neutral-600">Researchers in social impact measurement</p>
              </div>
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Impact Funders</h4>
                <p className="text-sm text-neutral-600">Foundations and impact investors</p>
              </div>
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Government</h4>
                <p className="text-sm text-neutral-600">Social policy and program specialists</p>
              </div>
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Corporate Partners</h4>
                <p className="text-sm text-neutral-600">CSR and ESG professionals</p>
              </div>
              <div className="p-4 border border-neutral-200 rounded-lg">
                <h4 className="font-medium text-primary-600">Community Representatives</h4>
                <p className="text-sm text-neutral-600">Service recipients and beneficiaries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Commitment</h2>
            <p className="mb-4">
              Basic Impacts is committed to continuous improvement. We regularly review and refine our methodology based on:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <span className="font-medium">Stakeholder feedback</span> - We actively seek input from organizations, funders, and beneficiaries
              </li>
              <li>
                <span className="font-medium">Emerging best practices</span> - We stay current with developments in impact measurement globally
              </li>
              <li>
                <span className="font-medium">Data analysis</span> - We use platform data to identify trends and refine our approach
              </li>
              <li>
                <span className="font-medium">Technical innovations</span> - We incorporate new tools and technologies to enhance data collection and analysis
              </li>
            </ul>
            <p>
              Our goal is to create a dynamic, responsive ecosystem that effectively captures, measures, and communicates meaningful social impact.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MethodologyPage;