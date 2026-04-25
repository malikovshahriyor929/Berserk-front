'use client';

import React, { useState, useEffect } from 'react';
import { Button, Text, Title, Badge, Select, Avatar } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import {
  PiCalendarPlusBold,
  PiClockCounterClockwise,
  PiCheckCircle,
  PiWarningCircle,
  PiArrowRight,
  PiCalendarCheck,
  PiUser,
} from 'react-icons/pi';
import toast from 'react-hot-toast';
import { allTasksData, Task } from '@/data/all-tasks-data';
import cn from '@core/utils/class-names';
import { formatDate } from '@core/utils/format-date';

interface ExtendDeadlineViewProps {
  defaultSelectedTasks?: React.Key[];
  onClose?: () => void;
}

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 07:34:00');
const CURRENT_USER = 'abduraufdev77';

// Task extension options
const extensionOptions = [
  {
    value: '1_day',
    label: '1 Day',
    description: 'Add one day to the current deadline',
  },
  {
    value: '3_days',
    label: '3 Days',
    description: 'Add three days to the current deadline',
  },
  {
    value: '1_week',
    label: '1 Week',
    description: 'Add one week to the current deadline',
  },
  {
    value: '2_weeks',
    label: '2 Weeks',
    description: 'Add two weeks to the current deadline',
  },
  {
    value: 'custom',
    label: 'Custom Date',
    description: 'Select a specific date for the new deadline',
  },
];

