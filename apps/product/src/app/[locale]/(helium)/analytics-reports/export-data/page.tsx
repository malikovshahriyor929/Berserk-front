import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Export Data'),
};

const pageHeader = {
  title: 'Export Data',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Analytics & Reports',
    },
    {
      name: 'Export Data',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
