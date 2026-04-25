import PageHeader from '@/app/shared/page-header';
import AssessmentHistory from '@/app/shared/assessments/history/assessment-history';
import { metaObject } from '@/config/site.config';
import {Button} from "rizzui";
import ModalButton from "@shared//modal-button.tsx";
import AssessmentHistoryForm from "@shared//assessments/history/request-assesment.tsx";
export const metadata = {
  ...metaObject('Assessments History'),
  description: 'Review all rubric and test scores submitted over time.',
};
const pageHeader = {
  title: 'History of Assessments',
  description: 'Review all rubric and test scores submitted over time.',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Assessments',
    },
    {
      name: 'History',
    },
  ],
};

export default function AssessmentHistoryPage() {
  return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <ModalButton
              label="Add Assessment Entry"
              view={<AssessmentHistoryForm />}
              customSize={900}
          />
        </PageHeader>
        <AssessmentHistory />
      </>
  );
}
