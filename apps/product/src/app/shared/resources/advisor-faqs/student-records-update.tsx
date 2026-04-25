import React from 'react';
import { InfoBadge, AlertBox } from '../shared-components';
import {
  PiClockBold,
  PiCalendarCheckBold,
  PiShieldWarningBold,
} from 'react-icons/pi';

export default function StudentRecordsUpdate() {
  return (
    <>
      <p>
        Student records should be updated after each formal advising session:
      </p>

      <div className="my-4 flex flex-wrap gap-3">
        <InfoBadge color="blue" icon={<PiClockBold className="h-3 w-3" />}>
          Within 24 hours
        </InfoBadge>
        <InfoBadge color="amber">Individual Meetings</InfoBadge>
        <InfoBadge color="green">Group Sessions</InfoBadge>
        <InfoBadge color="purple">Incidents & Concerns</InfoBadge>
      </div>

      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <InfoBadge color="blue" icon={<PiClockBold className="h-3 w-3" />}>
            24h
          </InfoBadge>
          <span>Update after individual meetings</span>
        </li>
        <li className="flex items-start gap-2">
          <InfoBadge
            color="green"
            icon={<PiCalendarCheckBold className="h-3 w-3" />}
          >
            Weekly
          </InfoBadge>
          <span>
            Update for group advisory sessions (if notable events occurred)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <InfoBadge
            color="red"
            icon={<PiShieldWarningBold className="h-3 w-3" />}
          >
            Immediate
          </InfoBadge>
          <span>
            Update following any incident or concern requiring documentation
          </span>
        </li>
      </ul>

      <AlertBox type="info" title="Best Practice">
        Focus on objective observations and specific action items. Regular
        updates help maintain an accurate history of student progress and ensure
        continuity if another advisor needs to step in.
      </AlertBox>
    </>
  );
}
