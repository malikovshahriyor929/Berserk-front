import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
import CourseDetails from '@/app/shared/explore-courses/details/course-details';
import CoursesDrawer from '@/app/shared/explore-courses/courses-drawer';
import { metaObject } from '@/config/site.config';

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseId = (await params).courseId;
  return metaObject(`Course Details: ${courseId}`);
}

export default async function CourseDetailsPage({ params }: Props) {
  const  courseId  =  (await params).courseId;
  
  const pageHeader = {
    title: 'Course Details',
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/courses/all-courses',
        name: 'All Courses',
      },
      {
        name: 'Course Details',
      },
    ],
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <CoursesDrawer />
      </PageHeader>
      <CourseDetails courseId={courseId} />
    </div>
  );
}