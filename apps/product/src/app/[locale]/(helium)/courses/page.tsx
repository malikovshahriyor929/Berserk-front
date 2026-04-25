import { metaObject } from '@/config/site.config';
import ExecutiveDashboard from '@/app/shared/executive';

export const metadata = {
  ...metaObject('Course Statistics'),
};

export default function CourseStatistics() {
  return <ExecutiveDashboard />;
}

