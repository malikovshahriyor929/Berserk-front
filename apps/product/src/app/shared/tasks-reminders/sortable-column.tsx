'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Title, ActionIcon, Popover } from 'rizzui';
import { PiPlus, PiDotsThreeVertical, PiPencil, PiTrash } from 'react-icons/pi';
import { Column } from '@core/hooks/use-kanban-board';

interface SortableColumnProps {
  id: string;
  column: Column;
  children: React.ReactNode;
  onAddTask: () => void;
  onEditColumn: () => void;
  onDeleteColumn: () => void;
}

export function SortableColumn({
  id,
  column,
  children,
  onAddTask,
  onEditColumn,
  onDeleteColumn,
}: SortableColumnProps) {
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
    width: 280,
    minWidth: 280,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-100 min-h-56 p-3"
    >
      <div
        className={`mb-4 flex items-center justify-between rounded-md p-2 ${column.color}`}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center">
          {column.icon}
          <Title as="h5" className="font-semibold text-mainBlue dark:text-mainBlue text-base ml-1">
            {column.title}
          </Title>
        </div>
        <div className="flex items-center">
          <ActionIcon
            onClick={onAddTask}
            variant="text"
            size="sm"
            className="mr-1"
          >
            <PiPlus size={18} />
          </ActionIcon>

          <Popover placement="bottom-end">
            <Popover.Trigger>
              <ActionIcon variant="text" size="sm">
                <PiDotsThreeVertical size={18} />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="min-w-[160px] p-2">
              <div className="flex flex-col">
                <button
                  onClick={onEditColumn}
                  className="flex items-center gap-2 text-gray-600 rounded-md p-2 hover:bg-gray-100"
                >
                  <PiPencil size={16} />
                  <span>Edit Column</span>
                </button>
                <button
                  onClick={onDeleteColumn}
                  className="flex items-center gap-2 rounded-md p-2 text-red-500 hover:bg-gray-100"
                >
                  <PiTrash size={16} />
                  <span>Delete Column</span>
                </button>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4">{children}</div>
    </div>
  );
}
