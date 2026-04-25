import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import AddStudentForm from '@/app/shared/mystudents/add-student-form';
export const metadata = {
  ...metaObject('Add Student'),
};

const pageHeader = {
  title: 'Add Student',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.myStudents.myAssignedStudents,
      name: 'My Students',
    },
    {
      name: 'Add Student',
    },
  ],
};

export default function addStudentPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Upload File" className="mt-4 @lg:mt-0" />
      </PageHeader>
      <AddStudentForm/>
    </>
  );
}
