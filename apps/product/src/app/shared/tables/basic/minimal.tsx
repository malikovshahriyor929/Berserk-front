'use client';

import { allStudentsData } from '@/data/all-students-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { studentListColumns } from '../../mystudents/mystudents-list/columns';
import { StudentTableDataType } from '../../mystudents/mystudents-list/table';

export default function MinimalTable() {
  const { table, setData } = useTanStackTable<StudentTableDataType>({
    tableData: allStudentsData,
    columnConfig: studentListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
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
    <>
      <Table table={table} variant="minimal" />;
    </>
  );
}
