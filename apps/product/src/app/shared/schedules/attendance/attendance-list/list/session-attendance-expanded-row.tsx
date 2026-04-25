'use client';

import { Row } from '@tanstack/react-table';
import Image from 'next/image';
import { PiFloppyDisk, PiUser, PiEye, PiPencilSimple } from 'react-icons/pi';
import { ActionIcon, Badge, Flex, Text, Title, Tooltip, Select, Popover, Button } from 'rizzui';
import { useEffect, useState } from 'react';

// Rating Bar Component
function RatingBar({ ratingCount }: { ratingCount: number }) {
  const { text, color } = getRatingStyles(ratingCount);
  return (
    <div className="space-y-2">
      <Text className="text-sm font-medium">{text}</Text>
      <Flex gap="1">
        {[...new Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-8 rounded-full bg-gray-100"
            style={{ backgroundColor: ratingCount > i ? color : '#f3f4f6' }}
          />
        ))}
      </Flex>
    </div>
  );
}

function getRatingStyles(v: number) {
  let text = '';
  let color = '';
  switch (v) {
    case 5:
      text = 'Perfect';
      color = '#0DA000';
      break;
    case 4:
      text = 'Very Good';
      color = '#29CCB1';
      break;
    case 3:
      text = 'Good';
      color = '#29CCB1';
      break;
    case 2:
      text = 'Bad';
      color = '#EE6D3D';
      break;
    case 1:
      text = 'Very Bad';
      color = '#EE6D3D';
      break;
    default:
      text = 'Not Rated';
      color = '#6B7280';
  }
  return { text, color };
}

function AttendanceStatusSelect({
  studentId,
  initialStatus,
  onStatusChange,
}: {
  studentId: string;
  initialStatus: string;
  onStatusChange: (status: string) => void;
}) {
  const localStorageKey = `attendanceStatus-${studentId}`;
  const [status, setStatus] = useState(initialStatus);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) setStatus(stored);
  }, [localStorageKey]);

  const statusOptions = [
    { label: 'Present', value: 'present', color: 'success' },
    { label: 'Absent', value: 'absent', color: 'danger' },
    { label: 'Excused', value: 'excused', color: 'warning' },
  ];

  const current = statusOptions.find((opt) => opt.value === status);

  const handleStatusChange = (
    value: string,
    setOpen: (open: boolean) => void
  ) => {
    setStatus(value);
    localStorage.setItem(localStorageKey, value);
    onStatusChange(value);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <Badge
        variant="flat"
        size="md"
        className={`rounded-md px-2 py-0.5 text-sm font-medium ${
          current?.color === 'success'
            ? 'bg-green-100 text-green-700'
            : current?.color === 'danger'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {current?.label}
      </Badge>

      <Popover>
        <Popover.Trigger>
          <Tooltip content="Edit Status" placement="top">
            <ActionIcon
              size="sm"
              variant="outline"
              className="hover:bg-gray-50"
            >
              <PiPencilSimple className="size-4" />
            </ActionIcon>
          </Tooltip>
        </Popover.Trigger>

        <Popover.Content>
          {({ setOpen }) => (
            <div className="w-40 space-y-2">
              {statusOptions.map((option) => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={status === option.value ? 'solid' : 'outline'}
                  className={`w-full ${
                    option.color === 'success'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : option.color === 'danger'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                  onClick={() => handleStatusChange(option.value, setOpen)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}


// Main Component
export function SessionAttendanceExpandedComponent<
  TData extends Record<string, any>,
>(row: Row<TData>) {
  const students = row?.original?.students;

  if (!Array.isArray(students) || students.length === 0) {
    return (
      <Flex align="center" justify="center">
        <Text className="p-4 text-2xl text-gray-500">
          No students available for this session.
        </Text>
      </Flex>
    );
  }

  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-[26px] py-4 dark:bg-gray-50">
      <div className="pb-4">
        <Title
          as="h5"
          className="mb-1 text-lg font-semibold text-mainBlue dark:text-gray-700"
        >
          Session Students
        </Title>
      </div>

      {students.map((student: any) => (
        <article
          key={student.id}
          className="flex items-center px-10 py-6 first-of-type:pt-2.5 last-of-type:pb-2.5"
        >
          <div className="w-full grid grid-cols-[1.5fr_1fr_2fr_1.5fr_auto] items-center gap-4 border-b px-10 py-4 last:border-none">
            {/* Student Avatar and Info */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  fill
                  className="object-cover"
                  src={student.avatar}
                  alt={student.name}
                  sizes="40px"
                />
              </div>
              <div className="min-w-0">
                <Title
                  as="h5"
                  className="truncate text-sm font-medium text-mainBlue dark:text-gray-700"
                >
                  {student.name}
                </Title>
                <Text className="truncate text-xs text-gray-500">
                  {student.email}
                </Text>
              </div>
            </div>

            {/* Group */}
            <div>
              <Tooltip content="Group" placement="top">
                <Badge
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium text-mainBlue"
                >
                  {student.group}
                </Badge>
              </Tooltip>
            </div>

            {/* Rating */}
            <div>
              <RatingBar ratingCount={student.rating} />
            </div>

            {/* Attendance Status */}
            <div>
              <AttendanceStatusSelect
                studentId={student.id}
                initialStatus={student.attendanceStatus}
                onStatusChange={(status) =>
                  console.log(
                    `Student ${student.name} status changed to:`,
                    status
                  )
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Tooltip content="View Details" placement="top">
                <ActionIcon
                  size="sm"
                  variant="outline"
                  className="hover:bg-gray-50"
                >
                  <PiEye className="size-4" />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
