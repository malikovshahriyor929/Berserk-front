import { PiDownloadSimpleBold } from 'react-icons/pi';
import StudentProfile from '@/app/shared/mystudents/student-profile/student-profile';
import PrintButton from '@/app/shared/print-button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Student Profile'),
};

const pageHeader = {
  title: 'Student Profile',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Students',
    },
    {
      name: 'Student Profile',
    },
  ],
};

export default function StudentDetailsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Export PDF
          </Button>
        </div>
      </PageHeader>

      <StudentProfile />
    </>
  );
}
