import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import GuidelinesPageContent from '@/app/shared/resources/guidelines';
export const metadata = {
  ...metaObject('Guidelines for Advisors'),
  description: 'Guidelines for advisors',
  keywords: 'advisor, guidelines, education, support',
};

const pageHeader = {
  title: 'Guidelines for Advisors',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Resources',
    },
    {
      name: 'Guidelines for Advisors',
    },
  ],
};

export default function GuidelinesPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <GuidelinesPageContent />
    </>
  );
}
