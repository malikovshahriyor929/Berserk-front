import React from 'react';
import { PiBuildings, PiGraduationCap, PiLetterCircleP, PiListNumbers, PiMicroscope, PiShapes, PiTicket, PiTicketBold } from 'react-icons/pi';
import { Title, Text, Badge } from 'rizzui';
import cn from '@core/utils/class-names';
import Section from '../shared/section';
import InfoRow from '../shared/info-row';

interface Education {
  institution: string;
  degree: string;
  years: string;
}

interface StudentEducation {
  faculty: string;
  department: string;
  major: string;
  yearOfStudy: string;
  enrollmentDate: string;
  graduationDate: string;
  previousEducation: Education[];
}

interface EducationSectionProps {
  student: StudentEducation;
}

const EducationSection: React.FC<EducationSectionProps> = ({ student }) => {
  return (
    <Section
      title="Education Information"
      icon={<PiGraduationCap className="h-5 w-5" />}
    >
      <div className="space-y-5">
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-100">
          <Title
            as="h4"
            className="mb-1 text-base font-medium text-mainBlue dark:text-white/70"
          >
            Current Education
          </Title>
          <div className="mt-3 space-y-3">
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiBuildings className="h-5 w-5 text-amber-600" />
              <div>
                <InfoRow
                  label="Faculty"
                  value={student.faculty}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiShapes className="h-5 w-5 text-sky-600" />
              <div>
                <InfoRow
                  label="Department"
                  value={student.department}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiMicroscope className="h-5 w-5 text-teal-600" />
              <div>
                <InfoRow
                  label="Major"
                  value={student.major}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiListNumbers className="h-5 w-5 text-lime-600" />
              <div>
                <InfoRow
                  label="Year of Study"
                  value={student.yearOfStudy}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiTicket className="h-5 w-5 text-blue-600" />
              <div>
                <InfoRow
                  label="Enrollment"
                  value={student.enrollmentDate}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
            <div className="mt-0.5 flex w-full items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-200/40">
              <PiGraduationCap className="h-5 w-5 text-yellow-600" />
              <div>
                <InfoRow
                  label="Graduation"
                  value={student.graduationDate}
                  labelWidth="min-w-32"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-100">
          <Title
            as="h4"
            className="mb-3 text-base font-medium text-mainBlue dark:text-white/70"
          >
            Previous Education
          </Title>
          {student.previousEducation.map((edu: Education, index: number) => (
            <div
              key={index}
              className={cn(
                'mb-3 ml-5 border-l-2 border-blue-500 pl-3',
                index === student.previousEducation.length - 1
                  ? ''
                  : 'border-b border-dashed border-gray-200 pb-3 dark:border-white/50'
              )}
            >
              <Text className="font-medium">{edu.institution}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {edu.degree}
              </Text>
              <Badge variant="outline" className="mt-1 text-xs">
                {edu.years}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default EducationSection;
