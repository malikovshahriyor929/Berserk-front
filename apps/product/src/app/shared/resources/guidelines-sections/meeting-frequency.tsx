import React from 'react';
import { InfoBadge, AlertBox } from '../shared-components';
import { PiClockBold } from 'react-icons/pi';

export default function MeetingFrequency() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-300/30">
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Meeting Type
              </th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Frequency
              </th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Duration
              </th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <div className="flex items-center gap-1">
                  <span>Individual Check-in</span>
                  <InfoBadge color="blue">Required</InfoBadge>
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <InfoBadge
                  color="purple"
                  icon={<PiClockBold className="h-3 w-3" />}
                >
                  Bi-weekly
                </InfoBadge>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                15-20 minutes
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Goal setting, progress review, personal support
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <div className="flex items-center gap-1">
                  <span>Group Advisory</span>
                  <InfoBadge color="blue">Required</InfoBadge>
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <InfoBadge
                  color="green"
                  icon={<PiClockBold className="h-3 w-3" />}
                >
                  Weekly
                </InfoBadge>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                30-45 minutes
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Community building, shared learning, announcements
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <div className="flex items-center gap-1">
                  <span>Formal Assessment</span>
                  <InfoBadge color="blue">Required</InfoBadge>
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <InfoBadge
                  color="amber"
                  icon={<PiClockBold className="h-3 w-3" />}
                >
                  Once per term
                </InfoBadge>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                30 minutes
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Complete rubric scoring, formal feedback
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <div className="flex items-center gap-1">
                  <span>Parent/Family Conference</span>
                  <InfoBadge color="blue">Required</InfoBadge>
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                <InfoBadge
                  color="red"
                  icon={<PiClockBold className="h-3 w-3" />}
                >
                  Once per semester
                </InfoBadge>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                20-30 minutes
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Progress updates, collaborative planning
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AlertBox type="warning" title="At-Risk Students">
        <p>
          At-risk students may require more frequent meetings. Use the{' '}
          <span className="font-medium text-amber-600 dark:text-amber-400">
            At-Risk Tracker
          </span>{' '}
          to identify students who need additional support.
        </p>
      </AlertBox>
    </div>
  );
}
