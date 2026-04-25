'use client';

import { useState } from 'react';
import { Text, Badge, Avatar, Title, Button, Popover } from 'rizzui';
import {
  PiCalendarBold,
  PiTagFill,
  PiClipboardTextFill,
  PiUserCircleFill,
  PiCheckCircleFill,
  PiWarningCircleFill,
  PiClock,
  PiCalendarCheckBold,
  PiUser,
  PiChartBar,
  PiTag,
  PiCaretDown,
  PiCaretUp,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { formatDate } from '@core/utils/format-date';
import { Task, Student } from '@/data/all-tasks-data';
import Section from '../../../section';
import StudentPopover from '../../../student-popover';

interface TaskDetailsViewProps {
  task: Task;
  onClose?: () => void;
}

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 12:31:28');
const CURRENT_USER = 'abduraufdev77';

// Initial number of students to display
const INITIAL_STUDENT_COUNT = 4;

export default function TaskDetailsView({
  task,
  onClose,
}: TaskDetailsViewProps) {
  const [showAllStudents, setShowAllStudents] = useState(false);

  // Get color class based on urgency
  const getUrgencyColorClass = (urgency: string) => {
    switch (urgency) {
      case 'Urgent':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-500';
      case 'High':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500';
      case 'Normal':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500';
      case 'Low':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Get color class for status bar
  const getStatusColorClass = (status: number) => {
    if (status === 100) return 'bg-green-500';
    if (status >= 70) return 'bg-blue-500';
    if (status >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const date = new Date(task.dueDate);
  const now = CURRENT_DATE;
  const isOverdue = now > date;
  const isUpcoming = isWithinThreeDays(date, now);

  // Calculate days left or overdue
  const dayDifference = Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const renderDueStatus = () => {
    if (isOverdue) {
      return (
        <div className="flex items-center rounded-full bg-red-100 px-3 py-1 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <PiWarningCircleFill className="mr-1.5 h-4 w-4" />
          <span className="text-sm font-medium">
            {Math.abs(dayDifference)}{' '}
            {Math.abs(dayDifference) === 1 ? 'day' : 'days'} overdue
          </span>
        </div>
      );
    } else {
      return (
        <div
          className={cn(
            'flex items-center rounded-full px-3 py-1',
            isUpcoming
              ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
              : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500'
          )}
        >
          <PiCalendarCheckBold className="mr-1.5 h-4 w-4" />
          <span className="text-sm font-medium">
            {dayDifference} {dayDifference === 1 ? 'day' : 'days'} remaining
          </span>
        </div>
      );
    }
  };

  // Get students to display based on current state
  const displayedStudents = showAllStudents
    ? task.assignedStudents
    : task.assignedStudents.slice(0, INITIAL_STUDENT_COUNT);

  // Determine if we need to show "See All" button
  const hasMoreStudents = task.assignedStudents.length > INITIAL_STUDENT_COUNT;

  return (
    <div className="overflow-hidden rounded-xl bg-white pb-2 dark:bg-gray-900">
      {/* Header with colored background based on urgency */}
      <div className={cn('bg-mainBlue px-6 py-5 dark:bg-mainBlue/10')}>
        <div className="mb-2 flex items-center gap-2">
          <Badge
            variant="outline"
            className={getUrgencyColorClass(task.urgency)}
          >
            {task.urgency}
          </Badge>
          {renderDueStatus()}
        </div>
        <Title
          as="h2"
          className="text-xl font-semibold text-white dark:text-gray-600"
        >
          {task.title}
        </Title>
        <div className="mt-2 flex items-center text-sm text-white dark:text-gray-400">
          <PiCalendarBold className="mr-1" /> Due: {formatDate(date)}
        </div>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
        <Section
          title="Description"
          icon={<PiClipboardTextFill className="h-5 w-5" />}
        >
          <div className="rounded-lg border border-blue-600/30 bg-blue-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-mainBlue dark:text-gray-300">
              {task.description || 'No description provided.'}
            </p>
          </div>
        </Section>

        <Section
          title="Submission Status"
          icon={<PiChartBar className="h-5 w-5" />}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiCheckCircleFill
                className={cn(
                  'h-5 w-5',
                  task.status === 100
                    ? 'text-green-500'
                    : task.status >= 50
                      ? 'text-blue-500'
                      : 'text-yellow-500'
                )}
              />
              <Text className="text-sm">
                <span className="font-medium">{task.submittedCount}</span> of{' '}
                <span className="font-medium">{task.totalAssigned}</span>{' '}
                submitted
              </Text>
            </div>
            <Badge
              className={cn(
                'text-sm font-medium',
                task.status === 100
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : task.status >= 70
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : task.status >= 40
                      ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              )}
            >
              {task.status}% Complete
            </Badge>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className={cn(
                'h-full rounded-full',
                getStatusColorClass(task.status)
              )}
              style={{ width: `${task.status}%` }}
            />
          </div>
        </Section>

        {task.tags && task.tags.length > 0 && (
          <Section title="Tags" icon={<PiTag className="h-5 w-5" />}>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  size="md"
                  className="text-mainBlue/90"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Section>
        )}

        <Section
          title={`Assigned Students (${task.assignedStudents.length})`}
          icon={<PiUserCircleFill className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {displayedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {hasMoreStudents && (
            <div className="mt-4 text-center">
              <Button
                size="sm"
                variant="outline"
                className="mx-auto"
                onClick={() => setShowAllStudents(!showAllStudents)}
              >
                {showAllStudents ? (
                  <>
                    <PiCaretUp className="mr-1 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <PiCaretDown className="mr-1 h-4 w-4" />
                    See All {task.assignedStudents.length} Students
                  </>
                )}
              </Button>
            </div>
          )}
        </Section>

        <div className="mt-8 flex items-center justify-between border-t border-mainBlue/20 pt-4 dark:border-gray-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-mainBlue dark:text-gray-400">
              <PiClock className="h-3.5 w-3.5" />
              Created: {formatDate(new Date(task.createdAt))}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-green-800 dark:text-gray-400">
              <PiUser className="h-3.5 w-3.5" />
              Viewed by: {CURRENT_USER} on {formatDate(CURRENT_DATE)}
            </div>
          </div>
          <Text className="text-xs text-gray-600 dark:text-gray-500">
            Task ID: {task.id}
          </Text>
        </div>
      </div>
    </div>
  );
}

// Student Card Component with Popover
function StudentCard({ student }: { student: Student }) {
  return (
    <Popover enableOverlay={false} placement="bottom-start">
      <Popover.Trigger>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3 transition-colors hover:bg-blue-50/80 dark:border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Avatar
            src={student.avatar}
            name={student.name}
            className="h-10 w-10 border border-gray-200 dark:border-gray-700"
          />
          <div>
            <Text className="font-medium text-mainBlue dark:text-gray-600">
              {student.name}
            </Text>
            <div className="flex items-center gap-2">
              <Badge
                size="sm"
                variant="outline"
                color="success"
                className="py-0.5"
              >
                PU-{student.id}
              </Badge>
              {student.status && (
                <Badge
                  size="sm"
                  className={cn(
                    student.status === 'Completed'
                      ? 'bg-green-50 text-green-600'
                      : student.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-yellow-50 text-yellow-600'
                  )}
                >
                  {student.status}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Content className="z-[9999]">
        {({ setOpen }) => (
          <StudentPopover student={student} onClose={() => setOpen(false)} />
        )}
      </Popover.Content>
    </Popover>
  );
}

// Helper function to check if date is within 3 days
function isWithinThreeDays(date: Date, now: Date) {
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
  const diff = date.getTime() - now.getTime();
  return diff > 0 && diff <= threeDaysInMs;
}
