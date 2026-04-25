'use client';

import { useState, useEffect } from 'react';
import { Button, Text, Select, Title, Avatar } from 'rizzui';
import { PiArrowsDownUp, PiUserCirclePlus, PiUsersFour } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { allTasksData } from '@/data/all-tasks-data';

interface ReassignTaskFormProps {
  taskIds: React.Key | React.Key[];
  onClose?: () => void;
}

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 07:34:00');
const CURRENT_USER = 'abduraufdev77';

// Mock advisor options with avatars
const advisorOptions = [
  {
    label: 'Dr. Maryam Barrows',
    value: 'Maryam Barrows',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp',
    department: 'Computer Science',
  },
  {
    label: 'Dr. Mason Davis',
    value: 'Mason Davis',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
    department: 'Engineering',
  },
  {
    label: 'Dr. Jayda Schiller',
    value: 'Jayda Schiller',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-03.webp',
    department: 'Mathematics',
  },
  {
    label: 'Dr. Retha Lehner',
    value: 'Retha Lehner',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
    department: 'Physics',
  },
];

export default function ReassignTaskForm({
  taskIds,
  onClose,
}: ReassignTaskFormProps) {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifyStudents, setNotifyStudents] = useState(true);

  // Normalize taskIds to array
  const taskIdsArray = Array.isArray(taskIds) ? taskIds : [taskIds];
  const singleTask = taskIdsArray.length === 1;

  // Get task details if it's a single task
  const taskDetails = singleTask
    ? allTasksData.find(
        (task) => task.id.toString() === taskIdsArray[0].toString()
      )
    : null;

  const handleReassignTasks = () => {
    if (!selectedAdvisor) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(
        'Reassigning tasks to advisor:',
        selectedAdvisor,
        'Task IDs:',
        taskIdsArray,
        'Notify students:',
        notifyStudents,
        'Date:',
        CURRENT_DATE.toISOString(),
        'By user:',
        CURRENT_USER
      );

      setIsSubmitting(false);

      if (onClose) onClose();

      // Show success message
      toast.success(
        `${taskIdsArray.length} ${taskIdsArray.length === 1 ? 'task' : 'tasks'} reassigned to ${selectedAdvisor}`
      );
    }, 800);
  };

  // Find selected advisor details
  const selectedAdvisorDetails = advisorOptions.find(
    (advisor) => advisor.value === selectedAdvisor
  );

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 dark:border-gray-700 dark:from-indigo-900/20 dark:to-blue-900/20">
        <div className="flex items-center">
          <PiArrowsDownUp className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <Title as="h3" className="text-lg font-semibold">
            {singleTask && taskDetails
              ? `Reassign "${taskDetails.title}"`
              : `Reassign ${taskIdsArray.length} Tasks`}
          </Title>
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <span>
            {CURRENT_USER} • {formatDate(CURRENT_DATE)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          {singleTask && taskDetails ? (
            <div className="mb-5 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <Avatar
                  src={taskDetails.assignedStudents[0]?.avatar}
                  name={taskDetails.title}
                  size="sm"
                  className="border border-gray-200"
                />
                <div>
                  <div className="font-medium">{taskDetails.title}</div>
                  <div className="text-xs text-gray-500">
                    Due: {formatDate(new Date(taskDetails.dueDate))}•{' '}
                    {taskDetails.assignedStudents.length} students assigned
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                You are reassigning the following to another advisor:
              </p>
              <div className="rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <PiUsersFour className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium">
                    {taskIdsArray.length}{' '}
                    {taskIdsArray.length === 1 ? 'task' : 'tasks'} selected
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <Text className="mb-2 font-medium">Select Advisor</Text>
              <Select
                options={advisorOptions}
                value={selectedAdvisor}
                onChange={(value: string) => setSelectedAdvisor(value)}
                placeholder="Choose an advisor"
                className="w-full"
                getOptionDisplayValue={(advisor: any) => (
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={advisor.avatar}
                      name={advisor.label}
                      size="sm"
                    />
                    <div>
                      <div className="font-medium">{advisor.label}</div>
                      <div className="text-xs text-gray-500">
                        {advisor.department}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>

            {selectedAdvisorDetails && (
              <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/10">
                <Text className="text-sm font-medium text-indigo-800 dark:text-indigo-400">
                  Selected Advisor
                </Text>
                <div className="mt-2 flex items-center gap-3">
                  <Avatar
                    src={selectedAdvisorDetails.avatar}
                    name={selectedAdvisorDetails.label}
                    size="md"
                    className="border border-white dark:border-gray-700"
                  />
                  <div>
                    <Text className="font-bold text-indigo-800 dark:text-indigo-400">
                      {selectedAdvisorDetails.label}
                    </Text>
                    <Text className="text-sm text-indigo-700 dark:text-indigo-500">
                      {selectedAdvisorDetails.department}
                    </Text>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="notify-students"
                checked={notifyStudents}
                onChange={(e) => setNotifyStudents(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="notify-students"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Notify students about advisor change
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReassignTasks}
            disabled={!selectedAdvisor || isSubmitting}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            <PiUserCirclePlus className="me-1.5 h-4 w-4" />
            {isSubmitting ? 'Reassigning...' : 'Reassign'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to format date
function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
