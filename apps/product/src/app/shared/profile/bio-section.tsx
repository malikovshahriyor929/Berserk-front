import React from 'react';
import { PiInfo } from 'react-icons/pi';
import { Text } from 'rizzui';
import Section from '../mystudents/shared/section';

interface BioSectionProps {
  advisor: any;
}

const BioSection: React.FC<BioSectionProps> = ({ advisor }) => {
  return (
    <Section title="Professional Bio" icon={<PiInfo className="h-5 w-5" />}>
      <Text className="leading-relaxed text-gray-700 dark:text-gray-300">
        {advisor.bio}
      </Text>

      {advisor.website && (
        <a
          href={advisor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
        >
          Faculty Website ↗
        </a>
      )}
    </Section>
  );
};

export default BioSection;
