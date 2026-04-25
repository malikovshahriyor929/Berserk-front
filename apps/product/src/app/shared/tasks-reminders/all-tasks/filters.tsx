'use client';

import StatusField from '@core/components/controlled-table/status-field';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import cn from '@core/utils/class-names';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrashDuotone,
  PiCalendarBold,
  PiChartBarBold,
  PiAlarmBold,
} from 'react-icons/pi';
import { useMedia } from 'react-use';
import { Button, Flex, Input, Select } from 'rizzui';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

// Define SelectOption type
interface SelectOption {
  label: string;
  value: string | number;
}

// Define urgency options
const urgencyOptions = [
  { label: 'Urgent', value: 'Urgent' },
  { label: 'High', value: 'High' },
  { label: 'Normal', value: 'Normal' },
  { label: 'Low', value: 'Low' },
];

// Define status ranges
const statusOptions = [
  { label: 'Complete (100%)', value: 'complete' },
  { label: 'Almost Done (70-99%)', value: 'almost' },
  { label: 'In Progress (40-69%)', value: 'inprogress' },
  { label: 'Just Started (1-39%)', value: 'started' },
  { label: 'Not Started (0%)', value: 'not_started' },
];

// Due date options
const dueDateOptions = [
  { label: 'Overdue', value: 'overdue' },
  { label: 'Due Today', value: 'today' },
  { label: 'Due This Week', value: 'this_week' },
  { label: 'Due Next Week', value: 'next_week' },
];

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function TaskFilters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const isLarge = useMedia('(min-width: 1920px)', false);

  return (
    <Flex align="center" justify="between" className="mb-4 gap-0">
      <Flex align="center" className="w-auto flex-wrap">
        <Input
          type="search"
          placeholder="Search tasks..."
          value={(table.getState().globalFilter as string) ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        {isLarge && showFilters && <FilterElements table={table} />}
      </Flex>
      <Flex align="center" className="w-auto">
        <Button
          {...(!isLarge
            ? {
                onClick: () => {
                  setOpenDrawer(() => !openDrawer);
                },
              }
            : { onClick: () => setShowFilters(() => !showFilters) })}
          variant={'outline'}
          className={cn(
            'h-[34px] pe-3 ps-2.5',
            isLarge && showFilters && 'border-dashed border-gray-700'
          )}
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          {isLarge && showFilters ? 'Hide' : 'Filters'}
        </Button>

        {!isLarge && (
          <FilterDrawerView
            drawerTitle="Task Filters"
            isOpen={openDrawer}
            setOpenDrawer={setOpenDrawer}
          >
            <div className="grid grid-cols-1 gap-6">
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )}

        <ToggleColumns table={table} />
      </Flex>
    </Flex>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
}: TableToolbarProps<T>) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;

  return (
    <>
      <StatusField
        options={urgencyOptions}
        value={(table.getColumn('urgency')?.getFilterValue() as string[]) ?? []}
        onChange={(value) => table.getColumn('urgency')?.setFilterValue(value)}
        getOptionValue={(option: SelectOption) => option.value as string}
        getOptionDisplayValue={(option: SelectOption) => option.label}
        displayValue={(selected: string) => selected}
        dropdownClassName="!z-20 h-auto"
        className="ms-2 w-40"
        placeholder="Urgency Level"
        clearable={true}
      />

      <Select
        options={statusOptions}
        value={table.getColumn('status')?.getFilterValue() ?? ''}
        onChange={(value) => {
          table.getColumn('status')?.setFilterValue(value);
        }}
        className="ms-2 w-48"
        placeholder="Completion Status"
        prefix={<PiChartBarBold className="h-4 w-4 text-gray-500" />}
        clearable={true}
      />

      <Select
        options={dueDateOptions}
        value={table.getColumn('dueDate')?.getFilterValue() ?? ''}
        onChange={(value) => {
          table.getColumn('dueDate')?.setFilterValue(value);
        }}
        className="ms-2 w-40"
        placeholder="Due Date"
        prefix={<PiCalendarBold className="h-4 w-4 text-gray-500" />}
        clearable={true}
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          variant="flat"
          className="ms-2 h-9 bg-gray-200/70"
        >
          <PiTrashDuotone className="me-1.5 size-[17px]" /> Clear
        </Button>
      )}
    </>
  );
}
