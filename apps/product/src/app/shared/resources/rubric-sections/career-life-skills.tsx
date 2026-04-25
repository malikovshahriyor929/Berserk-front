import React from 'react';
import { InfoBadge, ScoreLevelBadge } from '../shared-components';

import {
  PiStarBold,
  PiNoteBold,
  PiClockBold,
  PiBriefcaseBold,
} from 'react-icons/pi';
import { Badge } from 'rizzui';

export default function CareerLifeSkills() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 flex flex-wrap gap-3">
        <ScoreLevelBadge
          level={1}
          label="Beginning"
        />
        <ScoreLevelBadge
          level={2}
          label="Emerging"
        />
        <ScoreLevelBadge
          level={3}
          label="Proficient"
        />
        <ScoreLevelBadge
          level={4}
          label="Mastery"
        />
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
                  <InfoBadge color="red">1</InfoBadge>
                  Beginning
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Lacks awareness of goals or future plans.
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge color="amber">2</InfoBadge>
                  Emerging
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Shows some interest in goals; needs help planning.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge color="blue">3</InfoBadge>
                  Proficient
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Can identify goals and basic steps to reach them.
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-200/20">
              <td className="border border-gray-300 p-2 font-medium dark:border-gray-300">
                <div className="flex items-center gap-2">
                  <InfoBadge color="green">4</InfoBadge>
                  Mastery
                </div>
              </td>
              <td className="border border-gray-300 p-2 dark:border-gray-300">
                Takes initiative in planning and goal setting.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="mt-4">Checklist:</h4>

      <div className="mt-2 space-y-2 rounded-lg border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-800/20 dark:bg-amber-900/10">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-amber-500/10 p-1.5">
            <PiStarBold className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-amber-700 dark:text-amber-300">
            Sets personal goals
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-amber-500/10 p-1.5">
            <PiNoteBold className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-amber-700 dark:text-amber-300">
            Prepares a resume or portfolio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-amber-500/10 p-1.5">
            <PiClockBold className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-amber-700 dark:text-amber-300">
            Understands time management
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-amber-500/10 p-1.5">
            <PiBriefcaseBold className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-amber-700 dark:text-amber-300">
            Attends college/career events
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Career
        </Badge>
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          Life Skills
        </Badge>
      </div>
    </div>
  );
}
