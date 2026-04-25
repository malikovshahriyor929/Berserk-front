'use client';

import React, { useState, ReactNode } from 'react';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiListChecksBold,
  PiGraduationCapBold,
  PiHeartBold,
  PiBriefcaseBold,
  PiChartBarBold,
} from 'react-icons/pi';
import { Button, Title } from 'rizzui';
import cn from '@core/utils/class-names';

// Import section components
import RubricOverview from './rubric-sections/rubric-overview';
import AcademicReadiness from './rubric-sections/academic-readiness';
import SocialEmotional from './rubric-sections/social-emotional';
import CareerLifeSkills from './rubric-sections/career-life-skills';
import ScoringTips from './rubric-sections/scoring-tips';

// Section title component for form sections
interface SectionTitleProps {
  icon: ReactNode;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
  <div className="mb-6 mr-2 flex flex-1 items-center border-b border-dashed border-gray-500 pb-3">
    <span className="mr-2 rounded-md bg-[#043764]/10 p-2 text-[#043764] dark:bg-gray-100 dark:text-blue-600">
      {icon}
    </span>
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-500">
      {title}
    </h3>
  </div>
);

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  isExpanded,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        'mb-6 rounded-lg border bg-white dark:bg-gray-100/30 shadow-sm transition-all duration-200 ease-in-out',
        isExpanded
          ? 'border-blue-200 dark:border-blue-800/30'
          : 'border-gray-200 dark:border-gray-200'
      )}
    >
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between p-5 transition-colors duration-200',
          isExpanded
            ? 'bg-blue-50/70 dark:bg-blue-900/10'
            : 'bg-white dark:bg-gray-100/30'
        )}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span
            className={cn(
              'mr-3 rounded-md p-2 transition-colors duration-200',
              isExpanded
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-800/20 dark:text-blue-400'
                : 'bg-[#043764]/10 text-[#043764] dark:bg-gray-200/50 dark:text-blue-400'
            )}
          >
            {icon}
          </span>
          <Title
            as="h4"
            className={cn(
              'text-base font-semibold transition-colors duration-200',
              isExpanded
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-gray-800 dark:text-gray-600'
            )}
          >
            {title}
          </Title>
        </div>
        <Button
          variant="text"
          className={cn(
            'h-auto p-0 transition-colors duration-200',
            isExpanded
              ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          )}
        >
          {isExpanded ? (
            <PiCaretUpBold className="h-5 w-5" />
          ) : (
            <PiCaretDownBold className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="border-t border-dashed border-gray-200 p-5 dark:border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function RubricTemplatesPage() {
  const [expandedSectionId, setExpandedSectionId] = useState<number | null>(0); // First section open by default

  const handleSectionToggle = (sectionId: number) => {
    setExpandedSectionId(expandedSectionId === sectionId ? null : sectionId);
  };

  const rubricSections = [
    {
      id: 0,
      title: 'Academic Readiness Rubric',
      icon: <PiGraduationCapBold className="h-5 w-5" />,
      component: <AcademicReadiness />,
    },
    {
      id: 1,
      title: 'Social-Emotional Readiness Rubric',
      icon: <PiHeartBold className="h-5 w-5" />,
      component: <SocialEmotional />,
    },
    {
      id: 2,
      title: 'Career & Life Skills Readiness Rubric',
      icon: <PiBriefcaseBold className="h-5 w-5" />,
      component: <CareerLifeSkills />,
    },
    {
      id: 3,
      title: 'Scoring Tips & Calculation',
      icon: <PiChartBarBold className="h-5 w-5" />,
      component: <ScoringTips />,
    },
  ];

  return (
    <div className="@container">
      <div className="mx-auto max-w-full px-2">
        <SectionTitle
          icon={<PiListChecksBold className="h-5 w-5" />}
          title="Rubric Templates & Scoring Guide"
        />

        <RubricOverview />

        <Title as="h2" className="mb-5 text-xl font-bold dark:text-gray-600">
          Rubric Categories
        </Title>

        <div className="space-y-5">
          {rubricSections.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              icon={section.icon}
              isExpanded={expandedSectionId === section.id}
              onToggle={() => handleSectionToggle(section.id)}
            >
              {section.component}
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  );
}
