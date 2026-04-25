import React from 'react';
import { InfoBadge,ScoreLevelBadge } from '../shared-components';
import { PiCheckCircleBold } from 'react-icons/pi';
import { Badge } from 'rizzui';

interface ScoreLevelBadgeSimpleProps {
  level: number;
  label: string;
}


export default function AcademicReadiness() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 flex flex-wrap gap-3">
        <ScoreLevelBadge level={1} label="Beginning" />
        <ScoreLevelBadge level={2} label="Emerging" />
        <ScoreLevelBadge level={3} label="Proficient" />
        <ScoreLevelBadge level={4} label="Mastery" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-300/30">
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Level
              </th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-300">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge
                    className="grid h-5 w-5 place-content-center"
                    color="red"
                  >
                    1
                  </InfoBadge>
                  Beginning
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Rarely completes assignments; needs frequent redirection.
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge
                    className="grid h-5 w-5 place-content-center"
                    color="amber"
                  >
                    2
                  </InfoBadge>
                  Emerging
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Completes some tasks; requires moderate support.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge
                    className="grid h-5 w-5 place-content-center"
                    color="blue"
                  >
                    3
                  </InfoBadge>
                  Proficient
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Completes most work independently; shows good understanding.
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge
                    className="grid h-5 w-5 place-content-center"
                    color="green"
                  >
                    4
                  </InfoBadge>
                  Mastery
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Consistently independent, exceeds expectations.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="mt-4">Checklist:</h4>

      <div className="mt-2 space-y-2 rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-800/20 dark:bg-blue-900/10">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-blue-700 dark:text-blue-300">
            Turns in homework on time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-blue-700 dark:text-blue-300">
            Participates in class
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-blue-700 dark:text-blue-300">
            Attends tutoring when needed
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-blue-700 dark:text-blue-300">
            Tracks goals and progress
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Academic
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          Classroom
        </Badge>
      </div>
    </div>
  );
}
