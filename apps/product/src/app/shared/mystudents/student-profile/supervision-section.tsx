import React from 'react';
import { Avatar, Title, Text } from 'rizzui';
import { PiBriefcase, PiPhone, PiPhoneCallDuotone } from 'react-icons/pi';
import Section from '../shared/section';

interface SupervisionSectionProps {
  student: any; // Replace with proper type
}

const SupervisionSection: React.FC<SupervisionSectionProps> = ({ student }) => {
  return (
    <Section
      title="Academic Supervision"
      icon={<PiBriefcase className="h-5 w-5" />}
    >
      <div className="flex items-center gap-3">
        <Avatar
          name={student.advisor}
          size="lg"
          className="ring-2 ring-blue-100 dark:ring-gray-300 dark:ring-1"
        />
        <div>
          <Title as="h4" className="text-base font-medium dark:text-white/80">
            {student.advisor}
          </Title>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Academic Advisor
          </Text>
          <div className="mt-1 flex items-center gap-2">
            <PiPhoneCallDuotone className="h-4 w-4 text-gray-500" />
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {student.advisorPhone}
            </Text>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SupervisionSection;
