import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import AssignTaskContent from '@/app/shared/tasks-reminders/assign-task/assign-task-content';

export const metadata = {
  ...metaObject('Assign Task'),
};

const pageHeader = {
  title: 'Assign Task',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Tasks & Reminders',
    },
    {
      name: 'Assign Task',
    },
  ],
};

export default function AssignTaskPage() {
  return <AssignTaskContent pageHeader={pageHeader} />;
}
