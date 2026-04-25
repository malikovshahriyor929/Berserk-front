'use client';

import React from 'react';
import { Modal, Title, Text, Badge, ActionIcon, Button } from 'rizzui';
import { PiX, PiCalendarBold, PiClockCounterClockwise } from 'react-icons/pi';
import { Task, PRIORITY_COLORS } from '@core/hooks/use-kanban-board';
import { TaskPriority } from '@/validators/kanban-form.schema';
import { format } from 'date-fns';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onEdit: () => void;
}

// Priority color and label mapping
const priorityInfo: Record<TaskPriority, { color: string; label: string }> = {
  open: { color: 'bg-gray-200 text-gray-700', label: 'Open' },
  urgent: { color: 'bg-red-100 text-red-700', label: 'Urgent' },
  high: { color: 'bg-yellow-100 text-yellow-700', label: 'High' },
  normal: { color: 'bg-blue-100 text-blue-700', label: 'Normal' },
  low: { color: 'bg-gray-100 text-gray-700', label: 'Low' },
};

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
  onEdit,
}: TaskDetailsModalProps) {
  const priority = task.priority as TaskPriority;
  const priorityStyle = priorityInfo[priority];
  const priorityBgClass = PRIORITY_COLORS[task.priority];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`${priorityBgClass} p-4 md:p-6`}>
        <div className="mb-6 flex items-center justify-between">
          <Badge className={priorityStyle.color}>{priorityStyle.label}</Badge>

          <ActionIcon
            size="sm"
            variant="text"
            onClick={onClose}
            className="p-0 text-gray-500 hover:!text-gray-900"
          >
            <PiX className="h-[18px] w-[18px]" />
          </ActionIcon>
        </div>

        <Title as="h3" className="mb-2 text-xl font-semibold">
          {task.title}
        </Title>

        <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <PiClockCounterClockwise className="h-4 w-4" />
            <span>
              Created:{' '}
              {task.createdAt ? format(task.createdAt, 'MMM dd, yyyy') : 'N/A'}
            </span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1.5">
              <PiCalendarBold className="h-4 w-4" />
              <span>Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>

        {task.description && (
          <div className="mb-6">
            <Text as="strong" className="mb-2 block font-medium">
              Description
            </Text>
            <div className="rounded bg-white bg-opacity-50 p-3">
              <Text className="whitespace-pre-wrap text-gray-600">
                {task.description}
              </Text>
            </div>
          </div>
        )}

        <div className="mb-6">
          <Text as="strong" className="mb-2 block font-medium">
            Tags
          </Text>
          <div className="flex flex-wrap gap-2">
            {task.tags && task.tags.length > 0 ? (
              task.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))
            ) : (
              <Text className="text-gray-500">No tags</Text>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Text as="strong" className="mb-2 block font-medium">
            Assignee
          </Text>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
              {task.assignee}
            </div>
            <Text>Andrew Fuller</Text>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              onClose();
              onEdit();
            }}
          >
            Edit Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
