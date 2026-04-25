import React from 'react';
import {
  PiGraduationCapBold,
  PiUsersBold,
  PiBriefcaseBold,
  PiWarningBold,
} from 'react-icons/pi';

export default function KeyGoals() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-green-100 p-1.5 text-green-600 dark:bg-green-800/50 dark:text-green-400">
              <PiGraduationCapBold className="h-4 w-4" />
            </div>
            <span className="font-semibold text-green-700 dark:text-green-400">
              Academic Success
            </span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Support students in setting and achieving meaningful academic goals.
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-1.5 text-blue-600 dark:bg-blue-800/50 dark:text-blue-400">
              <PiUsersBold className="h-4 w-4" />
            </div>
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              Personal Development
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Foster growth in social-emotional skills, self-awareness, and
            resilience.
          </p>
        </div>

        <div className="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-purple-100 p-1.5 text-purple-600 dark:bg-purple-800/50 dark:text-purple-400">
              <PiBriefcaseBold className="h-4 w-4" />
            </div>
            <span className="font-semibold text-purple-700 dark:text-purple-400">
              Career Readiness
            </span>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Help students explore career options and develop professional
            competencies.
          </p>
        </div>

        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-1.5 text-amber-600 dark:bg-amber-800/50 dark:text-amber-400">
              <PiUsersBold className="h-4 w-4" />
            </div>
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              Community Building
            </span>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Create a sense of belonging and connection within the educational
            community.
          </p>
        </div>

        <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-red-100 p-1.5 text-red-600 dark:bg-red-800/50 dark:text-red-400">
              <PiWarningBold className="h-4 w-4" />
            </div>
            <span className="font-semibold text-red-700 dark:text-red-400">
              Early Intervention
            </span>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            Identify and address challenges before they become significant
            barriers.
          </p>
        </div>
      </div>

      <p>
        These goals should guide your interactions, planning, and assessment
        activities throughout the academic year.
      </p>
    </div>
  );
}
