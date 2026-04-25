import React from 'react';
import { InfoBadge } from '../shared-components';
import {
  PiArrowSquareOutBold,
  PiClockClockwiseBold,
  PiWarningBold,
  PiNoteBold,
  PiShieldCheckBold,
} from 'react-icons/pi';

export default function CommunicationStandards() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
          <h4 className="mb-2 text-blue-700 dark:text-blue-400">
            Communication Channels:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <InfoBadge
                color="blue"
                icon={<PiArrowSquareOutBold className="h-3 w-3" />}
              >
                Primary
              </InfoBadge>
              <span className="text-blue-700 dark:text-blue-300">
                <strong>Student Portal</strong> - For resources and
                announcements
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InfoBadge
                color="green"
                icon={<PiArrowSquareOutBold className="h-3 w-3" />}
              >
                Official
              </InfoBadge>
              <span className="text-blue-700 dark:text-blue-300">
                <strong>Email</strong> - For formal communications
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InfoBadge
                color="amber"
                icon={<PiArrowSquareOutBold className="h-3 w-3" />}
              >
                Remote
              </InfoBadge>
              <span className="text-blue-700 dark:text-blue-300">
                <strong>Video Conferencing</strong> - When in-person not
                possible
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InfoBadge
                color="red"
                icon={<PiArrowSquareOutBold className="h-3 w-3" />}
              >
                Urgent
              </InfoBadge>
              <span className="text-blue-700 dark:text-blue-300">
                <strong>Phone</strong> - For urgent matters only
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
          <h4 className="mb-2 text-purple-700 dark:text-purple-400">
            Response Time Expectations:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <InfoBadge
                color="purple"
                icon={<PiClockClockwiseBold className="h-3 w-3" />}
              >
                24h
              </InfoBadge>
              <span className="text-purple-700 dark:text-purple-300">
                Respond to student messages (weekdays)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InfoBadge
                color="purple"
                icon={<PiClockClockwiseBold className="h-3 w-3" />}
              >
                48h
              </InfoBadge>
              <span className="text-purple-700 dark:text-purple-300">
                Respond to parent inquiries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InfoBadge
                color="red"
                icon={<PiWarningBold className="h-3 w-3" />}
              >
                Immediate
              </InfoBadge>
              <span className="text-purple-700 dark:text-purple-300">
                Escalate urgent issues to administration
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
        <h4 className="mb-2 text-green-700 dark:text-green-400">
          Documentation Requirements:
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <InfoBadge color="green" icon={<PiNoteBold className="h-3 w-3" />}>
              Record
            </InfoBadge>
            <span className="text-green-700 dark:text-green-300">
              Document all formal meetings in the advising system
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge color="green" icon={<PiNoteBold className="h-3 w-3" />}>
              Record
            </InfoBadge>
            <span className="text-green-700 dark:text-green-300">
              Document intervention plans for at-risk students
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge
              color="red"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Private
            </InfoBadge>
            <span className="text-green-700 dark:text-green-300">
              Maintain confidentiality in all communications
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
