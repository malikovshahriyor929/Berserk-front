import { Button } from 'rizzui';
import { PiArrowLeft, PiBellSimple, PiCalendar, PiCalendarBlank } from 'react-icons/pi';
import { CoursesData } from '@/data/filter-courses-data';
interface LessonHeaderProps {
  course: any;
  onBack: () => void;
}

export default function LessonHeader({ course, onBack }: LessonHeaderProps) {
  return (
    <header>
      <div className="mx-auto py-4">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex items-start">
            <Button
              variant="text"
              className="mr-4 p-0 text-mainBlue dark:text-gray-600"
              onClick={onBack}
            >
              <PiArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-mainBlue dark:text-gray-700">
                {course.title}
              </h1>
              <p className="text-sm text-gray-500">{course.subtitle}</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-0">
            <Button className="flex items-center rounded-md border-0 bg-mainBlue text-white">
              <PiBellSimple className="mr-2 h-5 w-5" />
              <span>{course.daysUntilExam} days</span> until your exams
              <PiCalendarBlank className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
