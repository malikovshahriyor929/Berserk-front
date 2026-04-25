'use client';

import { useState } from 'react';
import { Button } from 'rizzui';
import hasSearchedParams from '@core/utils/has-searched-params';
import { CoursesData } from '@/data/filter-courses-data';
import shuffle from 'lodash/shuffle';
import { CourseCard } from '@core/components/cards/course-card';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';

let CURRENT_PAGE = 12;

export default function CoursesGrid() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(CURRENT_PAGE);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + CURRENT_PAGE);
    }, 600);
  }

  const filteredData = hasSearchedParams() ? shuffle(CoursesData) : CoursesData;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @container @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData?.slice(0, nextPage)?.map((course, index) => (
          <Link href={routes.courses.courseDetails(course.id)} key={course.id}>
            <CourseCard course={course} key={`filterProduct-${index}`} />
          </Link>
        ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button
            rounded="pill"
            isLoading={isLoading}
            onClick={() => handleLoadMore()}
            className="bg-mainBlue text-white hover:bg-mainBlue/90"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
