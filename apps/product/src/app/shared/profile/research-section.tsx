import React from 'react';
import { PiLightbulb } from 'react-icons/pi';
import { Badge } from 'rizzui';
import Section from '../mystudents/shared/section';

interface ResearchSectionProps {
  interests: string[];
  className?: string;
}

const ResearchSection: React.FC<ResearchSectionProps> = ({
  interests,
  className,
}) => {
  // Badge colors for variety
  const badgeColors = ['success', 'warning'];

  return (
    <Section
      title="Research Interests"
      icon={<PiLightbulb className="h-5 w-5" />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <Badge
            key={index}
            variant="flat"
            color={badgeColors[index % badgeColors.length] as any}
            className="text-sm"
          >
            {interest}
          </Badge>
        ))}
      </div>
    </Section>
  );
};

export default ResearchSection;
