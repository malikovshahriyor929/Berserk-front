'use client';

import { Text, Badge, Avatar, Tooltip } from 'rizzui';
import {
  PiEnvelope,
  PiGraduationCap,
  PiUsers,
  PiStar,
  PiStarFill,
} from 'react-icons/pi';
import { formatDate } from '@core/utils/format-date';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';
import { Instructor } from '@core/types';

interface InstructorPopoverProps {
  instructor: Instructor;
  onClose?: () => void;
}

export default function InstructorPopover({
  instructor,
  onClose,
}: InstructorPopoverProps) {
  const joinedDate = instructor.joinedDate
    ? new Date(instructor.joinedDate)
    : null;

  return (
    <div className="font-geist w-64 p-1">
      <div className="mb-3 flex items-center gap-3">
        <Link
          // href={routes.instructors?.details?.(instructor.id) || '#'}
          href="#"
          className="flex items-center"
        >
          <Avatar
            name={instructor.name}
            src={instructor.avatar}
            className="ring-2 ring-mainBlue ring-offset-2"
            size="lg"
          />
        </Link>
        <div className="flex-1 items-center justify-between space-y-1">
          <Link
            // href={routes.instructors?.details?.(instructor.id) || '#'}
            href="#"
            className="flex items-center"
          >
            <Text className="text-base font-semibold text-mainBlue dark:text-gray-600">
              {instructor.name}
            </Text>
          </Link>
          <div className="flex items-center">
            <Badge size="sm" variant="outline" color="success">
              {instructor.username}
            </Badge>
          </div>
        </div>
      </div>
      <div className="mb-3 space-y-2">
        {instructor.rating && (
          <div className="flex items-center justify-between">
            <Text className="text-xs font-medium text-mainBlue dark:text-gray-600">
              Rating:
            </Text>
            <div className="flex items-center gap-1">
              <PiStarFill className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Text className="text-xs text-gray-600">
                {instructor.rating} / 5.0
              </Text>
            </div>
          </div>
        )}
        {instructor.totalStudents && (
          <div className="flex items-center justify-between">
            <Text className="text-xs font-medium text-mainBlue dark:text-gray-600">
              Students:
            </Text>
            <div className="flex items-center gap-1">
              <PiUsers className="h-4 w-4 text-gray-600" />
              <Text className="text-xs text-gray-600">
                {instructor.totalStudents}
              </Text>
            </div>
          </div>
        )}
        {instructor.education && (
          <div className="flex items-center justify-between">
            <Text className="text-xs font-medium text-mainBlue dark:text-gray-600">
              Education:
            </Text>
            <Tooltip
              placement="top"
              size="sm"
              color="secondary"
              content={instructor.degree || ''}
            >
              <Text className="max-w-[120px] truncate text-xs text-gray-600">
                {instructor.education}
              </Text>
            </Tooltip>
          </div>
        )}
        {joinedDate && (
          <div className="flex items-center justify-between">
            <Text className="text-xs font-medium text-mainBlue dark:text-gray-600">
              Joined:
            </Text>
            <Text className="text-xs text-gray-600">
              {formatDate(joinedDate)}
            </Text>
          </div>
        )}
      </div>
      <div className="space-y-1 border-t border-mainBlue/20 pt-3">
        <div className="flex items-center gap-2 text-xs">
          <PiEnvelope className="h-4 w-4 text-gray-600" />
          <Tooltip
            placement="top"
            size="sm"
            color="secondary"
            content="Open chat"
          >
            <Link href={routes.messages?.inbox || '#'}>
              <Text>
                {instructor.email || `${instructor.username}@newuu.uz`}
              </Text>
            </Link>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 pt-1 text-xs">
          <PiGraduationCap className="h-4 w-4 text-gray-600" />
          <Text className="text-xs text-gray-600">
            {instructor.degree || 'Expert Instructor'}
          </Text>
        </div>
      </div>
    </div>
  );
}
