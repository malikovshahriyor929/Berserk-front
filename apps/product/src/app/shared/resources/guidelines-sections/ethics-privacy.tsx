import React from 'react';
import { InfoBadge,AlertBox } from '../shared-components';
import { PiShieldCheckBold } from 'react-icons/pi';
import { Button, Tooltip } from 'rizzui';

export default function EthicsPrivacy() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <p>
        Maintaining appropriate boundaries and protecting student privacy is
        essential to building trust in the advising relationship.
      </p>

      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <h4 className="mb-2 text-blue-700 dark:text-blue-400">
          Key Guidelines:
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <InfoBadge
              color="blue"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Privacy
            </InfoBadge>
            <span className="text-blue-700 dark:text-blue-300">
              Share student information only with authorized personnel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge
              color="blue"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Privacy
            </InfoBadge>
            <span className="text-blue-700 dark:text-blue-300">
              Keep advising notes factual and objective
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge
              color="blue"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Privacy
            </InfoBadge>
            <span className="text-blue-700 dark:text-blue-300">
              Store sensitive information only in approved secure systems
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge
              color="blue"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Privacy
            </InfoBadge>
            <span className="text-blue-700 dark:text-blue-300">
              Obtain permission before sharing student work or stories
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge
              color="blue"
              icon={<PiShieldCheckBold className="h-3 w-3" />}
            >
              Privacy
            </InfoBadge>
            <span className="text-blue-700 dark:text-blue-300">
              Never discuss one student with another student
            </span>
          </div>
        </div>
      </div>

      <AlertBox type="danger" title="Mandatory Reporting">
        <p className="text-red-800 dark:text-red-300">
          <strong>Important:</strong> As an advisor, you are a mandatory
          reporter. You must report any suspicion of abuse, neglect, or harm to
          the appropriate authorities immediately. Consult the school counselor
          or administration when in doubt.
        </p>
        <div className="mt-2">
          <Tooltip content="Call the emergency hotline immediately">
            <Button size="sm" variant="solid" color="danger" className="mt-1">
              Report Suspected Abuse
            </Button>
          </Tooltip>
        </div>
      </AlertBox>
    </div>
  );
}
