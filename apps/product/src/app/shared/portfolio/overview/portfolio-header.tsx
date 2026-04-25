import React from 'react';
import Link from 'next/link';
import { Title, Avatar, Badge, Text } from 'rizzui';
import {
  PiPencilSimple,
  PiEnvelope,
  PiPhone,
  PiUsersThree,
  PiFlag,
  PiChartLineUp,
  PiTranslate,
  PiChartBar,
  PiMedal,
  PiStar,
} from 'react-icons/pi';
import { routes } from '@/config/routes';
import ScoreBadge from '../../score-badge';

interface PortfolioHeaderProps {
  student: any;
  overallRating: {
    total: number;
    breakdown: {
      name: string;
      score: number;
      maxScore: number;
    }[];
  };
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  student,
  overallRating,
}) => {
  // Calculate admission probability based on overall rating
  const getAdmissionProbability = (score: number) => {
    if (score >= 85) return 'Very High';
    if (score >= 70) return 'High';
    if (score >= 55) return 'Moderate';
    if (score >= 40) return 'Fair';
    return 'Low';
  };

  // Get admission probability color
  const getAdmissionColor = (score: number) => {
    if (score >= 85) return 'bg-green-600';
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 55) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative rounded-xl bg-mainBlue px-6 py-8 text-white dark:bg-gray-100 md:rounded-2xl">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Avatar and name */}
        <div className="flex flex-col items-center lg:mr-6">
          <img
            src={student.avatar}
            title={student.name}
            alt={student.name}
            loading="lazy"
            className="mb-3 h-32 w-32 rounded-md object-cover shadow-lg"
          />
          <Title as="h2" className="text-2xl font-bold text-white">
            {student.name}
          </Title>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              className="border-white/30 bg-white/20 text-white dark:bg-gray-100 dark:text-gray-600"
              variant="outline"
            >
              Student ID: PU-{student.id}
            </Badge>
            <Badge
              color={student.status === 'On-Track' ? 'success' : 'warning'}
              className="capitalize"
            >
              {student.status}
            </Badge>
          </div>
        </div>

        {/* Primary contact details */}
        <div className="flex flex-1 flex-col justify-center gap-3 border-t border-white/20 pt-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiEnvelope className="h-4 w-4" />
              </div>
              <Text className="text-white/90">{student.email}</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiPhone className="h-4 w-4" />
              </div>
              <Text className="text-white/90">{student.phone}</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiUsersThree className="h-4 w-4" />
              </div>
              <Text className="text-white/90">Group: {student.groupName}</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiFlag className="h-4 w-4" />
              </div>
              <Text className="text-white/90">{student.nationality}</Text>
            </div>
          </div>

          {/* Academic scores */}
          <div className="mt-3 flex flex-wrap gap-2">
            <ScoreBadge
              icon={<PiStar className="h-3.5 w-3.5" />}
              label="Rating"
              value={`${overallRating.total}/100`}
              color="bg-blue-600"
            />
            <ScoreBadge
              icon={<PiMedal className="h-3.5 w-3.5" />}
              label="Admission"
              value={getAdmissionProbability(overallRating.total)}
              color={getAdmissionColor(overallRating.total)}
            />
            <ScoreBadge
              icon={<PiTranslate className="h-3.5 w-3.5" />}
              label="CEFR"
              value={student.cefr}
              color="bg-amber-600"
            />
            <ScoreBadge
              icon={<PiChartBar className="h-3.5 w-3.5" />}
              label="Readiness"
              value={`${student.readinessScore}/5`}
              color="bg-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;
