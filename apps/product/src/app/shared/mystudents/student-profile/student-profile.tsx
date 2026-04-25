'use client';

import React from 'react';
import {
  PiChartBar,
  PiBooks,
  PiCertificate,
  PiIdentificationCard,
} from 'react-icons/pi';
import Card from '../../card';
import CustomTabs, { CustomTab } from '../shared/custom-tabs';
import ProfileHeader from './profile-header';
import LocationSection from './location-section';
import EducationSection from './education-section';
import SupervisionSection from './supervision-section';
import TestScoresTab from './test-scores-tab';
import CoursesTab from './courses-tab';
import CertificatesTab from './certificates-tab';
import StudentIDTab from './student-id-tab';

// Mock data for the student profile - in a real app this would come from API
// You would typically fetch this data and pass it as props or use a state management solution
import { studentData } from '@/data/student-profile-data';
import Certificates from "@shared//portfolio/certificates/certificates.tsx";
import Competitions from "@shared//portfolio/competitions/competitions.tsx";
import Creative from "@shared//portfolio/creative/creative.tsx";
import Exchanges from "@shared//portfolio/exchanges/exchanges.tsx";
import Olympiads from "@shared//portfolio/olympiads/olympiads.tsx";
import PortfolioOverviewPage from "@shared//portfolio/overview/overview.tsx";
import Projects from "@shared//portfolio/projects/projects.tsx";
import UniversityReadiness from "@shared//portfolio/overview/university-readiness.tsx";
import {portfolioData} from "@/data/portfolio-data.ts";
import SocialProjects from "@shared//portfolio/social-projects/social-projects.tsx";
import Sports from "@shared//portfolio/sports/sports.tsx";
import TestScores from "@shared//portfolio/test-scores/test-scores.tsx"; // Create this file to store your mock data

export default function StudentProfile() {

  const overallRating = {
    total: portfolioData.ratings.total,
    breakdown: [
      { name: 'SAT', score: portfolioData.ratings.sat, maxScore: 30 },
      { name: 'IELTS', score: portfolioData.ratings.ielts, maxScore: 15 },
      {
        name: 'Social Projects',
        score: portfolioData.ratings.socialProjects,
        maxScore: 5,
      },
      {
        name: 'Additional Courses',
        score: portfolioData.ratings.additionalCourses,
        maxScore: 5,
      },
      {
        name: 'Olympiads',
        score: portfolioData.ratings.olympiads,
        maxScore: 10,
      },
      { name: 'Projects', score: portfolioData.ratings.projects, maxScore: 10 },
      { name: 'Sports', score: portfolioData.ratings.sports, maxScore: 5 },
      { name: 'Creative', score: portfolioData.ratings.creative, maxScore: 5 },
      {
        name: 'Competitions',
        score: portfolioData.ratings.competitions,
        maxScore: 5,
      },
      {
        name: 'Exchanges',
        score: portfolioData.ratings.exchanges,
        maxScore: 10,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Student Overview Card with Header */}
      {/* Top blue section with avatar and key info */}
      <ProfileHeader student={studentData} />



      {/* Tabs for detailed information */}
      <Card className="overflow-hidden p-6">
        <CustomTabs>
          <CustomTab
              label="General"
              icon={<PiChartBar className="h-4 w-4" />}
          >
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Location Information */}
                  <LocationSection student={studentData} />

                  {/* Education Information */}
                  <EducationSection student={studentData} />

                  {/* Academic Advisor */}
                  <SupervisionSection student={studentData} />
                </div>

          </CustomTab>

          <CustomTab
              label="Overview"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <UniversityReadiness ratings={overallRating} />
          </CustomTab>

          <CustomTab
              label="Certificates"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Certificates />
          </CustomTab>

          <CustomTab
            label="Competitions"
            icon={<PiChartBar className="h-4 w-4" />}
          >
            <Competitions />
          </CustomTab>

          <CustomTab
              label="Creative"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Creative />
          </CustomTab>

          <CustomTab
              label="Exchanges"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Exchanges />
          </CustomTab>

          <CustomTab
              label="Olympiads"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Olympiads />
          </CustomTab>

          <CustomTab
              label="Projects"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Projects />
          </CustomTab>


          <CustomTab
              label="Social Projects"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <SocialProjects />
          </CustomTab>

          <CustomTab
              label="Sports"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <Sports />
          </CustomTab>

          <CustomTab
              label="Test scores"
              icon={<PiChartBar className="h-4 w-4" />}
          >
            <TestScores />
          </CustomTab>

        </CustomTabs>
      </Card>
    </div>
  );
}
