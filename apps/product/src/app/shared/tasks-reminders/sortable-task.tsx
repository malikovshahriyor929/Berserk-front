'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Text, ActionIcon, Popover } from 'rizzui';
import { PiDotsThreeVertical, PiCircle, PiCircleFill } from 'react-icons/pi';
import useKanbanBoard, {
  Task,
  PRIORITY_COLORS,
} from '@core/hooks/use-kanban-board';
import { TaskPriority } from '@/validators/kanban-form.schema';

interface SortableTaskProps {
  id: string;
  task: Task;
  tagColorMap: Record<string, string>;
  onEdit: () => void;
  onViewDetails: () => void;
}

// Priority color mapping
const priorityColorMap: Record<TaskPriority, string> = {
  open: 'text-gray-400',
  urgent: 'text-red-500',
  high: 'text-yellow-500',
  normal: 'text-blue-500',
  low: 'text-gray-500',
};

export function SortableTask({
  id,
  task,
  tagColorMap,
  onEdit,
  onViewDetails,
}: SortableTaskProps) {
  const { deleteTask } = useKanbanBoard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // Priority icon component
  const PriorityIcon = () => {
    switch (task.priority) {
      // case 'open':
      //   return (
      //     <PiCircle className={`${priorityColorMap[task.priority]} h-4 w-4`} />
      //   );
      default:
        return (
          <PiCircleFill
            // className={`${priorityColorMap[task.priority]} h-4 w-4`}
          />
        );
    }
  };

  // Get the background color for the task based on priority
  const priorityBgClass = PRIORITY_COLORS[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-pointer rounded-md border-l-4 border-l-[#5c6bc0] ${priorityBgClass} p-3 shadow-sm`}
      onClick={() => onViewDetails()}
    >
      <div className="mb-1 flex items-center justify-between">
        <Text className="text-xs text-gray-500">
          Task - {task.id.substring(0, 8)}
        </Text>
        <Popover placement="bottom-end">
          <Popover.Trigger>
            <ActionIcon
              variant="text"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent onClick
              }}
            >
              <PiDotsThreeVertical size={16} />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="min-w-[160px] p-2">
            <div className="flex flex-col">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100"
              >
                <span>Edit Task</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="flex items-center gap-2 rounded-md p-2 text-red-500 hover:bg-gray-100"
              >
                <span>Delete Task</span>
              </button>
            </div>
          </Popover.Content>
        </Popover>
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
