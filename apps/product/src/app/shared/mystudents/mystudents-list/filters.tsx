'use client';

import { useState } from 'react';
import { useMedia } from 'react-use';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { Flex, Input, Select, Button } from 'rizzui';
import {
    PiFunnel,
    PiMagnifyingGlassBold,
    PiTrashDuotone
} from 'react-icons/pi';

import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import cn from '@core/utils/class-names';

interface TableToolbarProps<T extends Record<string, any>> {
    table: ReactTableType<T>;
}

export default function StudentFilters<TData extends Record<string, any>>({
                                                                              table,
                                                                          }: TableToolbarProps<TData>) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [showFilters, setShowFilters] = useState(true);
    const isLarge = useMedia('(min-width: 1920px)', false);

    return (
        <Flex
            align="center"
            justify="between"
            className="mb-4 flex items-center justify-between gap-3"
        >
            <Flex align="center" className="gap-2 flex-wrap">
                <Input
                    type="search"
                    placeholder="Search by name..."
                    value={table.getState().globalFilter ?? ''}
                    onClear={() => table.setGlobalFilter('')}
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                    inputClassName="h-9"
                    clearable
                    prefix={<PiMagnifyingGlassBold className="h-4 w-4 text-gray-500" />}
                />

                {isLarge && showFilters && <FilterElements table={table} />}
            </Flex>

            <Flex align="center" className="gap-2" justify="end">
                <Button
                    variant="outline"
                    className={cn(
                        'h-[34px] px-3 text-sm rounded-md',
                        isLarge && showFilters && 'border-dashed border-gray-700'
                    )}
                    onClick={() =>
                        isLarge ? setShowFilters(!showFilters) : setOpenDrawer(!openDrawer)
                    }
                >
                    <PiFunnel className="me-1.5 size-[18px] text-gray-600" strokeWidth={1.7} />
                    {isLarge && showFilters ? 'Hide Filters' : 'Filters'}
                </Button>

                {!isLarge && (
                    <FilterDrawerView
                        drawerTitle="Filter Students"
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
            <Select
                options={['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(
                    (v) => ({ label: v, value: v })
                )}
                value={table.getColumn('ieltsScore')?.getFilterValue() ?? ''}
                onChange={(val) => table.getColumn('ieltsScore')?.setFilterValue(val)}
                className="ms-2 w-36"
                placeholder="IELTS Score"
            />

            <Select
                options={['400', '450', '500', '550', '600', '650', '700', '750', '800'].map((v) => ({
                    label: v,
                    value: v,
                }))}
                value={table.getColumn('satMath')?.getFilterValue() ?? ''}
                onChange={(val) => table.getColumn('satMath')?.setFilterValue(val)}
                className="ms-2 w-36"
                placeholder="SAT Math"
            />

            <Select
                options={['400', '450', '500', '550', '600', '650', '700', '750', '800'].map((v) => ({
                    label: v,
                    value: v,
                }))}
                value={table.getColumn('satEnglish')?.getFilterValue() ?? ''}
                onChange={(val) => table.getColumn('satEnglish')?.setFilterValue(val)}
                className="ms-2 w-36"
                placeholder="SAT English"
            />

            <Select
                options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'].map((v) => ({
                    label: `${v}%`,
                    value: v,
                }))}
                value={table.getColumn('portfolioPercent')?.getFilterValue() ?? ''}
                onChange={(val) => table.getColumn('portfolioPercent')?.setFilterValue(val)}
                className="ms-2 w-36"
                placeholder="Preparation %"
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