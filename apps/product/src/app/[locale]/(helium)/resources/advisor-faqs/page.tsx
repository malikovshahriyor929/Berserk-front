import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import AdvisorFaqsPageContent from '@/app/shared/resources/advisor-faqs';
export const metadata = {
  ...metaObject('Advisor FAQs'),
  description: 'Frequently Asked Questions for Advisors',
  keywords: 'advisor, FAQs, frequently asked questions, education, support',
};

const pageHeader = {
  title: 'Advisor FAQs',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Resources',
    },
    {
      name: 'Advisor FAQs',
    },
  ],
};

export default function AdvisorFaqsPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <AdvisorFaqsPageContent />
    </>
  );
}
