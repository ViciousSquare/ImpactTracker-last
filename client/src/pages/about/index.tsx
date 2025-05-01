import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, ChevronRight, LineChart, BarChart3, PieChart, Target, Award, Users, BookOpen, HandHeart } from "lucide-react";

const AboutPage = () => {
  const { t } = useLanguage();

  const stats = [
    {
      value: "$5.3B",
      label: "Annual funding gap in Canadian social sector",
      description: "The gap between what's needed and what's available for social programs.",
      source: "Social Finance Forum, 2023"
    },
    {
      value: "86%",
      label: "of Canadians want transparency in social impact",
      description: "Canadians want to know how donations and tax dollars are being used to address social issues.",
      source: "Statistics Canada, 2022"
    },
    {
      value: "47%",
      label: "of social programs lack rigorous impact evaluation",
      description: "Nearly half of all Canadian social initiatives cannot demonstrate their effectiveness.",
      source: "Canadian Impact Measurement Survey"
    },
    {
      value: "68%",
      label: "of donors base decisions on measurable impact",
      description: "The majority of donors prioritize organizations that can demonstrate measurable outcomes.",
      source: "Imagine Canada, 2023"
    }
  ];

  const wastageStats = [
    {
      value: "$1.2B",
      label: "Lost annually to ineffective programs",
      description: "Funds directed to programs with no meaningful outcomes.",
      source: "Public Policy Forum, 2022"
    },
    {
      value: "3.8 years",
      label: "Average time before program evaluation",
      description: "Most programs run for nearly 4 years before rigorous impact assessment.",
      source: "Social Research Canada"
    },
    {
      value: "38%",
      label: "of duplicate efforts across organizations",
      description: "Organizations unknowingly replicate existing solutions due to lack of sector-wide data.",
      source: "Nonprofit Innovation Report, 2021"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-primary-950 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
              Why Basic Impacts Exists
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              We're building a future where social impact is transparent, measurable, and accountable —
              addressing the critical gaps in Canada's social sector.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-primary-200 flex items-center">
                <Target className="mr-2 h-6 w-6" />
                The Problem
              </h2>
              <p className="mb-6 text-gray-300">
                Canada's social sector lacks standardized impact measurement, leading to inefficient resource allocation, 
                duplicated efforts, and an inability to identify truly effective approaches to our most pressing social challenges.
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-red-400 mt-1">
                    <ChevronRight size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Funding decisions</span> are made without adequate impact data
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-red-400 mt-1">
                    <ChevronRight size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Organizations struggle</span> to demonstrate their effectiveness
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-red-400 mt-1">
                    <ChevronRight size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Billions wasted</span> on programs without proven outcomes
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-red-400 mt-1">
                    <ChevronRight size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">No standardized metrics</span> to compare program effectiveness
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-primary-200 flex items-center">
                <Award className="mr-2 h-6 w-6" />
                Our Solution
              </h2>
              <p className="mb-6 text-gray-300">
                Basic Impacts provides a comprehensive platform that standardizes impact measurement, 
                creates transparency, and enables data-driven decision making across the social sector.
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-green-400 mt-1">
                    <BadgeCheck size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Standardized metrics</span> across sectors and programs
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-green-400 mt-1">
                    <BadgeCheck size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Evidence-based evaluation</span> of program effectiveness
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-green-400 mt-1">
                    <BadgeCheck size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Data visualization</span> making impact transparent and accessible
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-green-400 mt-1">
                    <BadgeCheck size={18} />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Accountability framework</span> that rewards proven results
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alarming Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">The Urgent Need for Impact Accountability</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world statistics show the critical gaps in Canada's social impact ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-primary-600">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-800 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600 mb-3">{stat.description}</p>
                  <p className="text-xs text-gray-500 italic">Source: {stat.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-12" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">The Cost of Inaction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ineffective impact measurement leads to significant resource wastage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wastageStats.map((stat, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-red-600">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-800 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600 mb-3">{stat.description}</p>
                  <p className="text-xs text-gray-500 italic">Source: {stat.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Basic Impacts combines robust methodology with user-friendly tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Standardized Metrics</h3>
              <p className="text-gray-600">
                Comparable data across organizations, sectors, and regions using a unified measurement framework
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Reporting</h3>
              <p className="text-gray-600">
                Clear, accessible visualizations of impact data that anyone can understand
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Advanced analytics that identify patterns, trends, and opportunities for improvement
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
              <p className="text-gray-600">
                Engaging beneficiaries, funders, and organizations in collaborative improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Impact Accountability Movement
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Together, we can transform how social impact is measured, reported, and improved across Canada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn bg-white text-primary-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-md">
              Register Your Organization
            </button>
            <button className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-md">
              Learn More About Our Methodology
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;