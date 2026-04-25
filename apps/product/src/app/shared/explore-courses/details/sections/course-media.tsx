import { Button, Text } from 'rizzui';
import { PiPlayBold } from 'react-icons/pi';
import { Course } from '@core/types';
import Card from '@/app/shared/card';
import toast from 'react-hot-toast';

interface CourseMediaProps {
  course: Course;
}

const CourseMedia: React.FC<CourseMediaProps> = ({ course }) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-video bg-gray-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-mainBlue p-0 hover:bg-mainBlue/90"
            onClick={() => {
              toast.success('Preview feature coming soon!');
            }}
          >
            <PiPlayBold className=" h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <Text className="text-sm">Preview this course</Text>
        </div>
      </div>
    </Card>
  );
};

export default CourseMedia;
