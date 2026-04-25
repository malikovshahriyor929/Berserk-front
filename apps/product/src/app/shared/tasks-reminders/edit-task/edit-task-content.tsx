'use client';

import PageHeader from '@/app/shared/page-header';
import EditTaskForm from './edit-task-form';

interface EditTaskContentProps {
  pageHeader: {
    title: string;
    breadcrumb: Array<{
      href?: string;
      name: string;
    }>;
  };
}

export default function EditTaskContent({
  pageHeader,
}: EditTaskContentProps) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="@container">
        <EditTaskForm />
      </div>
    </>
  );
}
