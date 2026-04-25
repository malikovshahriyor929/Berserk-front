import ProjectDashboard from '@/app/shared/project-dashboard';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Task Overview & Dashboard'),
  description: 'Manage and track tasks effectively with the task overview dashboard.',
};
const pageHeader = {
  title: 'Task Overview',
  description: 'View and manage tasks across different projects and teams.',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Tasks & Reminders',
    },
    {
      name: 'Overview',
    },
  ],
};

export default function TaskOverviewPage() {
  return <ProjectDashboard />;
}
