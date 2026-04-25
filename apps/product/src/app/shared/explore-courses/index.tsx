import CoursesFilter from '@/app/shared/explore-courses/courses-filter';
import CoursesGrid from '@/app/shared/explore-courses/courses-grid';

export default function CoursesSearchPageView() {
  return (
    <>
      <CoursesFilter />
      <CoursesGrid />
    </>
  );
}
