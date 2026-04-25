import { Avatar, Badge, Popover, Text, Title } from 'rizzui';
import {
  PiBooks,
  PiCalendar,
  PiGlobe,
  PiStarBold,
  PiStarFill,
  PiUsers,
} from 'react-icons/pi';
import { Course } from '@core/types';
import Card from '@/app/shared/card';
import { Tooltip } from 'rizzui';
import InstructorPopover from '../../../instructor-popover';
interface CourseHeaderProps {
  course: Course;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-mainBlue text-2xl font-bold text-white">
            <PiBooks className="h-8 w-8" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-mainBlue/30 text-mainBlue"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Title
            as="h1"
            className="mb-4 text-3xl font-bold text-mainBlue dark:text-gray-700"
          >
            {course.title}
          </Title>
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 text-purple-700">
              <PiUsers className="h-4 w-4" />
              <span>
                {course.students?.length ||
                  course.assignedStudents?.length ||
                  0}{' '}
                students
              </span>
            </div>
            <div className="flex items-center gap-1 text-green-700">
              <PiCalendar className="h-4 w-4" />
              <span>
                {course.registeredUpcoming || 0} registered for upcoming
              </span>
            </div>
            <div className="flex items-center gap-1">
              <PiGlobe className="h-4 w-4" />
              <span>{course.language}</span>
            </div>
            <div className="flex items-center gap-1">
              <PiStarFill className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>{course.rating}</span>
              <span>({course.reviews} reviews)</span>
            </div>
          </div>
          <Text className="mb-4 leading-relaxed text-gray-600">
            {course.description}
          </Text>
          <div className="flex items-center gap-3">
            {/* <Avatar
              src={course.instructor.avatar}
              name={course.instructor.name}
              size="sm"
            /> */}
            <Popover
              key={course.instructor.id}
              enableOverlay={false}
              placement="bottom"
            >
              <Popover.Trigger>
                <div className="relative cursor-pointer">
                  <Avatar
                    src={course.instructor.avatar}
                    name={course.instructor.name}
                    className="border-2 border-white ring-1 ring-transparent transition hover:z-10 hover:ring-mainBlue"
                  />
                </div>
              </Popover.Trigger>
              <Popover.Content className="z-[999]">
                {({ setOpen }) => (
                  <InstructorPopover
                    instructor={course.instructor}
                    onClose={() => setOpen(false)}
                  />
                )}
              </Popover.Content>
            </Popover>
            <div>
              <Text className="font-medium text-mainBlue">{course.instructor.name}</Text>
              <Text className="text-xs text-gray-500">
                {course.instructor.title}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseHeader;
