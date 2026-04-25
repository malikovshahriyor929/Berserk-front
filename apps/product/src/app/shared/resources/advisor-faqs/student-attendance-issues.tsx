import React from 'react';
import { InfoBadge, NavStep, AlertBox } from '../shared-components';
import { PiPhoneBold, PiFlag, PiPen } from 'react-icons/pi';

export default function StudentAttendanceIssues() {
  return (
    <>
      <p className="mb-3">
        Follow this escalation process for students missing advising sessions:
      </p>

      <div className="mb-5 space-y-3">
        <NavStep number={1}>
          <div>
            <strong>First missed session</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send a follow-up email to reschedule
            </p>
          </div>
        </NavStep>

        <NavStep number={2}>
          <div>
            <strong>Second consecutive miss</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contact the student directly (
              <InfoBadge
                color="blue"
                icon={<PiPhoneBold className="h-3 w-3" />}
              >
                Phone
              </InfoBadge>{' '}
              or{' '}
              <InfoBadge color="blue" icon={<PiPen className="h-3 w-3" />}>
                Text
              </InfoBadge>
              {''}) and document the outreach
            </p>
          </div>
        </NavStep>

        <NavStep number={3}>
          <div>
            <strong>Third consecutive miss</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <InfoBadge color="blue" icon={<PiFlag className="h-3 w-3" />}>
                Flag
              </InfoBadge>{' '}
              the student in the{' '}
              <InfoBadge color="red">At-Risk Tracker</InfoBadge> and notify the
              grade-level coordinator
            </p>
          </div>
        </NavStep>

        <NavStep number={4}>
          <div>
            <strong>Continued absence</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Request a parent/guardian meeting through administration
            </p>
          </div>
        </NavStep>
      </div>

      <AlertBox type="warning" title="Important Reminder">
        Throughout this process, maintain a supportive approach rather than
        punitive. There may be underlying issues causing the absences that
        require support.
      </AlertBox>
    </>
  );
}
