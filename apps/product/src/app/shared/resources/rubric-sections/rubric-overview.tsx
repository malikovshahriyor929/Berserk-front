import React from 'react';
import { InfoBadge } from '../shared-components';
import {
  PiInfoBold,
  PiRulerBold,
  PiArrowsCounterClockwiseBold,
  PiStarBold,
  PiDownloadBold,
} from 'react-icons/pi';
import { Button, Title, Text } from 'rizzui';

export default function RubricOverview() {
  return (
    <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-5 dark:border-blue-800/30 dark:bg-blue-900/20">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-400">
            <PiInfoBold className="h-6 w-6" />
          </span>
        </div>
        <div className="flex-grow">
          <Title
            as="h4"
            className="mb-2 text-base font-semibold text-blue-700 dark:text-blue-300 sm:text-lg"
          >
            Rubric Assessment Overview
          </Title>
          <Text className="text-blue-700 dark:text-blue-300">
            Use the following rubrics to assess student progress in key areas.
            Each rubric includes descriptors for different performance levels,
            helping advisors assign scores with confidence.
          </Text>
          <Text className="mt-2 text-blue-700 dark:text-blue-300">
            You can download full templates or refer to the summaries below.
          </Text>

          <div className="mt-4 flex flex-wrap gap-2">
            <InfoBadge color="blue" icon={<PiRulerBold className="h-3 w-3" />}>
              Standardized
            </InfoBadge>
            <InfoBadge
              color="green"
              icon={<PiArrowsCounterClockwiseBold className="h-3 w-3" />}
            >
              Consistent Assessment
            </InfoBadge>
            <InfoBadge color="amber" icon={<PiStarBold className="h-3 w-3" />}>
              Clear Growth Metrics
            </InfoBadge>
          </div>

          <div className="mt-5 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              className="flex items-center justify-center"
              variant="solid"
              color="secondary"
            >
              <PiDownloadBold className="mr-2 h-4 w-4" /> Download All Rubric
              Templates (PDF)
            </Button>
            <Button
              className="flex items-center justify-center"
              variant="outline"
              color="secondary"
            >
              <PiDownloadBold className="mr-2 h-4 w-4" /> Editable Rubric
              Templates (Google Docs)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
