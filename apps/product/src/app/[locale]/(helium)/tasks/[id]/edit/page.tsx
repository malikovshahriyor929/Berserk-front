import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import EditTaskContent from '@/app/shared/tasks-reminders/edit-task/edit-task-content';

export const metadata = {
  ...metaObject('Edit Task'),
};

const pageHeader = {
  title: 'Edit Task',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Tasks & Reminders',
    },
    {
      name: 'Edit Task',
    },
  ],
};

export default function EditTaskPage() {
  return <EditTaskContent pageHeader={pageHeader} />;
}
