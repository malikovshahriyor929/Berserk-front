'use client';

import { allTasksData, Task } from '@/data/all-tasks-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TaskFilters from './filters';
import { taskListColumns } from './columns';
import TablePagination from '@core/components/table/pagination';
import TableFooter from '@core/components/table/footer';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useState, useEffect } from 'react';
import ModalButton from '@/app/shared/modal-button';
import ExtendDeadlineView from './forms/extend-deadline-form';
import ReassignTaskForm from './forms/reassign-task-form';
import { PiCalendarPlusBold, PiArrowsDownUp } from 'react-icons/pi';

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 06:41:27');
const CURRENT_USER = 'abduraufdev77here';

export type TaskTableDataType = Task;

interface TaskTableProps {
  data?: TaskTableDataType[];
}

export default function TaskTable({ data = allTasksData }: TaskTableProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const { table, setData } = useTanStackTable<TaskTableDataType>({
    tableData: data,
    columnConfig: taskListColumns,
    options: {
      enableRowSelection: true,
      enableColumnResizing: false,
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
    },
  });

  // Set up custom filter functions
  useEffect(() => {
    const dueDateColumn = table.getColumn('dueDate');
    const statusColumn = table.getColumn('status');

    if (dueDateColumn) {
      dueDateColumn.columnDef.filterFn = (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const cellDate = new Date(row.getValue(columnId));
        const today = CURRENT_DATE;

        switch (filterValue) {
          case 'overdue':
            return cellDate < today;
          case 'today': {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return cellDate >= today && cellDate < tomorrow;
          }
          case 'this_week': {
            const endOfWeek = new Date(today);
            endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
            return cellDate >= today && cellDate <= endOfWeek;
          }
          case 'next_week': {
            const startOfNextWeek = new Date(today);
            startOfNextWeek.setDate(
              startOfNextWeek.getDate() + (8 - startOfNextWeek.getDay())
            );
            const endOfNextWeek = new Date(startOfNextWeek);
            endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
            return cellDate >= startOfNextWeek && cellDate <= endOfNextWeek;
          }
          default:
            return true;
        }
      };
    }

    if (statusColumn) {
      statusColumn.columnDef.filterFn = (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const status = row.getValue(columnId) as number;

        switch (filterValue) {
          case 'complete':
            return status === 100;
          case 'almost':
            return status >= 70 && status < 100;
          case 'inprogress':
            return status >= 40 && status < 70;
          case 'started':
            return status > 0 && status < 40;
          case 'not_started':
            return status === 0;
          default:
            return true;
        }
      };
    }
  }, [table]);

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Title,Urgency,DueDate,Status,SubmittedCount,TotalAssigned',
      `tasks_data_${selectedData.length}_${CURRENT_DATE.toISOString().slice(0, 10)}`
    );
  }

  return (
    <>
      <TaskFilters table={table} />

      {selectedRowIds.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <ModalButton
            label="Reassign Tasks"
            icon={<PiArrowsDownUp className="h-4 w-4" />}
            variant="outline"
            customSize={600}
            view={<ReassignTaskForm taskIds={selectedRowIds} />}
          >
            ({selectedRowIds.length})
          </ModalButton>

          <ModalButton
            label="Extend Deadline"
            icon={<PiCalendarPlusBold className="h-4 w-4" />}
            variant="outline"
            customSize={700}
            view={<ExtendDeadlineView defaultSelectedTasks={selectedRowIds} />}
          >
            ({selectedRowIds.length})
          </ModalButton>
        </div>
      )}

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
