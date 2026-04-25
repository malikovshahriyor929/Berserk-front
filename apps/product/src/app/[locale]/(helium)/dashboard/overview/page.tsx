import JobDashboard from '@/app/shared/job-board/dashboard';
import AppointmentDashboard from '@/app/shared/appointment/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Overview'),
};

export default function JobBoardPage() {
  return <AppointmentDashboard />;
}
