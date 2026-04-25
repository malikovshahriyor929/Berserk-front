import React from 'react';
import { Badge, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  PiBooks,
  PiBookBookmark,
  PiCertificate,
  PiStar,
  PiStarFill,
} from 'react-icons/pi';

// Define course type for better type checking
interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
}

interface CoursesTabProps {
  courses: Course[];
}

const CoursesTab: React.FC<CoursesTabProps> = ({ courses }) => {
  // Group courses by semester/year (just for demonstration - can be modified based on real data)
  const coursesByYear = {
    'Current Semester': courses.slice(0, 2),
    'Previous Semester': courses.slice(2),
  };

  // Get color theme based on grade
  const getGradeTheme = (grade : string) => {
    if (grade.startsWith('A')) {
      return {
        bgGradient:
          'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
        border: 'border-emerald-200 dark:border-emerald-800/30',
        badge:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        icon: 'text-emerald-500',
      };
    } else if (grade.startsWith('B')) {
      return {
        bgGradient:
          'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
        border: 'border-blue-200 dark:border-blue-800/30',
        badge:
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: 'text-blue-500',
      };
    } else if (grade.startsWith('C')) {
      return {
        bgGradient:
          'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
        border: 'border-amber-200 dark:border-amber-800/30',
        badge:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        icon: 'text-amber-500',
      };
    } else {
      return {
        bgGradient:
          'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
        border: 'border-red-200 dark:border-red-800/30',
        badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        icon: 'text-red-500',
      };
    }
  };

  // Render credit stars
  const renderCreditStars = (credits : number ) => {
    const stars = [];
    for (let i = 0; i < credits; i++) {
      stars.push(
        <PiStarFill
          key={i}
          className="h-3.5 w-3.5 text-amber-400 dark:text-amber-500"
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      {Object.entries(coursesByYear).map(([term, termCourses]) => (
        <div key={term}>
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-md bg-gray-100 p-1.5 dark:bg-gray-200">
              <PiBooks className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-600">
              {term}
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {termCourses.map((course, index) => {
              const theme = getGradeTheme(course.grade);

              return (
                <div
                  key={index}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border p-0.5 transition-all duration-200 hover:shadow-md',
                    theme.border
                  )}
                >
                  {/* Gradient background */}
                  <div
                    className={cn(
                      'absolute inset-0.5 rounded-[0.65rem] bg-gradient-to-br',
                      theme.bgGradient
                    )}
                  ></div>

                  {/* Course content */}
                  <div className="relative flex h-full flex-col rounded-[0.7rem] bg-white p-5 dark:bg-black/30">
                    <div className="mb-2 flex items-start justify-between">
                      <Badge
                        className="rounded-md text-xs font-bold tracking-wider dark:bg-blue-900/30 text-white dark:text-blue-400"
                        variant="flat"
                        color='info'
                      >
                        {course.code}
                      </Badge>
                      <Badge
                        className={cn('font-bold', theme.badge)}
                        variant="flat"
                      >
                        {course.grade}
                      </Badge>
                    </div>

                    <Title as="h3" className="mb-1 text-base font-semibold dark:text-white/80">
                      {course.name}
                    </Title>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1.5">
                        <PiCertificate className={cn('h-4 w-4', theme.icon)} />
                        <Text className="text-sm text-gray-600 dark:text-gray-500">
                          {course.credits}{' '}
                          {course.credits === 1 ? 'Credit' : 'Credits'}
                        </Text>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {renderCreditStars(course.credits)}
                      </div>
                    </div>
                  </div>

                  {/* Decorative book icon */}
                  <div className="absolute -right-2 -top-2 rotate-12 opacity-10 transition-all duration-300 group-hover:rotate-6 group-hover:opacity-20">
                    <PiBookBookmark className={cn('h-12 w-12', theme.icon)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesTab;
