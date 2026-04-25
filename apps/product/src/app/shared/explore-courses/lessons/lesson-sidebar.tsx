// import { Course, Lesson } from '@/core/types/index';
import { Badge, Text, Tooltip } from 'rizzui';
import { PiFilePdf, PiVideo, PiCheck } from 'react-icons/pi';
import Image from 'next/image';
import CircleProgressBar from '@core/components/charts/circle-progressbar';
interface LessonSidebarProps {
  course: any;
  activeLesson: any;
  onSelectLesson: (lesson: any) => void;
}

function getProgressColor(status: string) {
  switch (status) {
    case 'ongoing':
      return '#EE5D26';
    case 'completed':
      return '#0DA000';
    case 'started':
      return '#EE201C';
    default:
      return '#484848';
  }
}

export default function LessonSidebar({
  course,
  activeLesson,
  onSelectLesson,
}: LessonSidebarProps) {
  // Calculate the progress circle SVG parameters
  const calculateProgressCircle = (percentage: number) => {
    const radius = 12;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return {
      radius,
      circumference,
      offset,
    };
  };

  return (
    <div className="overflow-hidden rounded-lg border border-mainBlue/20">
      {/* Course Completion Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center">
          <span className="mr-2 text-yellow-500">🏆</span>
          <h3 className="text-lg font-semibold">Course completion</h3>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {course.lessonsWatched}
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-mainBlue"
            style={{ width: `${course.overallProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm font-medium">
          {course.overallProgress}%
        </div>

        <div className="mt-4 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">
              Fantastic work {course.instructor.name},
            </span>{' '}
            <span className="text-yellow-500">🚀</span>{' '}
            {course.instructor.message}
          </p>
        </div>
      </div>

      {/* Lessons List */}
      <div className="p-3">
        {course.lessons.map((lesson: any) => {
          const isActive = lesson.id === activeLesson.id;
          const { radius, circumference, offset } = calculateProgressCircle(
            lesson.progressPercentage
          );

          return (
            <div
              key={lesson.id}
              className={`mb-2 cursor-pointer rounded-xl p-3 transition-colors border border-1 border-gray-200 ${
                isActive ? 'border-mainBlue/40 text-mainBlue bg-mainBlue/10' : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelectLesson(lesson)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Badge
                      variant='flat'
                      className={`${isActive ? 'bg-mainBlue/90 text-white' : 'bg-gray-100 text-gray-600 dark:text-gray-500'}`}
                    >
                      {lesson.id}
                    </Badge>
                  </div>
                  <div>
                    <h6 className={`font-normal ${isActive ? 'text-mainBlue' : 'text-gray-700'}`}>
                      {lesson.title}
                    </h6>
                    <div
                      className={`mt-1 flex items-center text-xs ${isActive ? 'text-mainBlue/80' : 'text-gray-500'}`}
                    >
                      {lesson.type === 'pdf' ? (
                        <PiFilePdf className="mr-1 h-3 w-3" />
                      ) : (
                        <PiVideo className="mr-1 h-3 w-3" />
                      )}
                      <span>{lesson.timeToComplete}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <div className="ps-4 text-[10px]">
                      <CircleProgressBar
                        size={40}
                        strokeWidth={4}
                        stroke="#f0f0f0"
                        percentage={lesson.progressPercentage}
                        label={`${lesson.progressPercentage}%`}
                        progressColor={getProgressColor('completed')}
                      />
                    </div>
                  ) : lesson.progressPercentage > 0 ? (
                    <Tooltip
                      content={`${lesson.progressPercentage}% completed`}
                    >
                      <div className="ps-4 text-[10px]">
                        <CircleProgressBar
                          size={40}
                          strokeWidth={4}
                          stroke="#f0f0f0"
                          percentage={lesson.progressPercentage}
                          label={`${lesson.progressPercentage}%`}
                          progressColor={getProgressColor('ongoing')}
                        />
                      </div>
                    </Tooltip>
                  ) : undefined}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
