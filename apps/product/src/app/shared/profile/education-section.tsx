import React from 'react';
import { PiGraduationCap } from 'react-icons/pi';
import { Text, Badge } from 'rizzui';
import cn from '@core/utils/class-names';
import Section from '../mystudents/shared/section';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <Section
      title="Education Background"
      icon={<PiGraduationCap className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className={cn(
              'rounded-md border-l-4 border-blue-500 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-900/20'
            )}
          >
            <Text className="font-bold text-gray-900 dark:text-gray-100">
              {edu.degree}
            </Text>
            <Text className="text-sm text-gray-700 dark:text-gray-300">
              {edu.institution}
            </Text>
            <Badge
              variant="flat"
              color="secondary"
              className="mt-1 text-xs font-medium text-white"
            >
              {edu.year}
            </Badge>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default EducationSection;
