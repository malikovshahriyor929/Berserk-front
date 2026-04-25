'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text, Badge, Tooltip, Button } from 'rizzui';
import {
  PiEyeBold,
  PiCalendarPlusBold,
  PiArrowsDownUp,
  PiPenBold,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { formatDate } from '@core/utils/format-date';
import { Task } from '@/data/all-tasks-data';
import ModalButton from '@/app/shared/modal-button';
import TaskDetailsView from './forms/task-details-view';
import EnhancedAvatarGroup from '../../enhanced-avatar-group';
import { routes } from '@/config/routes';
import { Link } from '@/i18n/routing';

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 11:41:15');
const CURRENT_USER = 'abduraufdev77';

// Define badge color types
type BadgeColorType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'primary';

// Create a strongly typed column helper
const columnHelper = createColumnHelper<Task>();

export const taskListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select All"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('title', {
    id: 'title',
    size: 250,
    header: 'Task Title',
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-semibold text-mainBlue dark:text-gray-600">
        {row.original.title}
      </div>
    ),
  }),
  columnHelper.accessor('urgency', {
    id: 'urgency',
    size: 140,
    header: () => (
      <div className="w-full text-start font-semibold">Urgency</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <Badge
          className="mr-auto"
          color={getUrgencyBadgeColor(row.original.urgency)}
        >
          {row.original.urgency}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor('assignedStudents', {
    id: 'assignedStudents',
    size: 300,
    header: () => (
      <div className="w-full text-center font-semibold">Assigned Students</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <EnhancedAvatarGroup
          students={row.original.assignedStudents}
          maxDisplay={6}
        />
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 220,
    header: () => (
      <div className="w-full text-center font-semibold">Completion Status</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="w-full">
        <div className="mb-1 flex justify-between">
          <Text className="text-xs">
            {row.original.submittedCount} of {row.original.totalAssigned}{' '}
            submitted
          </Text>
          <Text className="text-xs font-medium">{row.original.status}%</Text>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={cn(
              'h-full rounded-full',
              row.original.status === 100
                ? 'bg-green-500'
                : row.original.status >= 70
                  ? 'bg-blue-500'
                  : row.original.status >= 40
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
            )}
            style={{ width: `${row.original.status}%` }}
          ></div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: () => (
      <div className="w-full text-center font-semibold">Due Date</div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const date = new Date(row.original.dueDate);
      const now = CURRENT_DATE;
      const isOverdue = now > date;
      const isUpcoming = isWithinThreeDays(date, now);

      return (
        <div className="flex items-center justify-center">
          <Text className="font-semibold">{formatDate(date)}</Text>
          <Badge
            className={cn(
              'ml-2',
              isOverdue
                ? 'bg-red-lighter text-red-dark'
                : isUpcoming
                  ? 'bg-orange-lighter text-orange-dark'
                  : 'bg-green-lighter text-green-dark'
            )}
          >
            {isOverdue ? 'Overdue' : isUpcoming ? 'Upcoming' : 'On Track'}
          </Badge>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    header: 'Actions',
    cell: ({ row }) => (
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip content="View Task Details" placement="top">
          <ModalButton
            label=""
            icon={<PiEyeBold className="h-4 w-4" />}
            variant="outline"
            size="sm"
            customSize={700}
            view={<TaskDetailsView task={row.original} />}
            className="h-auto p-2"
          />
        </Tooltip>
        <Tooltip content="Edit task" placement="top">
          <Button
            size="sm"
            variant="outline"
            className="mt-5 h-auto w-full p-0 text-xs capitalize @lg:w-auto sm:text-sm lg:mt-0"
          >
            <Link
              className="grid h-full w-full place-content-center p-2"
              href={routes.tasks.edit(row.original.id)}
            >
              <PiPenBold className="h-4 w-4" />
            </Link>
          </Button>
        </Tooltip>
      </div>
    ),
  }),
];

// Helper function to check if date is within 3 days
function isWithinThreeDays(date: Date, now: Date) {
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
  const diff = date.getTime() - now.getTime();
  return diff > 0 && diff <= threeDaysInMs;
}

// Helper function to determine badge color based on urgency
function getUrgencyBadgeColor(urgency: string): BadgeColorType {
  switch (urgency) {
    case 'Urgent':
      return 'danger';
    case 'High':
      return 'warning';
    case 'Normal':
      return 'info';
    case 'Low':
      return 'success';
    default:
      return 'secondary';
  }
}
