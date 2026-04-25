import React from 'react';
import { InfoBadge } from '../shared-components';
import { PiClockBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export default function ImportantTimelines() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-300">
        <div className="bg-gray-50 p-3 dark:bg-gray-100/30">
          <div className="flex items-center gap-2">
            <InfoBadge color="blue" icon={<PiClockBold className="h-3 w-3" />}>
              Start
            </InfoBadge>
            <span className="font-semibold">Start of Term (First 2 weeks)</span>
          </div>
          <div className="mt-2 space-y-1 pl-8">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              <span>Review student files and previous advising notes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              <span>Schedule initial meetings with all advisees</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
              <span>Establish goals and expectations</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-300 dark:bg-gray-100/20">
          <div className="flex items-center gap-2">
            <InfoBadge color="amber" icon={<PiClockBold className="h-3 w-3" />}>
              Mid
            </InfoBadge>
            <span className="font-semibold">Mid-Term (Week 5-6)</span>
          </div>
          <div className="mt-2 space-y-1 pl-8">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
              <span>Conduct progress assessments</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
              <span>Identify at-risk students</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
              <span>Update intervention plans as needed</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-3 dark:border-gray-300 dark:bg-gray-100/30">
          <div className="flex items-center gap-2">
            <InfoBadge color="red" icon={<PiClockBold className="h-3 w-3" />}>
              End
            </InfoBadge>
            <span className="font-semibold">End of Term (Last 2 weeks)</span>
          </div>
          <div className="mt-2 space-y-1 pl-8">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
              <span>Complete all rubric assessments</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
              <span>Conduct final check-ins</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
              <span>Submit required reports</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-300 dark:bg-gray-100/20">
          <div className="flex items-center gap-2">
            <InfoBadge color="green" icon={<PiClockBold className="h-3 w-3" />}>
              Annual
            </InfoBadge>
            <span className="font-semibold">Annual (May/June)</span>
          </div>
          <div className="mt-2 space-y-1 pl-8">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
              <span>Complete year-end assessments</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
              <span>Prepare transition plans for graduating students</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
              <span>Participate in program evaluation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          className="flex items-center justify-center"
          variant="outline"
          color="primary"
        >
          <span className="mr-2">📅</span> Download Academic Calendar
        </Button>
        <Button className="flex items-center justify-center" color="secondary">
          <span className="mr-2">📝</span> Download Reporting Templates
        </Button>
      </div>
    </div>
  );
}
