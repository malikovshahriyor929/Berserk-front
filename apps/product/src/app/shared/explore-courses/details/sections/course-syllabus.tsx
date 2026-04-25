import { useRef, useState } from 'react';
import { Text, Title } from 'rizzui';
import {
  PiBookBookmarkDuotone,
  PiCaretDownBold,
  PiCaretUpBold,
  PiCheck,
} from 'react-icons/pi';
import { Course } from '@core/types';
import Card from '@/app/shared/card';
import Section from '@/app/shared/section';

interface CourseSyllabusProps {
  course: Course;
}

const CourseSyllabus: React.FC<CourseSyllabusProps> = ({ course }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleDayExpansion = (day: number, idx: number) => {
    setExpandedDay((prev) => {
      const newDay = prev === day ? null : day;
      setTimeout(() => {
        if (newDay !== null && itemRefs.current[idx] && containerRef.current) {
          const item = itemRefs.current[idx];
          const container = containerRef.current;
          const itemTop = item!.offsetTop;
          container.scrollTo({
            top: itemTop,
            behavior: 'smooth',
          });
        }
      }, 200); 
      return newDay;
    });
  };

  return (
    <Card className="p-6">
      <Section
        title="Course Syllabus"
        icon={<PiBookBookmarkDuotone className="h-5 w-5" />}
        additional={
          <Text className="text-sm text-mainBlue dark:text-gray-500">
            {course.totalDays} days • {course.totalHours} hours total
          </Text>
        }
        className="mb-6"
      >
        <div
          className="max-h-[550px] space-y-4 overflow-y-auto"
          ref={containerRef}
        >
          {course.syllabus.map((item, idx) => {
            const isExpanded = expandedDay === item.day;
            return (
              <div
                key={item.day}
                className="overflow-clip rounded-lg"
                // ref={el => (itemRefs.current[idx] = el)}
              >
                <div
                  className={`flex cursor-pointer items-center justify-between p-4 transition-transform duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-200 ${isExpanded ? 'bg-gray-50' : ''}`}
                  onClick={() => toggleDayExpansion(item.day, idx)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Text className="text-sm font-medium text-mainBlue dark:text-gray-600">
                        Lesson {item.day}
                      </Text>
                    </div>
                    <div>
                      <Text className="font-medium text-mainBlue dark:text-gray-600">
                        {item.title}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-mainBlue dark:text-gray-500">
                    <span>{item.duration}</span>
                    <span>{item.time}</span>
                    {isExpanded ? (
                      <PiCaretUpBold className="h-4 w-4" />
                    ) : (
                      <PiCaretDownBold className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div
                  className={`overflow-hidden border-t border-mainBlue/20 bg-gray-50 px-4 transition-all duration-300 ease-in-out dark:border-gray-200`}
                  style={{
                    maxHeight: isExpanded ? 500 : 0,
                    paddingBottom: isExpanded ? 16 : 0,
                    paddingTop: isExpanded ? 16 : 0,
                  }}
                >
                  <div>
                    <Text className="mb-2 text-sm font-medium text-green">
                      Topics covered:
                    </Text>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {item.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <PiCheck className="h-3 w-3 text-green" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </Card>
  );
};

export default CourseSyllabus;
