'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Button } from 'rizzui';
import { AtRiskStudent } from './at-risk-data';
import TableAvatar from '@core/ui/avatar-card';
import { PiMessengerLogo, PiWarning } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';

const columnHelper = createColumnHelper<AtRiskStudent>();

export const createAtRiskColumns = (
  onSelectStudent: (student: AtRiskStudent) => void,
  selectedStudentId?: string
) => [
  columnHelper.accessor('name', {
    header: 'Student',
    cell: ({ row: { original } }) => {
      // Add highlight to the row content if this student is selected
      const isSelected = selectedStudentId === original.id;

      return (
        <div className={cn(isSelected ? '-m-3 rounded bg-blue-50 p-3' : '')}>
          <TableAvatar
            src={original.avatar}
            name={original.name}
            description={original.email}
          />
        </div>
      );
    },
    enableResizing: false,
    size: 240,
  }),
  columnHelper.accessor('riskScore', {
    header: 'Risk Score',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();
      let color = '';

      if (value >= 70) color = 'bg-red-500';
      else if (value >= 30) color = 'bg-amber-500';
      else color = 'bg-green-500';

      // Add highlight to the row content if this student is selected
      const isSelected = selectedStudentId === original.id;

      return (
        <div
          className={cn(
            'flex items-center gap-3',
            isSelected ? '-m-3 rounded bg-blue-50 p-3' : ''
          )}
        >
          <div
            className="h-full w-1.5 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <div className="font-semibold">{value}</div>
        </div>
      );
    },
    size: 110,
    sortDescFirst: true,
  }),
  columnHelper.accessor('indicators', {
    header: 'Risk Indicators',
    cell: ({ row: { original } }) => {
      const { rubricAverage, taskCompletion, missedSessions } =
        original.indicators;
      const isSelected = selectedStudentId === original.id;

      return (
        <div
          className={cn(
            'flex flex-col gap-1',
            isSelected ? '-m-3 rounded bg-blue-50 p-3' : ''
          )}
        >
          {rubricAverage < 60 && (
            <div className="flex items-center gap-1 text-sm">
              <PiWarning className="text-amber-500" />
              <span>Low rubric average: {rubricAverage}%</span>
            </div>
          )}
          {taskCompletion < 60 && (
            <div className="flex items-center gap-1 text-sm">
              <PiWarning className="text-amber-500" />
              <span>Poor task completion: {taskCompletion}%</span>
            </div>
          )}
          {missedSessions > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <PiWarning className="text-amber-500" />
              <span>Missed sessions: {missedSessions}</span>
            </div>
          )}
        </div>
      );
    },
    size: 220,
  }),
  columnHelper.accessor('riskLevel', {
    header: 'Risk Tag',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();
      let badgeClass = '';
      let badgeText = '';
      const isSelected = selectedStudentId === original.id;

      switch (value) {
        case 'high':
          badgeClass = 'bg-red-100 text-red-600';
          badgeText = 'High Risk';
          break;
        case 'medium':
          badgeClass = 'bg-amber-100 text-amber-600';
          badgeText = 'Medium Risk';
          break;
        case 'low':
          badgeClass = 'bg-green-100 text-green-600';
          badgeText = 'Low Risk';
          break;
      }

      return (
        <div className={cn(isSelected ? '-m-3 rounded bg-blue-50 p-3' : '')}>
          <Badge className={badgeClass}>{badgeText}</Badge>
        </div>
      );
    },
    size: 110,
  }),
  columnHelper.accessor('id', {
    header: 'Action',
    id: 'actions',
    cell: ({ row: { original } }) => {
      const isSelected = selectedStudentId === original.id;
      return (
        <div
          className={cn(
            'flex items-center gap-2',
            isSelected ? '-m-3 rounded bg-blue-50 p-3' : ''
          )}
        >
          <Button
            size="sm"
            variant={isSelected ? 'solid' : 'outline'}
            onClick={() => onSelectStudent(original)}
          >
            {isSelected ? 'Selected' : 'Details'}
          </Button>
          <Link href={routes.messages.inbox}>
            <Button size="sm" variant="outline" color="primary">
              <PiMessengerLogo />
            </Button>
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableResizing: false,
    size: 120,
  }),
];
