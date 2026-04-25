import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import RubricScoring from '@/app/shared/assessments/scoring/rubric-scoring';

export const metadata = {
  ...metaObject('Scoring'),
};
const pageHeader = {
  title: 'Scoring Rubrics',
  description: 'Manage and create scoring rubrics for assessments.',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Assessments',
    },
    {
      name: 'Scoring Rubrics',
    },
  ],
};

export default function RubricScoringPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RubricScoring />
    </>
  );
}
