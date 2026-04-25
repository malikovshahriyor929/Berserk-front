'use client';

import { useState } from 'react';
import { CoursesData } from '@/data/filter-courses-data';
import { Text, Badge, Button, Empty, EmptyProductBoxIcon } from 'rizzui';
import Card from '@/app/shared/card';
import {
  PiBookDuotone,
  PiCalendar,
  PiCalendarDuotone,
  PiClock,
  PiClockDuotone,
  PiFile,
  PiFileArchive,
  PiFileDocDuotone,
  PiFilePdf,
  PiFilePdfDuotone,
  PiPaperclipDuotone,
  PiPlayCircle,
  PiPlayCircleDuotone,
  PiVideo,
  PiVideoDuotone,
} from 'react-icons/pi';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { routes } from '@/config/routes';
import Image from 'next/image';

export default function CourseLessonsList() {
  const router = useRouter();
  const { courseId } = useParams();

  // Find the course by ID
  const course = CoursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <h2 className="text-xl">Course not found</h2>
        <Empty
          text="No Lessons Found"
          textClassName="mt-2"
          image={<EmptyProductBoxIcon />}
        />
      </div>
    );
  }

  // Generate lessons from the course syllabus and add additional lesson types
  // const lessons = course.lessons.map((lesson, index) => {

  //   return {
  //     id: index + 1,
  //     title: lesson.title,
  //     description: lesson.description || 'No description available',
  //     type: lesson.type,
  //     duration: lesson.duration,
  //     attachments:
  //       index % 2 === 0
  //         ? [
  //             {
  //               name: `${lesson.title.toLowerCase().replace(/\s+/g, '-')}-materials.pdf`,
  //               type: 'pdf',
  //               size: '2.4 MB',
  //             },
  //           ]
  //         : [],
  //     completed: lesson.completed || false,
  //     thumbnail: lesson.thumbnail,
  //   };
  // });

  const handleLessonClick = (lessonId: number) => {
    router.push(
      routes.courses.courseLessonDetails(
        courseId as string,
        lessonId.toString()
      )
    );
  };

  return (
    <div className="@container">
      {/* Course Overview */}
      <Card className="mb-8 p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="mb-3 flex flex-col items-center justify-start gap-0 lg:flex-row lg:justify-between lg:gap-2">
              <h1 className="mb-2 text-center text-xl font-bold text-mainBlue dark:text-gray-700 md:text-2xl">
                {course.title}
              </h1>
              <div className="flex items-center gap-2">
                {course.tags.map((tag) => (
                  <Badge
                    size="md"
                    key={tag}
                    variant="flat"
                    className="bg-green text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="mb-4 text-gray-600">{course.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="flex items-center text-mainBlue dark:text-gray-500"
              >
                <PiCalendarDuotone className="mr-1.5 h-5 w-5" />
                <Text>{course.duration}</Text>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center text-mainBlue dark:text-gray-500"
              >
                <PiClockDuotone className="mr-1.5 h-5 w-5" />
                <Text>{course.totalHours} total hours</Text>
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Lessons List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {course.lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
            onClick={() => handleLessonClick(lesson.id)}
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={course.thumbnail}
                alt={lesson.title}
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                {lesson.type === 'video' && (
                  <PiPlayCircleDuotone className="h-16 w-16 text-white opacity-80 transition-transform group-hover:scale-110" />
                )}
                {lesson.type === 'pdf' && (
                  <PiFilePdfDuotone className="h-16 w-16 text-white opacity-80 transition-transform group-hover:scale-110" />
                )}
                {lesson.type === 'text' && (
                  <PiFileDocDuotone className="h-16 w-16 text-white opacity-80 transition-transform group-hover:scale-110" />
                )}
              </div>
              {lesson.completed && (
                <div className="absolute right-3 top-3 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
                  Completed
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-mainBlue">
                {lesson.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                {lesson.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  {lesson.type === 'video' && (
                    <PiVideoDuotone className="mr-1 h-4 w-4" />
                  )}
                  {lesson.type === 'pdf' && (
                    <PiFilePdfDuotone className="mr-1 h-4 w-4" />
                  )}
                  {lesson.type === 'text' && (
                    <PiBookDuotone className="mr-1 h-4 w-4" />
                  )}
                  <span>{lesson.duration}</span>
                </div>
                {lesson.attachments ? (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-mainBlue/50 dark:border-gray-300"
                  >
                    <PiPaperclipDuotone className="mr-1 h-3 w-3" />
                    {lesson.attachments?.length}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-mainBlue/50 dark:border-gray-300"
                  >
                    <PiPaperclipDuotone className="mr-1 h-3 w-3" />
                    0
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