export default function ExtendDeadlineView({
  defaultSelectedTasks = [],
  onClose,
}: ExtendDeadlineViewProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedExtension, setSelectedExtension] = useState('');
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(defaultSelectedTasks.length === 1 ? 2 : 1);

  // Filter available tasks - only those with upcoming or overdue deadlines
  const today = CURRENT_DATE;
  const eligibleTasks = allTasksData
    .filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= today || dueDate < today; // Both upcoming and overdue tasks
    })
    .map((task) => ({
      value: task.id.toString(),
      label: task.title,
      task: task,
    }));

  // Set initial selected tasks if provided
  useEffect(() => {
    if (defaultSelectedTasks && defaultSelectedTasks.length > 0) {
      setSelectedTasks(defaultSelectedTasks.map((id) => id.toString()));
    }
  }, [defaultSelectedTasks]);

  // Calculate new deadline based on extension option
  const getNewDeadline = (task: Task, option: string) => {
    const originalDeadline = new Date(task.dueDate);
    let newDeadline: Date;

    switch (option) {
      case '1_day':
        newDeadline = new Date(originalDeadline);
        newDeadline.setDate(newDeadline.getDate() + 1);
        break;
      case '3_days':
        newDeadline = new Date(originalDeadline);
        newDeadline.setDate(newDeadline.getDate() + 3);
        break;
      case '1_week':
        newDeadline = new Date(originalDeadline);
        newDeadline.setDate(newDeadline.getDate() + 7);
        break;
      case '2_weeks':
        newDeadline = new Date(originalDeadline);
        newDeadline.setDate(newDeadline.getDate() + 14);
        break;
      case 'custom':
        newDeadline = customDate || new Date(originalDeadline);
        break;
      default:
        newDeadline = new Date(originalDeadline);
    }

    return newDeadline;
  };

  // Handle task selection
  const handleTaskSelection = (values: string[]) => {
    setSelectedTasks(values);
  };

  // Handle extension option selection
  const handleExtensionSelect = (value: string) => {
    setSelectedExtension(value);
    if (value !== 'custom') {
      setCustomDate(null);
    }
  };

  // Handle submission
  const handleSubmit = () => {
    setIsSubmitting(true);

    // Get selected tasks data
    const tasksToUpdate = selectedTasks
      .map((taskId) => {
        const task = allTasksData.find((t) => t.id.toString() === taskId);
        if (!task) return null;

        return {
          id: task.id,
          title: task.title,
          currentDeadline: new Date(task.dueDate),
          newDeadline: getNewDeadline(task, selectedExtension),
          updatedBy: CURRENT_USER,
          updatedAt: CURRENT_DATE,
        };
      })
      .filter(Boolean);

    // Simulate API call
    setTimeout(() => {
      console.log('Extending deadlines for tasks:', tasksToUpdate);
      console.log('Extended by:', CURRENT_USER);
      console.log('Extended at:', CURRENT_DATE.toISOString());

      setIsSubmitting(false);
      toast.success(
        `Deadline extended for ${selectedTasks.length} ${selectedTasks.length === 1 ? 'task' : 'tasks'}`
      );
      if (onClose) onClose();
    }, 800);
  };

  // Proceed to next step
  const handleNext = () => {
    setStep(2);
  };

  // Get selected tasks data for preview
  const selectedTasksData = allTasksData.filter((task) =>
    selectedTasks.includes(task.id.toString())
  );

  // Get status badge for a task
  const getStatusBadge = (task: Task) => {
    const dueDate = new Date(task.dueDate);
    const isOverdue = today > dueDate;

    if (isOverdue) {
      return (
        <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          Overdue
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
          Upcoming
        </Badge>
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:border-gray-700 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center gap-2">
          <PiClockCounterClockwise className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <Title as="h3" className="text-lg font-semibold">
            Extend{' '}
            {selectedTasksData.length === 1
              ? `"${selectedTasksData[0]?.title}"`
              : 'Task'}{' '}
            Deadline
          </Title>
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <PiUser className="mr-1.5 h-3 w-3" />
          <span>
            {CURRENT_USER} • {formatDate(CURRENT_DATE)}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        {step === 1 ? (
          /* Step 1: Select tasks */
          <div className="space-y-6">
            <div>
              <Text className="mb-2 font-medium">Select Tasks to Extend</Text>
              <Select
                options={eligibleTasks}
                value={selectedTasks}
                onChange={handleTaskSelection}
                multiple={true}
                placeholder="Select tasks to extend deadline"
                className="w-full"
                getOptionDisplayValue={(option: any) => (
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">
                        Due: {formatDate(new Date(option.task.dueDate))}
                      </div>
                    </div>
                    {getStatusBadge(option.task)}
                  </div>
                )}
              />

              {selectedTasks.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  {selectedTasks.length}{' '}
                  {selectedTasks.length === 1 ? 'task' : 'tasks'} selected
                </div>
              )}
            </div>

            {selectedTasks.length > 0 && (
              <>
                <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
                  <Text className="flex items-center gap-1.5 font-semibold text-blue-800 dark:text-blue-400">
                    <PiCheckCircle className="h-5 w-5" />
                    Selected Tasks
                  </Text>

                  <div className="max-h-48 space-y-2 overflow-auto">
                    {selectedTasksData.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-lg border border-white bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={task.assignedStudents[0]?.avatar}
                            name={task.title}
                            size="sm"
                            className="border border-gray-200"
                          />
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs text-gray-500">
                              Due: {formatDate(new Date(task.dueDate))}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(task)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={selectedTasks.length === 0}
                    className="flex items-center"
                  >
                    Continue
                    <PiArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Step 2: Choose extension option */
          <div className="space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Text className="font-medium">Choose Extension Option</Text>
                {selectedTasks.length > 1 && (
                  <Badge variant="flat" color="info" className="text-sm">
                    {selectedTasks.length} tasks selected
                  </Badge>
                )}
              </div>

              {selectedTasks.length === 1 && selectedTasksData[0] && (
                <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={selectedTasksData[0]?.assignedStudents[0]?.avatar}
                      name={selectedTasksData[0]?.title}
                      size="sm"
                      className="border border-gray-200"
                    />
                    <div>
                      <div className="font-medium">
                        {selectedTasksData[0]?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Current due date:{' '}
                        {formatDate(new Date(selectedTasksData[0]?.dueDate))}
                      </div>
                    </div>
                    {getStatusBadge(selectedTasksData[0])}
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                {extensionOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      'flex cursor-pointer flex-col rounded-lg border p-4 transition-all',
                      selectedExtension === option.value
                        ? 'border-blue-500 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-900/20'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700/30 dark:hover:bg-blue-900/10'
                    )}
                    onClick={() => handleExtensionSelect(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <Text className="font-semibold">{option.label}</Text>
                      {selectedExtension === option.value && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                          <PiCheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <Text className="mt-1 text-sm text-gray-500">
                      {option.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {selectedExtension === 'custom' && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <Text className="mb-3 font-medium">
                  Select Custom Deadline Date
                </Text>
                <DatePicker
                  selected={customDate}
                  onChange={(date) => setCustomDate(date)}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select new deadline date"
                  className="w-full"
                  minDate={CURRENT_DATE} // Can't select dates in the past
                />
              </div>
            )}

            {selectedExtension && selectedExtension !== 'custom' && (
              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
                <Text className="flex items-center gap-1.5 font-medium text-blue-800 dark:text-blue-400">
                  <PiCalendarCheck className="h-5 w-5" />
                  Preview of New Deadlines
                </Text>

                <div className="mt-3 max-h-48 space-y-2 overflow-auto">
                  {selectedTasksData.map((task) => {
                    const originalDeadline = new Date(task.dueDate);
                    const newDeadline = getNewDeadline(task, selectedExtension);

                    return (
                      <div
                        key={task.id}
                        className="rounded-lg border border-white bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Text className="mb-1 font-medium">{task.title}</Text>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col text-sm">
                            <span className="text-gray-500">
                              Current: {formatDate(originalDeadline)}
                            </span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              New: {formatDate(newDeadline)}
                            </span>
                          </div>
                          <Badge
                            variant="flat"
                            color="success"
                            className="whitespace-nowrap"
                          >
                            +
                            {Math.round(
                              (newDeadline.getTime() -
                                originalDeadline.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{' '}
                            days
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedExtension &&
              (selectedExtension !== 'custom' || customDate) && (
                <div className="mt-4 rounded-lg border border-yellow-100 bg-yellow-50 p-4 dark:border-yellow-900/30 dark:bg-yellow-900/10">
                  <div className="flex items-start gap-3">
                    <PiWarningCircle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
                    <div>
                      <Text className="font-medium text-yellow-700 dark:text-yellow-400">
                        Important Note
                      </Text>
                      <Text className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                        Extending the deadline will notify all students assigned
                        to{' '}
                        {selectedTasks.length > 1 ? 'these tasks' : 'this task'}
                        . Make sure this extension is necessary.
                      </Text>
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-between pt-4">
              {selectedTasks.length > 1 && (
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
              {selectedTasks.length === 1 && (
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              )}

              <Button
                onClick={handleSubmit}
                disabled={
                  !selectedExtension ||
                  (selectedExtension === 'custom' && !customDate) ||
                  isSubmitting
                }
                isLoading={isSubmitting}
              >
                <PiCalendarPlusBold className="me-1.5 h-4 w-4" />
                {isSubmitting ? 'Processing...' : 'Extend Deadline'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
