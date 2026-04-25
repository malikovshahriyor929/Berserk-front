import Image from "next/image";
import cn from "../../utils/class-names";
import { Badge, Button, Tooltip } from "rizzui";
import { PiGraduationCap, PiVideoBold } from "react-icons/pi";
import { Course, Student } from "@core/types";
import { routes } from "@core/config/routes";
interface CourseProps {
  course: Course;
  className?: string;
  viewCourseContent?: (id: string) => void; // Function to handle viewing course content
}

export function CourseCard({
  course,
  className,
  viewCourseContent,
}: CourseProps) {
  return (
    <div
      className={cn(
        "group relative top-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-top-1 hover:border-mainBlue hover:shadow-lg dark:border-gray-700 dark:bg-gray-800",
        className
      )}
    >
      <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          alt={course.title}
          src={course.thumbnail}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {course.category && (
          <Badge
            variant="flat"
            className="absolute right-3 top-3 bg-white/90 text-mainBlue dark:bg-gray-900/90"
            rounded="lg"
          >
            {course.category}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1.5 line-clamp-2 text-base font-medium text-gray-900 group-hover:text-mainBlue dark:text-gray-100">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Image
                alt={course.instructor.name}
                src={course.instructor.avatar}
                width={28}
                height={28}
                className="rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-700"
              />
              <PiGraduationCap className="ml-1 h-4 w-4 text-gray-500" />
            </div>
            <Tooltip content="Course Instructor" placement="top">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {course.instructor.name}
              </span>
            </Tooltip>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              viewCourseContent?.(course.id); 
            }}
            variant="text"
            className="flex items-center text-xs text-gray-500 dark:text-gray-400 p-0"
          >
            <PiVideoBold className="mr-1 h-3.5 w-3.5" />
            <span>{course.courseContent}</span>
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-200 pt-3 dark:border-gray-700">
          <Badge
            variant="outline"
            className="border-mainBlue/30 text-mainBlue"
            rounded="lg"
          >
            {course.level}
          </Badge>

          <div className="flex items-center">
            {course.assignedStudents.length > 0 ? (
              <div className="flex items-center">
                {course.assignedStudents.map(
                  (student: Pick<Student, 'id' | 'avatar' | 'username'>, index: number) => (
                    <Tooltip
                      key={student.id}
                      content={student.username}
                      placement="top"
                      size="sm"
                    >
                      <div
                        className="relative"
                        style={{
                          marginRight:
                            index < course.assignedStudents.length - 1
                              ? "-8px"
                              : "0",
                          zIndex: course.assignedStudents.length - index,
                        }}
                      >
                        <Image
                          src={typeof student.avatar === 'string' ? student.avatar : (student.avatar as any)?.file_name ?? ''}
                          width={28}
                          height={28}
                          className="rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-700"
                          alt={student.username ?? ''}
                        />
                      </div>
                    </Tooltip>
                  )
                )}
                {course.assignedStudents.length > 3 && (
                  <Badge
                    variant="flat"
                    className="ml-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    rounded="pill"
                  >
                    +{course.assignedStudents.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
