import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import RubricTemplatesPageContent from '@/app/shared/resources/rubric-templates';
export const metadata = {
  ...metaObject('Rubric Templates'),
  description: 'Templates for creating rubrics',
  keywords: 'rubric, templates, education, assessment, guidelines',
};

const pageHeader = {
  title: 'Rubric Templates',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Resources',
    },
    {
      name: 'Rubric Templates',
    },
  ],
};

export default function RubricTemplatesPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <RubricTemplatesPageContent />
    </>
  );
}
