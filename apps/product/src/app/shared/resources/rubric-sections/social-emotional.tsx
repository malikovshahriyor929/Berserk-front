import React from 'react';
import { InfoBadge, ScoreLevelBadge } from '../shared-components';
import {
  PiHandsPrayingBold,
  PiChatCircleTextBold,
  PiCheckCircleBold,
} from 'react-icons/pi';
import { Badge } from 'rizzui';

export default function SocialEmotional() {
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
                Struggles to manage emotions; disruptive at times.
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
                Occasionally regulates emotions with support.
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
                Generally manages emotions and respects peers.
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
                Models self-regulation and empathy consistently.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="mt-4">Checklist:</h4>

      <div className="mt-2 space-y-2 rounded-lg border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-800/20 dark:bg-purple-900/10">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-500/10 p-1.5">
            <PiHandsPrayingBold className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-purple-700 dark:text-purple-300">
            Demonstrates empathy
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-500/10 p-1.5">
            <PiChatCircleTextBold className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-purple-700 dark:text-purple-300">
            Resolves conflicts appropriately
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-purple-700 dark:text-purple-300">
            Manages stress or frustration
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-500/10 p-1.5">
            <PiCheckCircleBold className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-purple-700 dark:text-purple-300">
            Accepts feedback
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          Social-Emotional
        </Badge>
        <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
          Interpersonal
        </Badge>
      </div>
    </div>
  );
}
