'use client';

import React, { useState } from 'react';
import { Badge, Title, Text, ActionIcon } from 'rizzui';
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
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';

export interface TestScore {
  name: string;
  date: string;
  score: string;
  pointsEarned?: number;
  maxPoints?: number;
  breakdown: Record<string, string>;
}

export default function TestScores() {
  const testScores = portfolioData.testScores;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTestScore, setSelectedTestScore] = useState<TestScore | null>(
    null
  );

  // Handle delete function
  const handleDelete = (testScore: TestScore) => {
    setSelectedTestScore(testScore);
    setIsDeleteModalOpen(true);
    toast.success(`Test score "${testScore.name}" would be deleted`);
  };

  // Ensure we have both SAT and IELTS tests for display
  const allTestScores = [...testScores];

  if (!allTestScores.some((test) => test.name === 'SAT')) {
    allTestScores.push({
      name: 'SAT',
      date: '18 Jun 2022',
      score: '1420',
      pointsEarned: 21,
      maxPoints: 30,
      breakdown: {
        Math: '720',
        'Evidence-Based Reading': '700',
      },
    });
  }

  if (!allTestScores.some((test) => test.name === 'IELTS')) {
    allTestScores.push({
      name: 'IELTS',
      date: '25 Jul 2022',
      score: '7.5',
      pointsEarned: 10,
      maxPoints: 15,
      breakdown: {
        Reading: '8.0',
        Listening: '7.5',
        Writing: '7.0',
        Speaking: '7.5',
      },
    });
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

  return (
    <div>
      {/* Points earned summary */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/30">
        <Title
          as="h4"
          className="mb-2 text-lg font-semibold text-mainBlue dark:text-gray-600"
        >
          Test Scores Rating Points
        </Title>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                <PiBrain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <Text className="font-medium text-blue-700 dark:text-blue-300">
                SAT Points
              </Text>
            </div>
            <Badge
              variant="flat"
              color="info"
              className="text-sm font-bold text-white"
            >
              {allTestScores.find((t) => t.name === 'SAT')?.pointsEarned || 0}/
              {allTestScores.find((t) => t.name === 'SAT')?.maxPoints || 30}
            </Badge>
          </div>

          <div className="flex items-center justify-between rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <PiGlobe className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <Text className="font-medium text-red-700 dark:text-red-300">
                IELTS Points
              </Text>
            </div>
            <Badge variant="flat" color="danger" className="text-sm font-bold">
              {allTestScores.find((t) => t.name === 'IELTS')?.pointsEarned || 0}
              /{allTestScores.find((t) => t.name === 'IELTS')?.maxPoints || 15}
            </Badge>
          </div>
        </div>
      </div>

      {/* Test score cards */}
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
                    <div className="flex items-end gap-1">
                      <PiChartBar className="h-5 w-5 text-gray-500" />
                      <Text className="text-xs text-gray-500 dark:text-gray-500">
                        Overall Score
                      </Text>
                    </div>
                    <Title as="h4" className="text-xl font-bold">
                      {test.score}
                    </Title>

                    {test.pointsEarned !== undefined && (
                      <Badge
                        variant="outline"
                        color={test.name === 'SAT' ? 'info' : 'danger'}
                        className="mt-1"
                        size="sm"
                      >
                        {test.pointsEarned} rating points
                      </Badge>
                    )}
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

                {/* Action Buttons */}
                <div className="mt-5 flex justify-end gap-3 border-t border-mainBlue/20 pt-4 dark:border-gray-700">
                  <ModalButton
                    size="sm"
                    label=""
                    customSize={700}
                    className="w-fit"
                    icon={<PiPencil className="h-4 w-4" />}
                    view={
                      <div className="grid place-content-center p-10">
                        From will be implemented soon!
                      </div>
                    }
                  />
                  <ActionIcon
                    size="sm"
                    variant="flat"
                    color="danger"
                    rounded="lg"
                    onClick={() =>
                      toast.error('This feature is not implemented yet')
                    }
                    className="px2 h-8 w-8"
                  >
                    <PiTrash className="h-4 w-4" />
                  </ActionIcon>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
