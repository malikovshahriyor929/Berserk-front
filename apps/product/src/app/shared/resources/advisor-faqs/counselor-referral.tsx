import React from 'react';
import { InfoBadge, NavStep, AlertBox } from '../shared-components';
import { PiClockBold, PiPhoneBold } from 'react-icons/pi';
import { Tooltip } from 'rizzui';

export default function CounselorReferral() {
  return (
    <>
      <p className="mb-3">
        Yes, you can refer a student to a counselor through this process:
      </p>

      <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-300 dark:bg-gray-100">
        <div className="space-y-3">
          <NavStep number={1}>
            <span>
              Discuss your concerns with the student first{' '}
              <InfoBadge color="amber">(unless emergency)</InfoBadge>
            </span>
          </NavStep>

          <NavStep number={2}>
            <span>
              Complete the{' '}
              <Tooltip content="Find this form in Resources > Forms > Student Support">
                <span className="cursor-help border-b border-dashed">
                  Counselor Referral Form
                </span>
              </Tooltip>{' '}
              in the Resources section
            </span>
          </NavStep>

          <NavStep number={3}>
            <span>
              Submit the form to the counseling department via the portal
            </span>
          </NavStep>

          <NavStep number={4}>
            <span>
              Follow up with the counselor within{' '}
              <InfoBadge
                color="blue"
                icon={<PiClockBold className="h-3 w-3" />}
              >
                2-3 days
              </InfoBadge>{' '}
              if no confirmation
            </span>
          </NavStep>
        </div>
      </div>

      <AlertBox type="danger" title="For Urgent Mental Health Concerns">
        <div className="flex items-center gap-2">
          <span>Contact counseling department immediately by phone</span>
          <InfoBadge color="red" icon={<PiPhoneBold className="h-3 w-3" />}>
            Urgent
          </InfoBadge>
        </div>
        <div className="mt-1">
          Select the &quot;urgent&quot; option on the referral form
        </div>
      </AlertBox>
    </>
  );
}
