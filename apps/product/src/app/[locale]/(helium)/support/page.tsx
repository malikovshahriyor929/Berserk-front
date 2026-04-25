import HelpSupport from '@/app/shared/support/help-support';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
export const metadata = {
  ...metaObject('Support'),
};
const pageHeader = {
  title: 'Support Dashboard',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Help & Support',
    },
  ],
};

export default function SupportDashboardPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <HelpSupport />
    </>
  );
}
