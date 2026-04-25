'use client';

import  {SessionDataType}  from './table';
import { routes } from '@/config/routes';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiEye,
  PiPencilSimple,
  PiTrash,
} from 'react-icons/pi';
import { ActionIcon, Text, Tooltip } from 'rizzui';
import { useState } from 'react';

const columnHelper = createColumnHelper<SessionDataType>();

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

function getProgressColor(status: string) {
  switch (status) {
    case 'upcoming':
      return '#EE5D26';
    case 'completed':
      return '#0DA000';
    case 'cancelled':
      return '#EE201C';
    default:
      return '#484848';
  }
}

export const sessionColumns = (expanded: boolean = true) => {
  const columns = [
    columnHelper.display({
      id: 'sessionId',
      size: 120,
      header: 'Session ID',
      cell: ({ row }) => (
        <Text className="font-medium">#{row.original.id}</Text>
      ),
    }),

    columnHelper.display({
      id: 'sessionInfo',
      size: 300,
      header: 'Session Details',
      enableSorting: false,
      cell: ({ row }) => (
        <TableAvatar
          src={row.original.sessionImage}
          name={row.original.sessionName}
          description={row.original.room}
        />
      ),
    }),

    columnHelper.display({
      id: 'totalStudents',
      size: 150,
      header: 'Total Students',
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row.original.totalStudents}
        </Text>
      ),
    }),

    columnHelper.accessor('sessionDate', {
      id: 'sessionDate',
      size: 200,
      header: 'Session Date',
      cell: ({ row }) => <DateCell date={new Date(row.original.sessionDate)} />,
    }),

    columnHelper.accessor('status', {
      id: 'status',
      size: 140,
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),

    columnHelper.display({
      id: 'progress',
      size: 150,
      header: 'Attendance Progress',
      cell: ({ row: { original } }) => {
        const getTooltipContent = () => {
          if (original.status === 'completed') {
            return `Attended: ${original.attendedStudents}, Excused: ${original.excusedStudents}, Absent: ${original.absentStudents}`;
          }
          return 'Session has not completed yet';
        };

        return (
          <div className=" flex items-center w-full ps-4 text-[10px]">
            <Tooltip content={getTooltipContent()} placement="top">
              <div>
                <CircleProgressBar
                  size={40}
                  strokeWidth={4}
                  stroke="#f0f0f0"
                  percentage={
                    original.status === 'completed' ? original.progress : 0
                  }
                  label={
                    original.status === 'completed'
                      ? `${original.progress}%`
                      : '0%'
                  }
                  progressColor={
                    original.status === 'completed'
                      ? getProgressColor(original.status)
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
      id: 'action',
      size: 150,
      header: 'Actions',
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <div className="flex items-center gap-2">
          <Tooltip content="View Details" placement="top">
            <ActionIcon
              size="sm"
              variant="outline"
              className="hover:bg-gray-50"
            >
              <PiEye className="size-4" />
            </ActionIcon>
          </Tooltip>

          <Tooltip content="Edit Session" placement="top">
            <ActionIcon
              size="sm"
              variant="outline"
              className="hover:bg-gray-50"
            >
              <PiPencilSimple className="size-4" />
            </ActionIcon>
          </Tooltip>

          <Tooltip content="Delete Session" placement="top">
            <ActionIcon
              size="sm"
              variant="outline"
              className="hover:bg-red-50 hover:text-red-600"
              onClick={() => meta?.handleDeleteRow?.(row.original)}
            >
              <PiTrash className="size-4" />
            </ActionIcon>
          </Tooltip>
        </div>
      ),
    }),
  ];

  return expanded ? [expandedSessionsColumns, ...columns] : columns;
};

const expandedSessionsColumns = columnHelper.display({
  id: 'expandedHandler',
  size: 60,
  cell: ({ row }) => (
    <>
      {row.getCanExpand() && (
        <ActionIcon
          size="sm"
          rounded="full"
          aria-label="Expand row"
          className="ms-2"
          variant={row.getIsExpanded() ? 'solid' : 'outline'}
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <PiCaretUpBold className="size-3.5" />
          ) : (
            <PiCaretDownBold className="size-3.5" />
          )}
        </ActionIcon>
      )}
    </>
  ),
});
