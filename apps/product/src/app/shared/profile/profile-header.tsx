import React from 'react';
import Link from 'next/link';
import { Title, Avatar, Badge, Text } from 'rizzui';
import {
  PiPencilSimple,
  PiEnvelope,
  PiPhone,
  PiBuildings,
  PiGraduationCap,
  PiDesktopTower,
  PiBriefcase,
} from 'react-icons/pi';
import { routes } from '@/config/routes';

interface ProfileHeaderProps {
  advisor: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ advisor }) => {
  return (
    <div className="relative rounded-xl md:rounded-2xl bg-mainBlue px-6 py-8 text-white dark:bg-gray-100/70">
      <Link
        href={{
          pathname: routes.settings.profileSettings,
          query: { id: advisor.id },
        }}
        className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/30"
      >
        <PiPencilSimple className="h-4 w-4" />
        Edit Profile
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Avatar and name */}
        <div className="flex flex-col items-center lg:mr-6">
          <img
            src={advisor.avatar}
            alt={`${advisor.name}'s avatar`}
            loading="lazy"
            className="mb-3 h-32 w-32  object-cover rounded-md shadow-lg lg:h-40 lg:w-40"
          />
          <Title as="h2" className="text-2xl font-bold text-white">
            {advisor.name}
          </Title>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge
              className="border-white/30 bg-white/20 text-white"
              variant="outline"
            >
              Faculty ID: {advisor.id}
            </Badge>
            <Badge
              className="border-white/30 bg-indigo-500/70 text-white"
              variant="flat"
            >
              {advisor.position}
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
              <Text className="text-white/90">{advisor.email}</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiPhone className="h-4 w-4" />
              </div>
              <Text className="text-white/90">{advisor.phone}</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiBuildings className="h-4 w-4" />
              </div>
              <Text className="text-white/90">
                Department: {advisor.department}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5">
                <PiDesktopTower className="h-4 w-4" />
              </div>
              <Text className="text-white/90">{advisor.office}</Text>
            </div>
          </div>

          {/* Specialization */}
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-1.5">
              <PiGraduationCap className="h-4 w-4" />
            </div>
            <Text className="text-white/90">{advisor.specialization}</Text>
          </div>

          {/* Join date */}
          <div className="mt-1 flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-1.5">
              <PiBriefcase className="h-4 w-4" />
            </div>
            <Text className="text-white/90">
              Faculty Member since {advisor.joinDate}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
