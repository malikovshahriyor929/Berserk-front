'use client';

import { CourseStudentType } from '@/data/course-students-data';
import { routes } from '@/config/routes';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import {
  PiCheck,
  PiClock,
  PiEyeBold,
  PiFaders,
  PiChatTextBold,
  PiXCircle,
  PiBookmarkSimpleBold,
  PiPlusCircle,
} from 'react-icons/pi';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import StudentPopover from '@/app/shared/student-popover';
import { Link } from '@/i18n/routing';
import toast from 'react-hot-toast';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<CourseStudentType>();

// Circle Progress Bar Component
function CircleProgressBar({
  size = 40,
  strokeWidth = 4,
  stroke = '#f0f0f0',
  percentage = 0,
  label = '',
  progressColor = '#484848',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
}

function getProgressColor(progress: number) {
  if (progress >= 75) return '#0DA000';
  if (progress >= 50) return '#FFB400';
  if (progress > 0) return '#EE5D26';
  return '#d1d5db';
}

export const courseStudentsColumns = () => [
  columnHelper.display({
    id: 'studentId',
    size: 80,
    header: 'ID',
    cell: ({ row }) => (
      <Text className="font-medium">PU-{row.original.id}</Text>
    ),
  }),

  columnHelper.display({
    id: 'studentInfo',
    size: 250,
    header: 'Student',
    cell: ({ row }) => (
      <div>
        <TableAvatar
          src={row.original.avatar}
          name={row.original.name}
          description={row.original.email}
        />
      </div>
    ),
  }),

  columnHelper.display({
    id: 'groupCode',
    size: 120,
    header: 'Group',
    cell: ({ row }) => (
      <Badge variant="outline" className="border-mainBlue text-mainBlue">
        {row.original.groupCode}
      </Badge>
    ),
  }),

  columnHelper.accessor('enrollmentStatus', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.enrollmentStatus),
  }),

  columnHelper.display({
    id: 'progress',
    size: 150,
    header: 'Progress',
    cell: ({ row: { original } }) => {
      const getTooltipContent = () => {
        if (original.enrollmentStatus === 'enrolled') {
          if (original.progress === 100) return 'Course completed';
          return `Progress: ${original.progress}% complete`;
        }
        return 'Student not enrolled';
      };

      return (
        <div className="flex w-full items-center ps-4 text-[10px]">
          <Tooltip content={getTooltipContent()} placement="top">
            <div>
              <CircleProgressBar
                size={40}
                strokeWidth={4}
                stroke="#f0f0f0"
                percentage={
                  original.enrollmentStatus === 'enrolled'
                    ? original.progress
                    : 0
                }
                label={
                  original.enrollmentStatus === 'enrolled'
                    ? `${original.progress}%`
                    : '0%'
                }
                progressColor={
                  original.enrollmentStatus === 'enrolled'
                    ? getProgressColor(original.progress)
                    : '#d1d5db'
                }
              />
            </div>
          </Tooltip>
        </div>
      );
    },
  }),

  columnHelper.display({
    id: 'lastActivity',
    size: 150,
    header: 'Last Activity',
    cell: ({ row }) =>
      row.original.lastActivityDate ? (
        <DateCell date={new Date(row.original.lastActivityDate)} />
      ) : (
        <Text className="text-sm text-gray-500">No activity</Text>
      ),
  }),

  columnHelper.display({
    id: 'actions',
    size: 120,
    header: 'Actions',
    cell: ({ row }) => {
      const isEnrolled = row.original.enrollmentStatus === 'enrolled';

      const handleAssignClick = () => {
        toast.success(`Assigning student to course - Feature coming soon!`);
      };

      const handleViewDetailsClick = () => {
        toast.success(`View student course details - Feature coming soon!`);
      };

      const handleMessageClick = () => {
        toast.success(`Message student - Feature coming soon!`);
      };

      return (
        <div className="flex items-center justify-end gap-2">
          {/* First icon: Assign/View Details based on enrollment status */}
          {isEnrolled ? (
            <Tooltip content="View Course Details" placement="top">
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label="View course details"
                onClick={handleViewDetailsClick}
                className="hover:border-mainBlue hover:text-mainBlue"
              >
                <PiEyeBold className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip content="Assign to Course" placement="top">
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label="Assign to course"
                onClick={handleAssignClick}
                className="hover:border-green-500 hover:text-green-500"
              >
                <PiPlusCircle className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          )}

          {/* Second icon: Message student (always visible) */}
          <Tooltip content="Message Student" placement="top">
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label="Send message"
              onClick={handleMessageClick}
              className="hover:border-mainBlue hover:text-mainBlue"
            >
              <PiChatTextBold className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </div>
      );
    },
  }),
];
