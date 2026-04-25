import Card from '@/app/shared/card';
import { Title } from 'rizzui';
import CourseStudentsTable from '../assigned-students/table';
import { PiUsersBold, PiUsersThreeBold } from 'react-icons/pi';
import Section from '@/app/shared/section';

interface CourseStudentsProps {
  courseId: string;
}

export default function CourseStudents({ courseId }: CourseStudentsProps) {
  return (
    <Card className="p-6">
      <Section
        title="Students"
        icon={<PiUsersThreeBold className="h-5 w-5" />}
        className="mb-6"
      >
        <CourseStudentsTable courseId={courseId} />
      </Section>
    </Card>
  );
}
