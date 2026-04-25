import React from 'react';
import { InfoBadge } from '../shared-components';
import { PiCheckCircleBold, PiWarningBold } from 'react-icons/pi';

export default function RolesResponsibilities() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h4 className="mb-2 text-blue-700 dark:text-blue-400">
          As an advisor, you are responsible for:
        </h4>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Core
            </InfoBadge>
            <span>
              Meeting regularly with assigned students (individually and in
              groups)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Core
            </InfoBadge>
            <span>
              Developing and maintaining advising records in the system
            </span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Core
            </InfoBadge>
            <span>Assessing student progress using approved rubrics</span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="amber"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Support
            </InfoBadge>
            <span>Identifying students who may need additional support</span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="amber"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Support
            </InfoBadge>
            <span>Communicating with parents/guardians as appropriate</span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="green"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Growth
            </InfoBadge>
            <span>Collaborating with other faculty and support staff</span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge
              color="green"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Growth
            </InfoBadge>
            <span>Participating in advisor professional development</span>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
        <h4 className="mb-2 text-red-700 dark:text-red-400">
          What advisors are NOT expected to provide:
        </h4>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <InfoBadge color="red" icon={<PiWarningBold className="h-3 w-3" />}>
              Limit
            </InfoBadge>
            <span>
              Mental health counseling (refer to qualified counselors)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge color="red" icon={<PiWarningBold className="h-3 w-3" />}>
              Limit
            </InfoBadge>
            <span>
              Subject-specific tutoring (connect with academic resources)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge color="red" icon={<PiWarningBold className="h-3 w-3" />}>
              Limit
            </InfoBadge>
            <span>Legal advice or interventions</span>
          </div>
          <div className="flex items-start gap-2">
            <InfoBadge color="red" icon={<PiWarningBold className="h-3 w-3" />}>
              Limit
            </InfoBadge>
            <span>24/7 availability (maintain appropriate boundaries)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
