import PageHeader from '@/app/shared/page-header';
import CourseSearchPageView from '@/app/shared/explore-courses/index';
import CoursesDrawer from '@/app/shared/explore-courses/courses-drawer';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject("All Courses"),
};

const pageHeader = {
  title: 'All Courses',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: ' All Courses',
    },
  ],
};

export default function AllCoursesPage() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <CoursesDrawer />
      </PageHeader>
      <CourseSearchPageView />
    </div>
  );
}
