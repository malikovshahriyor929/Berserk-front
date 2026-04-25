import CourseLessonsContent from '@/app/shared/explore-courses/lessons';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
type Props = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lessonId = (await params).lessonId;
  return metaObject(`Lesson ${lessonId}`);
}
export default function CourseLearningPage() {
  return (
    <div className="@container">
      <CourseLessonsContent/>
    </div>
  );
}
