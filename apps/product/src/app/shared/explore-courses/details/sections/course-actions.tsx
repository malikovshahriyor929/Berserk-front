import { useState } from 'react';
import { Button, Text } from 'rizzui';
import { Course } from '@core/types';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import {
  PiBookBookmark,
  PiClock,
  PiHeart,
  PiHeartFill,
  PiShare,
  PiShoppingBag,
} from 'react-icons/pi';
import toast from 'react-hot-toast';

interface CourseActionsProps {
  course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Course link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-center gap-1 text-center">
        <PiClock className="h-5 w-5 text-gray-500" />
        <Text className="text-sm text-gray-500">
          Next course starts: {course.startDate}
        </Text>
      </div>

      <div className="space-y-3">
        <Link href={`/courses/${course.id}/learn`}>
          <Button
            size="lg"
            className="w-full bg-mainBlue hover:bg-mainBlue/90"
          >
            <PiShoppingBag className="mr-2 h-4 w-4" />
            Start Learning
          </Button>
        </Link>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 hover:border-mainBlue hover:text-mainBlue"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? (
              <PiHeartFill className="h-4 w-4 text-red-500" />
            ) : (
              <PiHeart className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 hover:border-mainBlue hover:text-mainBlue"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <PiBookBookmark
              className={`h-4 w-4 ${isBookmarked ? 'text-mainBlue' : ''}`}
            />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 hover:border-mainBlue hover:text-mainBlue"
            onClick={handleShare}
          >
            <PiShare className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 p-3">
        <Text className="text-center text-xs text-mainBlue">
          This course is available for free for all students
        </Text>
      </div>
    </div>
  );
};

export default CourseActions;
