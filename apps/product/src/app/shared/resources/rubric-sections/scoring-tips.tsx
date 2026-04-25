import React from 'react';
import { InfoBadge,AlertBox } from '../shared-components';

import {
  PiDownloadBold,
  PiCheckCircleBold,
  PiSparkle,
  PiCalculatorBold,
  PiChartLineUpBold,
} from 'react-icons/pi';
import { Button, Tooltip } from 'rizzui';

export default function ScoringTips() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-800/20 dark:bg-blue-900/10">
        <h4 className="mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <PiLightbulbBold className="h-5 w-5" />
          Best Practices for Assessment
        </h4>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
          <li className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Tip
            </InfoBadge>
            <span>
              Use observational data and advising notes to justify scores
            </span>
          </li>
          <li className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Tip
            </InfoBadge>
            <span>Re-assess each rubric once per term or as needed</span>
          </li>
          <li className="flex items-start gap-2">
            <InfoBadge
              color="blue"
              icon={<PiCheckCircleBold className="h-3 w-3" />}
            >
              Tip
            </InfoBadge>
            <span>
              Discuss scores with students to support growth and reflection
            </span>
          </li>
        </ul>
      </div>

      <AlertBox type="warning" title="Evidence-Based Assessment">
        <p>
          Whenever possible, gather evidence from multiple sources
          (observations, work samples, student self-assessments) before
          finalizing scores.
        </p>
      </AlertBox>

      <div className="mt-6">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-500">
          <PiChartLineUpBold className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Score Calculation Method
        </h4>

        <div className="rounded-lg border border-gray-200 p-0 dark:border-gray-300">
          <div className="border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-300 dark:bg-gray-100/30">
            <span className="font-semibold">
              Readiness scores are calculated based on the average of all rubric
              scores within a domain:
            </span>
          </div>
          <div className="p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-red-100 bg-red-50/50 p-3 dark:border-red-900/20 dark:bg-red-900/10">
                <div className="flex items-center gap-2 font-medium text-red-700 dark:text-red-400">
                  <InfoBadge color="red">1.0-1.9</InfoBadge>
                  <span>Beginning</span>
                </div>
                <div className="mt-1 text-sm text-red-600 dark:text-red-300">
                  0-49% mastery
                </div>
              </div>
              <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3 dark:border-amber-900/20 dark:bg-amber-900/10">
                <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-400">
                  <InfoBadge color="amber">2.0-2.9</InfoBadge>
                  <span>Emerging</span>
                </div>
                <div className="mt-1 text-sm text-amber-600 dark:text-amber-300">
                  50-74% mastery
                </div>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3 dark:border-blue-900/20 dark:bg-blue-900/10">
                <div className="flex items-center gap-2 font-medium text-blue-700 dark:text-blue-400">
                  <InfoBadge color="blue">3.0-3.9</InfoBadge>
                  <span>Proficient</span>
                </div>
                <div className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                  75-94% mastery
                </div>
              </div>
              <div className="rounded-lg border border-green-100 bg-green-50/50 p-3 dark:border-green-900/20 dark:bg-green-900/10">
                <div className="flex items-center gap-2 font-medium text-green-700 dark:text-green-400">
                  <InfoBadge color="green">4.0</InfoBadge>
                  <span>Mastery</span>
                </div>
                <div className="mt-1 text-sm text-green-600 dark:text-green-300">
                  95-100% mastery
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/30 p-3 dark:border-blue-900/20 dark:bg-blue-900/10">
              <div className="flex items-center gap-2">
                <PiSparkle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-700 dark:text-blue-400">
                  Calculation Example:
                </span>
              </div>
              <div className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                If a student scores 3 (Proficient) in Academic Readiness, 2
                (Emerging) in Social-Emotional, and 3 (Proficient) in Career &
                Life Skills, their overall Readiness Score would be
                <span className="font-semibold"> (3 + 2 + 3) ÷ 3 = 2.67</span>,
                placing them in the
                <span className="font-semibold"> Emerging</span> category
                overall.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          className="flex items-center justify-center"
          variant="outline"
          color="primary"
        >
          <PiDownloadBold className="mr-2 h-4 w-4" /> Sample Completed Rubric
        </Button>
        <Button
          className="flex items-center justify-center"
          variant="outline"
          color="primary"
        >
          <PiDownloadBold className="mr-2 h-4 w-4" /> Scoring Calculation
          Worksheet
        </Button>
        <Tooltip content="Interactive scoring calculator tool">
          <Button
            className="flex items-center justify-center"
            variant="solid"
            color="secondary"
          >
            <PiCalculatorBold className="mr-2 h-4 w-4" /> Rubric Score
            Calculator
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

// Missing icon component
const PiLightbulbBold = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    {...props}
  >
    <path
      fill="currentColor"
      d="M172 232a12 12 0 0 1-12 12H96a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12Zm20-56a12 12 0 0 0-12 12a12 12 0 0 1-12 12H88a12 12 0 0 1-12-12a12 12 0 0 0-24 0a36 36 0 0 0 36 36h80a36 36 0 0 0 36-36a12 12 0 0 0-12-12Zm16-48a80 80 0 1 0-148 42.1V176a20 20 0 0 0 20 20h64a20 20 0 0 0 20-20v-6.1A80.1 80.1 0 0 0 208 128Zm-44.3 32a56 56 0 1 1 0-64a78.4 78.4 0 0 0 0 64Z"
    />
  </svg>
);
