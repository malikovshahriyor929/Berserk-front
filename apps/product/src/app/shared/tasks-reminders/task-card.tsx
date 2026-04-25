'use client';

import React from 'react';
import { Badge, Text } from 'rizzui';
import { Task, PRIORITY_COLORS } from '@core/hooks/use-kanban-board';
import { PiCircle, PiCircleFill } from 'react-icons/pi';
import { TaskPriority } from '@/validators/kanban-form.schema';

interface TaskCardProps {
  task: Task;
  tagColorMap: Record<string, string>;
}

// Priority color mapping
const priorityColorMap: Record<TaskPriority, string> = {
  open: 'text-gray-400',
  urgent: 'text-red-700',
  high: 'text-yellow-700',
  normal: 'text-blue-700',
  low: 'text-gray-600',
};

export function TaskCard({ task, tagColorMap }: TaskCardProps) {
  // Priority icon component
  const PriorityIcon = () => {
    switch (task.priority) {
      case 'open':
        return (
          <PiCircle 
          // className={`${priorityColorMap[task.priority]} h-4 w-4`}
           />
        );
      default:
        return (
          <PiCircleFill
            // className={`${priorityColorMap[task.priority]}
            //  h-4 w-4`}
          />
        );
    }
  };

  // Get the background color for the task based on priority
  const priorityBgClass = PRIORITY_COLORS[task.priority];

  return (
    <div
      className={`rounded-md border-l-4 border-l-[#5c6bc0] ${priorityBgClass} p-3 opacity-90 shadow-sm`}
    >
      <div className="mb-1">
        <Text className="text-xs text-gray-500">
          Task - {task.id.substring(0, 8)}
        </Text>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <PriorityIcon />
        <Text className="truncate text-sm font-medium">{task.title}</Text>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {task.tags &&
            task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
        </div>
        {task.assignee && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
            {task.assignee}
          </div>
        )}
      </div>
    </div>
  );
}
