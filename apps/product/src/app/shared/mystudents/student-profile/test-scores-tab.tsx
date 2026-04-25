import React from 'react';
import { Badge, Title, Text } from 'rizzui';
import {
  PiChartLineUp,
  PiGlobe,
  PiTranslate,
  PiBrain,
  PiChartBar,
  PiMicrophoneFill,
  PiPencilLine,
  PiBookOpen,
  PiHeadphones,
  PiMathOperations,
  PiReadCvLogo,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';

interface TestScore {
  name: string;
  date: string;
  score: string;
  breakdown: Record<string, string>;
}

interface TestScoresTabProps {
  testScores: TestScore[];
}

// Define color themes for different test types
const testThemes = {
  IELTS: {
    gradient:
      'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
    border: 'border-red-200 dark:border-red-700/50',
    badgeBg: 'bg-red-50 dark:bg-red-900/30',
    badgeText: 'text-red-600 dark:text-red-400',
    badgeBorder: 'border-red-200 dark:border-red-700',
    icon: <PiGlobe className="h-6 w-6 text-red-500" />,
    iconBg: 'bg-red-100 dark:bg-red-800/30',
  },
  TOEFL: {
    gradient:
      'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    border: 'border-blue-200 dark:border-blue-700/50',
    badgeBg: 'bg-blue-50 dark:bg-blue-900/30',
    badgeText: 'text-blue-600 dark:text-blue-400',
    badgeBorder: 'border-blue-200 dark:border-blue-700',
    icon: <PiTranslate className="h-6 w-6 text-blue-500" />,
    iconBg: 'bg-blue-100 dark:bg-blue-800/30',
  },
  'CEFR Assessment': {
    gradient:
      'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    border: 'border-green-200 dark:border-green-700/50',
    badgeBg: 'bg-green-50 dark:bg-green-900/30',
    badgeText: 'text-green-600 dark:text-green-400',
    badgeBorder: 'border-green-200 dark:border-green-700',
    icon: <PiChartLineUp className="h-6 w-6 text-green-500" />,
    iconBg: 'bg-green-100 dark:bg-green-800/30',
  },
  SAT: {
    gradient:
      'from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20',
    border: 'border-sky-200 dark:border-sky-700/50',
    badgeBg: 'bg-sky-50 dark:bg-sky-900/30',
    badgeText: 'text-sky-600 dark:text-sky-400',
    badgeBorder: 'border-sky-200 dark:border-sky-700',
    icon: <PiBrain className="h-6 w-6 text-sky-500" />,
    iconBg: 'bg-sky-100 dark:bg-sky-800/30',
  },
};

// Skill icons
const skillIcons = {
  Reading: <PiBookOpen className="h-4 w-4" />,
  Listening: <PiHeadphones className="h-4 w-4" />,
  Writing: <PiPencilLine className="h-4 w-4" />,
  Speaking: <PiMicrophoneFill className="h-4 w-4" />,
  Math: <PiMathOperations className="h-4 w-4" />,
  'Evidence-Based Reading': <PiReadCvLogo className="h-4 w-4" />,
};

const TestScoresTab: React.FC<TestScoresTabProps> = ({ testScores }) => {
  // Include SAT in the test scores if it doesn't exist
  const allTestScores = [...testScores];
  if (!allTestScores.some((test) => test.name === 'SAT')) {
    allTestScores.push({
      name: 'SAT',
      date: '18 Jun 2022',
      score: '1420',
      breakdown: {
        Math: '720',
        'Evidence-Based Reading': '700',
      },
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {allTestScores.map((test, index) => {
        const theme =
          testThemes[test.name as keyof typeof testThemes] ||
          testThemes['IELTS'];

        return (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md',
              theme.border,
              theme.gradient
            )}
          >
            {/* Card Header */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('rounded-lg p-2', theme.iconBg)}>
                    {theme.icon}
                  </div>
                  <div>
                    <Title
                      as="h3"
                      className="text-lg font-bold text-mainBlue dark:text-gray-600"
                    >
                      {test.name}
                    </Title>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {test.date}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <div className='flex items-end gap-1'>
                      <PiChartBar className="h-5 w-5 text-gray-500" />
                      <Text className="text-xs text-gray-500 dark:text-gray-500">
                        Overall Score
                      </Text>
                    </div>
                    <Title as="h4" className="text-xl font-bold">
                      {test.score}
                    </Title>
                </div>
              </div>
            </div>

            {/* Card Body - Score Breakdown */}
            <div className="bg-white px-5 pb-5 pt-3 dark:bg-black/20">
              <div className="mb-2 text-center">
                <Text className="text-sm font-medium text-gray-600 dark:text-gray-500">
                  Score Breakdown
                </Text>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(test.breakdown).map(([skill, score]) => (
                  <div
                    key={skill}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-3 py-1.5',
                      theme.badgeBg,
                      theme.badgeBorder,
                      theme.badgeText
                    )}
                  >
                    {skillIcons[skill as keyof typeof skillIcons] || (
                      <PiChartLineUp className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">{skill}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold shadow-sm dark:bg-black/50">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestScoresTab;
