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
} from 'react-icons/pi';
import { routes } from '@/config/routes';
import ScoreBadge from '../shared/score-badge';

interface ProfileHeaderProps {
  student: any; // Replace with proper type
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ student }) => {
  return (
    <div className="relative rounded-xl md:rounded-2xl bg-mainBlue px-6 py-8 text-white dark:bg-gray-100">
      <Link
        href={{
          pathname: routes.myStudents.addStudent,
          query: { id: student.id },
        }}
        className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/30 dark:text-white/70 dark:hover:bg-white/10 transition-colors duration-100"
      >
        <PiPencilSimple className="h-4 w-4" />
        Edit Profile
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Avatar and name */}
        <div className="flex flex-col items-center lg:mr-6">
          <img
            src={student.avatar}
            title={student.name}
            alt={student.name}
            loading="lazy"
            className="mb-3 h-32 w-32 object-cover rounded-md shadow-lg"
          />
          <Title as="h2" className="text-2xl font-bold text-white">
            {student.name}
          </Title>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              className="border-white/30 bg-white/20 text-white dark:text-gray-600 dark:bg-gray-100"
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
              icon={<PiChartLineUp className="h-3.5 w-3.5" />}
              label="GPA"
              value={student.gpa}
              color="bg-green-600"
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
              color="bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
