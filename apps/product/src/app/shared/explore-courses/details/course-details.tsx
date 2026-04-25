'use client';

import { useState } from 'react';
import { CoursesData } from '@/data/filter-courses-data';
import CourseHeader from './sections/course-header';
import CourseMedia from './sections/course-media';
import CourseSyllabus from './sections/course-syllabus';
import CourseIncludes from './sections/course-includes';
import CourseActions from './sections/course-actions';
import CourseStudents from './sections/assigned-students';
import { Course } from '@core/types';
import Card from '@/app/shared/card';

interface CourseDetailsProps {
  courseId: string;
}

const CourseDetails = ({ courseId }: CourseDetailsProps) => {

  // Find the course by ID using the passed courseId prop
  const course = CoursesData.find((course) => course.id === courseId) as Course;

  if (!course) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <h2 className="text-xl">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Course Header */}
          <CourseHeader course={course} />
          {/* Course Media Section */}
          <CourseSyllabus course={course} />
          {/* Course Students Section */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Media */}
          <CourseMedia course={course} />

          {/* Course Actions & Info */}
          <Card className="p-6">
            <CourseActions
              course={course}
              // onEnroll={() => setShowEnrollModal(true)}
            />
          </Card>

          {/* What's Included */}
          <CourseIncludes includes={course.includes} />
        </div>
      </div>
      <div className="my-10">
        <CourseStudents courseId={courseId} />
      </div>

    </div>
  );
};

export default CourseDetails;
