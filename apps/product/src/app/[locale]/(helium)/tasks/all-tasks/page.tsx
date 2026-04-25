import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import TaskTable from '@/app/shared/tasks-reminders/all-tasks/table';
import { PiPlusBold, PiCardsBold } from 'react-icons/pi';
import { allTasksData } from '@/data/all-tasks-data';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('All Tasks'),
};

const pageHeader = {
  title: 'All Tasks',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.tasks.allTasks,
      name: 'Tasks',
    },
    {
      name: 'All Tasks',
    },
  ],
};

export default function AllTasksPage() {
  // Current system timestamp and user
  const CURRENT_DATE = new Date('2025-07-14 06:29:48');
  const CURRENT_USER = 'abduraufdev77';

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={allTasksData}
            fileName="all-tasks-data"
            header="ID,Title,Urgency,DueDate,Status,SubmittedCount,TotalAssigned"
          />
          {/* <Link href={routes.tasks.taskBoard} className="w-full @lg:w-auto">
            <Button variant="outline" as="span" className="w-full @lg:w-auto">
              <PiCardsBold className="me-1.5 h-[17px] w-[17px]" />
              View as Kanban
            </Button>
          </Link> */}
          <Link href={routes.tasks.assignTask} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Assign New Task
            </Button>
          </Link>
        </div>
      </PageHeader>

      <TaskTable />
    </>
  );
}
