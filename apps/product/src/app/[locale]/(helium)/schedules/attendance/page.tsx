import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import AttendanceListTable from '@/app/shared/schedules/attendance/attendance-list/list/table';
import AttendanceStats from '@/app/shared/schedules/attendance/dashboard/attendance-stats';
import ExportButton from '@/app/shared/export-button';
import TotalAttendance from '@/app/shared/schedules/attendance/dashboard/total-attendance';
import { attendanceData } from '@/data/attendance-data';
export const metadata = {
  ...metaObject('Session Attandance'),
};

const pageHeader = {
  title: 'Attandance of Students ',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Session Attandance',
    },
  ],
};

export default function AttendancePage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="mb-0"
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* Additional buttons or actions can be added here */}
          <ExportButton
            data={attendanceData}
            fileName="event_data"
            header="ID,Title,Description,Location,Start,end"
          />
        </div>
      </PageHeader>
      <div className="flex h-full w-full flex-col gap-10 @container">
        <AttendanceStats />
        <TotalAttendance />
        <AttendanceListTable />
      </div>
    </>
  );
}
