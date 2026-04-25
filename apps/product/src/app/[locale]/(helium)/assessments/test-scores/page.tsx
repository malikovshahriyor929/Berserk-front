import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import TestScoreImport from '@/app/shared/assessments/test-score/test-score-import';

export const metadata = {
  ...metaObject('Students Test Scores'),
  description: 'Upload and manage test scores for students efficiently.',
};

const pageHeader = {
  title: 'Upload Test Scores',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Assessments',
    },
    {
      name: 'Upload Test Scores',
    },
  ],
};

export default function TestScoreImportPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TestScoreImport />
    </>
  );
}
