import AtRiskTrackerDashboard from '@/app/shared/analytics-reports/at-risk-tracker';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import {Select} from "rizzui";

export const metadata = {
  ...metaObject('Student At-risk Tracker'),
};

const pageHeader = {
  title: 'Student At-risk Tracker',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Analytics & Reports',
    },
    {
      name: 'At-risk Tracker',
    },
  ],
};

export default function AtRiskTrackerPage() {
  return (
    <>
      <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
      >
      </PageHeader>
      <AtRiskTrackerDashboard/>
    </>
  );
}
