import AppointmentDashboard from '@/app/shared/appointment/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject("Dashboard"),
};

export default function DashboardPage() {
  return <AppointmentDashboard />;
}
