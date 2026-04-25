'use client';

import { sessionColumns } from './columns';
import { attendanceData } from '@/data/attendance-data';
import Table from '@core/components/table';
import { SessionAttendanceExpandedComponent } from './session-attendance-expanded-row';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import SessionFilters from './filters';
import { TableVariantProps } from 'rizzui';
import CustomerList from './test/index'
export type SessionDataType = (typeof attendanceData)[number];
export type AttendanceDataType = (typeof attendanceData)[number];

export default function SessionTable({
  className,
  variant = 'elegant',
  hideFilters = false,
  hidePagination = false,
}: {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const { table, setData } = useTanStackTable<SessionDataType>({
    tableData: attendanceData,
    columnConfig: sessionColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <div className={className}>
      {!hideFilters && <SessionFilters table={table} />}
      <Table
        table={table}
        variant={variant}
        classNames={{
          container: 'border border-muted rounded-md border-t-0',
          rowClassName: 'last:border-0',
        }}
        components={{
          expandedComponent: SessionAttendanceExpandedComponent,
        }}
      />
      {!hidePagination && <TablePagination table={table} className="py-4" />}
    </div>
  );
}
