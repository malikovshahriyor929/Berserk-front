'use client';

import { Text, Badge, Avatar, Tooltip } from 'rizzui';
import { PiEnvelope, PiEnvelopeBold, PiPhone, PiPhoneBold, PiXBold } from 'react-icons/pi';
import { formatDate } from '@core/utils/format-date';
import { Student, StudentStatus } from '@/data/all-tasks-data';
import {Link} from '@/i18n/routing';
import { routes } from '@/config/routes';
// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 11:41:15');
const CURRENT_USER = 'abduraufdev77';

// Get status badge for student completion
function getStudentStatusBadge(status: StudentStatus | undefined) {
  if (!status) return <Badge color="secondary">Unknown</Badge>;

  switch (status.toLowerCase()) {
    case 'completed':
      return <Badge color="success">Completed</Badge>;
    case 'in progress':
      return <Badge color="info" className='bg-blue-600'>In Progress</Badge>;
    case 'not started':
      return <Badge color="warning">Not Started</Badge>;
    default:
      return <Badge color="secondary">{status}</Badge>;
  }
}

interface StudentPopoverProps {
  student: Student;
  onClose?: () => void;
}

export default function StudentPopover({
  student,
  onClose,
}: StudentPopoverProps) {
  const completionStatus = student.status || 'Not Started';
  const completedDate = student.completedDate
    ? new Date(student.completedDate)
    : null;
  const startedDate = student.startedDate
    ? new Date(student.startedDate)
    : null;
  const groupCode = student.groupCode || 'N/A';

  return (
    <div className="font-geist w-64 p-1">
      <div className="mb-3 flex items-center gap-3">
        <Link
          href={routes.myStudents.details(student.id)}
          className="flex items-center"
        >
          <Avatar
            name={student.name}
            src={student.avatar}
            className="ring-2 ring-blue-500 ring-offset-2"
            size="lg"
          />
        </Link>
        <div className="flex-1 items-center justify-between space-y-1">
          <Link
            href={routes.myStudents.details(student.id)}
            className="flex items-center"
          >
            <Tooltip
              placement="right"
              size="sm"
              color="secondary"
              content="View Profile"
            >
              <Text className="text-base font-semibold text-mainBlue dark:text-gray-600">
                {student.name}
              </Text>
            </Tooltip>
          </Link>
          <div className="flex items-center gap-2">
            <Tooltip
              placement="bottom-start"
              size="sm"
              color="secondary"
              content="Student ID"
            >
              <Badge size="sm" variant="outline" color="success">
                PU-{student.id}
              </Badge>
            </Tooltip>
            <Tooltip
              placement="right"
              size="sm"
              color="secondary"
              content="Group/Class Code"
            >
              <Badge size="sm" variant="outline" color="info">
                {groupCode}
              </Badge>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <Text className="text-sm font-medium text-mainBlue dark:text-gray-600">
            Status:
          </Text>
          {getStudentStatusBadge(completionStatus as StudentStatus)}
        </div>
        {completedDate && (
          <div className="flex items-center justify-between">
            <Text className="text-sm font-medium text-mainBlue dark:text-gray-600">Completed on:</Text>
            <Text className="text-xs text-gray-600">
              {formatDate(completedDate)}
            </Text>
          </div>
        )}
        {startedDate && !completedDate && (
          <div className="flex items-center justify-between">
            <Text className="text-sm font-medium text-mainBlue dark:text-gray-600">Started on:</Text>
            <Text className="text-xs text-gray-600">
              {formatDate(startedDate)}
            </Text>
          </div>
        )}
      </div>
      <div className="space-y-1 border-t border-mainBlue/20 pt-3">
        <div className="flex items-center gap-2 text-sm">
          <PiEnvelope className="h-5 w-5 text-gray-600" />
          <Tooltip placement="top"
              size="sm"
              color="secondary"
              content="Open chat" >
            <Link href={routes.messages.inbox}>
              <Text>{student.email || `${student.id}@newuu.uz`}</Text>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
