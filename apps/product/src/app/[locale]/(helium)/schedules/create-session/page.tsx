import { metaObject } from '@/config/site.config';
import EventCalendarView from '@/app/shared/event-calendar';
import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import EventForm from '@/app/shared/event-calendar/event-form';

export const metadata = {
  ...metaObject('New Session with Students'),
};

const pageHeader = {
  title: 'New Session',
  breadcrumb: [
    {
      href: routes.file.dashboard,
      name: 'Home',
    },
    {
      href: routes.eventCalendar,
      name: 'New Session with Students',
    },
  ],
};

export default function EventCalendarPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ModalButton
            label="Create Event"
            view={<EventForm />}
            customSize={900}
            className="mt-0 w-full @lg:w-auto"
          />
        </div>
      </PageHeader>

      <EventCalendarView />
    </>
  );
}
