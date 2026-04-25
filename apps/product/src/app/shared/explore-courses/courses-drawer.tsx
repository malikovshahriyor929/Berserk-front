'use client';

import { Button } from 'rizzui';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { PiSliders } from 'react-icons/pi';
import CoursesDrawerView from '@/app/shared/explore-courses/courses-drawer-view';

export default function CoursesDrawer() {
  const { openDrawer } = useDrawer();
  return (
    <Button
      rounded="pill"
      className="mt-6 flex w-full cursor-pointer @lg:mt-0 @lg:w-auto @[60rem]:hidden"
      onClick={() =>
        openDrawer({
          view: <CoursesDrawerView />,
          placement: 'right',
        })
      }
    >
      <PiSliders className="me-1 h-4 w-4 rotate-90" />
      Filters
    </Button>
  );
}
