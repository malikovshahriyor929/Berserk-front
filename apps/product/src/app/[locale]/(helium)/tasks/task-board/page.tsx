import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import Kanban from '@/app/shared/tasks-reminders/kanban';
import { KanbanBoardProvider } from '@core/hooks/use-kanban-board';
export const metadata = {
  ...metaObject('Task Management Dashboard'),
};

const pageHeader = {
  title: 'Task Management',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Tasks & Reminders',
    },
    {
      name: 'Kanban Board',
    },
  ],
};

export default function TasksBoard() {
  return (
    <KanbanBoardProvider>
      <Kanban />
    </KanbanBoardProvider>
  );
}
