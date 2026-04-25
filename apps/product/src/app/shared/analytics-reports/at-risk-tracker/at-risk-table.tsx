'use client';

import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import Table from '@core/components/table';
import { createAtRiskColumns } from './at-risk-columns';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import TablePagination from '@core/components/table/pagination';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { AtRiskStudent } from './at-risk-data';
import { useState } from 'react';

interface AtRiskTableProps {
  className?: string;
  students: AtRiskStudent[];
  onSelectStudent: (student: AtRiskStudent) => void;
  selectedStudentId?: string;
}

export default function AtRiskTable({
  className,
  students,
  onSelectStudent,
  selectedStudentId,
}: AtRiskTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = createAtRiskColumns(onSelectStudent, selectedStudentId);

  const { table } = useTanStackTable({
    tableData: students,
    columnConfig: columns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
        globalFilter: searchTerm,
      },
    },
  });

  return (
    <WidgetCard
      title="At-Risk Students"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
      action={
        <Input
          type="search"
          placeholder="Search students..."
          value={searchTerm}
          onClear={() => {
            setSearchTerm('');
            table.setGlobalFilter('');
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
      }
    >
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
