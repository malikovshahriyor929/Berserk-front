import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
import CourseLessonsList from '@/app/shared/explore-courses/lessons/list/course-lessons-list';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
type Props = {
  params: Promise<{ courseId: string }> ;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseId = (await params).courseId;
  return metaObject(`Course Details: ${courseId}`);
}



export default async function CourseLearningPage({ params }: Props) {
  const  courseId  = (await params).courseId;

  const pageHeader = {
    title: 'Lessons',
    breadcrumb: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: routes.courses.allCourses,
        name: 'All Courses',
      },
      {
        href: routes.courses.courseDetails(courseId),
        name: 'Course Details',
      },
      {
        name: 'Lessons List',
      },
    ],
  };
  return (
    <div className="@container">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <CourseLessonsList />
    </div>
  );
}
