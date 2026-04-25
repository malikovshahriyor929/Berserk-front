'use client';

import PageHeader from '@/app/shared/page-header';
import AssignTaskForm from './assign-task-form';

interface AssignTaskContentProps {
  pageHeader: {
    title: string;
    breadcrumb: Array<{
      href?: string;
      name: string;
    }>;
  };
}

export default function AssignTaskContent({
  pageHeader,
}: AssignTaskContentProps) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="@container">
        <AssignTaskForm />
      </div>
    </>
  );
}
