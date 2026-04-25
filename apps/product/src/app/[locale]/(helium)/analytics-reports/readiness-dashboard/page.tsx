import ReadinessSummaryDashboard from '@/app/shared/analytics-reports/readiness-summary';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Student Readiness Summary'),
};

const pageHeader = {
  title: 'Student Readiness Summary',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Analytics & Reports',
    },
    {
      name: 'Readiness Summary',
    },
  ],
};

export default function ReadinessSummaryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      <ReadinessSummaryDashboard />
    </>
  );
}
