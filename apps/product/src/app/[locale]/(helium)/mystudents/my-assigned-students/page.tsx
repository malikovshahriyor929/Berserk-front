import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import StudentTable from '@/app/shared/mystudents/mystudents-list/table';
import { PiPlusBold, PiStudentBold } from 'react-icons/pi';
import { allStudentsData } from '@/data/all-students-data';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('My Assigned Students'),
};

const pageHeader = {
  title: 'My Students',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Students',
    },
    {
      name: 'My Assigned Students',
    },
  ],
};

const myStudentsData = allStudentsData;

export default function MyAssignedStudentsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={myStudentsData}
            fileName="my-students-data"
            header="ID,Name,Username,Avatar,Advisor,CEFR,GPA,Readiness Score,Status"
          />
          <Link
            href={routes.myStudents.addStudent}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Student
            </Button>
          </Link>
        </div>
      </PageHeader>

      <StudentTable data={myStudentsData} />
    </>
  );
}
