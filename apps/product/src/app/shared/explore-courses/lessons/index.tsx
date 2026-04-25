'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { CoursesData } from '@/data/filter-courses-data';
import { PiArrowLeft } from 'react-icons/pi';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import LessonHeader from './lesson-header';
import LessonNavTabs from './lesson-nav-tabs';
import LessonContent from './lesson-content';
import LessonSidebar from './lesson-sidebar';

// Create a type for our lessons
interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'text';
  description: string;
  duration: string;
  progressPercentage: number;
  completed: boolean;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  attachments?: Array<{ name: string; type: string; size: string }>;
  timeToComplete?: string;
}

export default function CourseLearningPage() {
  const router = useRouter();
  const { courseId, lessonId } = useParams();
  const [activeTab, setActiveTab] = useState('tutorials');

  // Find the course
  const course = useMemo(() => {
    return CoursesData.find((c:any) => c.id === courseId);
  }, [courseId]);

  // Generate lessons from course syllabus
  const lessons = useMemo(() => {
    if (!course) return [];

    return course.lessons.map((lesson:any, index:number) => {
      return {
        id: index + 1,
        title: lesson.title || `Lesson ${index + 1}`,
        type:
          lesson.type ||
          (index % 3 === 0 ? 'video' : index % 3 === 1 ? 'pdf' : 'text'),
        description: lesson.description || `Lesson ${index + 1} description`,
        duration: lesson.duration || '00:00:00',
        progressPercentage: lesson.progressPercentage || 0,
        completed: lesson.completed || false,
        content: lesson.topics.join(' - ') + '. ' + course.description,
        videoUrl: lesson.videoUrl || (lesson.type === 'video' ? '/resources/sample.mp4' : undefined),
        pdfUrl: lesson.pdfUrl || (lesson.type === 'pdf' ? '/resources/sample.pdf' : undefined),
        attachments: lesson.attachments || [],
        // Assuming timeToComplete is derived from duration
        timeToComplete: lesson.duration,
      };
    });
  }, [course]);

  const activeLesson = useMemo(() => {
    if (!lessonId || !lessons.length) return null;
    return (
      lessons.find((l:any) => l.id === parseInt(lessonId as string, 10)) || null
    );
  }, [lessonId, lessons]);

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Course not found</h2>
          <Button
            variant="outline"
            onClick={() => router.push(routes.courses.allCourses)}
          >
            Back to All Courses
          </Button>
        </div>
      </div>
    );
  }

  if (!activeLesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Lesson not found</h2>
          <Button
            variant="outline"
            onClick={() =>
              router.push(routes.courses.courseLearning(courseId as string))
            }
          >
            Back to Lessons
          </Button>
        </div>
      </div>
    );
  }

  const handleNavigateBack = () => {
    router.push(routes.courses.courseLearning(courseId as string));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    router.push(
      routes.courses.courseLessonDetails(
        courseId as string,
        lesson.id.toString()
      )
    );
  };

  // Convert course to the format expected by existing components
  const formattedCourse = {
    id: course.id,
    title: course.title,
    subtitle: course.description?.substring(0, 100) + '...',
    description: course.description,
    overallProgress: Math.floor(
      lessons.reduce((acc:any, lesson:any) => acc + lesson.progressPercentage, 0) /
        lessons.length
    ),
    lessonsWatched: `${lessons.filter((l:any) => l.progressPercentage > 0).length}/${lessons.length} tutorials watched`,
    examDate: '2025-10-15',
    daysUntilExam: 92, // Just a placeholder
    instructor: {
      id: course.instructor.id,
      name: course.instructor.name,
      avatar: course.instructor.avatar,
      message:
        "You're well on your way to becoming an expert in this course. Your commitment to learning is truly impressive - finish strong! 💪",
    },
    lessons: lessons,
  };

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <LessonHeader course={formattedCourse} onBack={handleNavigateBack} />

      {/* Navigation Tabs */}
      <LessonNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Breadcrumb */}
      {/* <div className="container mx-auto flex items-center p-4 text-sm text-gray-600">
          Tutorials
        <span className="mx-2">{'>'}</span>
        <span>{activeLesson.title}</span>
      </div> */}

      <div className=" mx-auto flex flex-col gap-6 py-4 md:flex-row">
        {/* Main Content Area */}
        <div className="w-full md:w-3/4 lg:w-3/5">
          <LessonContent lesson={activeLesson} />
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 lg:w-2/5">
          <LessonSidebar
            course={formattedCourse}
            activeLesson={activeLesson}
            onSelectLesson={handleSelectLesson}
          />
        </div>
      </div>
    </div>
  );
}
