'use client';

import { courseStudentsColumns } from './columns';
import {
  courseStudentsData,
  CourseStudentType,
} from '@/data/course-students-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import CourseStudentsFilters from './filters';
import { TableVariantProps } from 'rizzui';

interface CourseStudentsTableProps {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
  courseId: string;
}

export default function CourseStudentsTable({
  className,
  variant = 'elegant',
  hideFilters = false,
  hidePagination = true,
  courseId,
}: CourseStudentsTableProps) {
  const { table } = useTanStackTable<CourseStudentType>({
    tableData: courseStudentsData,
    columnConfig: courseStudentsColumns(),
    options: {
      enableColumnResizing: false,
      enableSorting: false,
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
    },
  });

  return (
    <div className={className}>
      {!hideFilters && <CourseStudentsFilters table={table} />}
      <Table
        table={table}
        variant={variant}
        classNames={{
          container: 'border border-muted rounded-md border-t-0',
          rowClassName: 'last:border-0',
        }}
      />
      {!hidePagination && <TablePagination table={table} className="py-4" />}
    </div>
  );
}
