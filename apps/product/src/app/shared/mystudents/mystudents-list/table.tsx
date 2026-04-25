'use client';

import { allStudentsData } from '@/data/all-students-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import StudentFilters from './filters';
import { studentListColumns } from './columns';
import TablePagination from '@core/components/table/pagination';
import TableFooter from '@core/components/table/footer';
import { exportToCSV } from '@core/utils/export-to-csv';

export type StudentTableDataType = (typeof allStudentsData)[number];

interface StudentTableProps {
  data?: StudentTableDataType[];
}

export default function StudentTable({
  data = allStudentsData,
}: StudentTableProps) {
  const { table, setData } = useTanStackTable<StudentTableDataType>({
    tableData: data, // Use the data prop instead of directly using allStudentsData
    columnConfig: studentListColumns,
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
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Advisor,CEFR,GPA,Status,Score',
      `students_data_${selectedData.length}`
    );
  }

  return (
    <>
      <StudentFilters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0 hover:bg-gray-50 cursor-pointer',
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
