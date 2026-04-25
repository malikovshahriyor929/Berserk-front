'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text, Badge, Button } from 'rizzui';
import { StudentReadiness } from './student-readiness-data';
import TableAvatar from '@core/ui/avatar-card';
import { PiArrowDown, PiArrowUp } from 'react-icons/pi';

const columnHelper = createColumnHelper<StudentReadiness>();

export const studentReadinessColumns = [
  columnHelper.accessor('id', {
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
    enableSorting: false,
    enableResizing: false,
    size: 40,
  }),
  columnHelper.accessor('name', {
    header: 'Student',
    cell: ({ row: { original } }) => (
      <TableAvatar
        src={original.avatar}
        name={original.name}
        description={original.email}
      />
    ),
    enableResizing: false,
    size: 250,
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
    cell: ({ getValue }) => getValue(),
    size: 100,
  }),
  columnHelper.accessor('readiness', {
    header: 'Readiness',
    cell: ({ getValue }) => {
      const value = getValue();
      return <Text className="font-medium">{value}%</Text>;
    },
    size: 100,
  }),
  columnHelper.accessor('growth', {
    header: 'Growth',
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="flex items-center gap-1">
          {value > 0 ? (
            <>
              <PiArrowUp className="h-4 w-4 text-green-600" />
              <Text className="font-medium text-green-600">+{value}%</Text>
            </>
          ) : value < 0 ? (
            <>
              <PiArrowDown className="h-4 w-4 text-red-600" />
              <Text className="font-medium text-red-600">{value}%</Text>
            </>
          ) : (
            <Text className="font-medium text-gray-500">0%</Text>
          )}
        </div>
      );
    },
    size: 100,
  }),
  columnHelper.accessor('academicScore', {
    header: 'Academic',
    cell: ({ getValue }) => (
      <div className="relative h-2 w-full max-w-xs rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-blue-600"
          style={{ width: `${getValue()}%` }}
        />
        <span className="absolute left-0 top-0 -mt-6 text-sm">
          {getValue()}%
        </span>
      </div>
    ),
    size: 150,
  }),
  columnHelper.accessor('careerScore', {
    header: 'Career',
    cell: ({ getValue }) => (
      <div className="relative h-2 w-full max-w-xs rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-amber-500"
          style={{ width: `${getValue()}%` }}
        />
        <span className="absolute left-0 top-0 -mt-6 text-sm">
          {getValue()}%
        </span>
      </div>
    ),
    size: 150,
  }),
  columnHelper.accessor('socialScore', {
    header: 'Social',
    cell: ({ getValue }) => (
      <div className="relative h-2 w-full max-w-xs rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-indigo-500"
          style={{ width: `${getValue()}%` }}
        />
        <span className="absolute left-0 top-0 -mt-6 text-sm">
          {getValue()}%
        </span>
      </div>
    ),
    size: 150,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue();
      let badgeClass = '';
      let badgeText = '';

      switch (value) {
        case 'on-track':
          badgeClass = 'bg-green-100 text-green-600';
          badgeText = 'On Track';
          break;
        case 'at-risk':
          badgeClass = 'bg-red-100 text-red-600';
          badgeText = 'At Risk';
          break;
        case 'needs-attention':
          badgeClass = 'bg-amber-100 text-amber-600';
          badgeText = 'Needs Attention';
          break;
        default:
          badgeClass = 'bg-gray-100 text-gray-600';
          badgeText = value;
      }

      return <Badge className={badgeClass}>{badgeText}</Badge>;
    },
    size: 140,
  }),
  columnHelper.accessor('id', {
    header: '',
    id: 'actions',
    cell: () => (
      <div className="flex justify-end">
        <Button size="sm" variant="outline">
          Details
        </Button>
      </div>
    ),
    enableSorting: false,
    enableResizing: false,
    size: 80,
  }),
];
