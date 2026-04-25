'use client';

import { useEffect, useState } from 'react';
import { useFilterControls } from '@core/hooks/use-filter-control';
import { useSearchParams } from 'next/navigation';
import CoursesFilterDropdown from '@/app/shared/explore-courses/courses-filter-dropdown';
import { initialState } from '@/app/shared/explore-courses/courses-filter-utils';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { PiTrashDuotone } from 'react-icons/pi';
import { CoursesFilterTags } from './courses-filter-tags';

export default function CoursesFilter() {
  const searchParams = useSearchParams();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const { state, applyFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  useEffect(() => {
    const items: string[] = [];
    searchParams.forEach((item) => items.push(item));
    setHasQueryParams(Boolean(items.length));
  }, [searchParams]);

  return (
    <div
      className={cn(
        'flex items-center justify-between pb-5'
      )}
    >
      <div className="px-1">
        <CoursesFilterTags />
      </div>
      <div className="flex items-center gap-3">
        {hasQueryParams && (
          <Button
            type="button"
            className="h-9 rounded-full hover:text-mainBlue"
            variant="outline"
            onClick={() => reset()}
          >
            <PiTrashDuotone className="me-2 h-4 w-4" />
            Clear
          </Button>
        )}
        <CoursesFilterDropdown
          className="rounded-full border-gray-200 hover:border-mainBlue dark:border-gray-700"
          state={state}
          applyFilter={applyFilter}
        />
      </div>
    </div>
  );
}
