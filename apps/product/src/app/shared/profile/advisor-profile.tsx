'use client';

import React from 'react';
import {
  PiStudent,
  PiBooks,
  PiNotePencil,
  PiMedal,
  PiInfo,
  PiCalendar,
} from 'react-icons/pi';
import Card from '../card';
import CustomTabs, { CustomTab } from '../mystudents/shared/custom-tabs';
import ProfileHeader from './profile-header';
import BioSection from './bio-section';
import EducationSection from './education-section';
import ResearchSection from './research-section';
import AdviseeTab from './advisee-tab';
import CoursesTab from './courses-tab';
import PublicationsTab from './publications-tab';
import AwardsTab from './awards-tab';
import AvailabilityTab from './availability-tab';

// Import the mock data
import { advisorData } from '@/data/advisor-data';

export default function AdvisorProfile() {
  return (
    <div className="space-y-8">
      {/* Advisor Overview Card with Header */}
      {/* Top blue section with avatar and key info */}
      <ProfileHeader advisor={advisorData} />
      
      <Card className="overflow-hidden">
        {/* Information sections */}
        <div className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Bio Information */}
            <BioSection advisor={advisorData} />

            {/* Education Information */}
            <EducationSection education={advisorData.education} />

            {/* Research Interests - Full width */}
            <ResearchSection
              interests={advisorData.researchInterests}
              className="md:col-span-2"
            />
          </div>
        </div>
      </Card>

      {/* Tabs for detailed information */}
      <Card className="overflow-hidden p-6">
        <CustomTabs>
          <CustomTab label="Advisees" icon={<PiStudent className="h-4 w-4" />}>
            <AdviseeTab advisees={advisorData.advisees} />
          </CustomTab>

          <CustomTab label="Courses" icon={<PiBooks className="h-4 w-4" />}>
            <CoursesTab courses={advisorData.coursesTaught} />
          </CustomTab>

          <CustomTab
            label="Publications"
            icon={<PiNotePencil className="h-4 w-4" />}
          >
            <PublicationsTab publications={advisorData.publications} />
          </CustomTab>

          <CustomTab label="Awards" icon={<PiMedal className="h-4 w-4" />}>
            <AwardsTab awards={advisorData.awards} />
          </CustomTab>

          <CustomTab
            label="Availability"
            icon={<PiCalendar className="h-4 w-4" />}
          >
            <AvailabilityTab advisor={advisorData} />
          </CustomTab>
        </CustomTabs>
      </Card>
    </div>
  );
}
