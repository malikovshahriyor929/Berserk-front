'use client';

import React, { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Text, Title, Modal, ActionIcon, Input } from 'rizzui';
import { Form } from '@core/ui/form';
import {
  PiListBullets,
  PiX,
  PiPlus,
  PiDotsThreeVertical,
} from 'react-icons/pi';
import { SortableTask } from './sortable-task';
import { TaskCard } from './task-card';
import { SortableColumn } from './sortable-column';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from '@/app/shared/modal-views/use-modal';
import KanbanForm from './kanban-form';
import toast from 'react-hot-toast';
import TaskDetailsModal from './task-details-modal';
import {
  KanbanColumnInput,
  kanbanColumnSchema,
} from '@/validators/kanban-form.schema';
import useKanbanBoard, {
  KanbanBoardProvider,
  Task,
  Column,
  COLUMN_COLOR_OPTIONS,
} from '@core/hooks/use-kanban-board';
import Breadcrumb from '@core/ui/breadcrumb';

const pageHeader = {
  title: 'Task Management',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Tasks & Reminders',
    },
    {
      name: 'Kanban Board',
    },
  ],
};

// Tag color mapping
const tagColorMap: Record<string, string> = {
  Bug: 'bg-gray-200 text-gray-800',
  Customer: 'bg-gray-200 text-gray-800',
  Story: 'bg-gray-200 text-gray-800',
  Kanban: 'bg-gray-200 text-gray-800',
  Improvement: 'bg-gray-200 text-gray-800',
  Feature: 'bg-gray-200 text-gray-800',
  'Breaking Issue': 'bg-gray-200 text-gray-800',
};

function KanbanBoard() {
  const {
    columns,
    tasks,
    addColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
    getTasksByColumn,
    moveTask,
  } = useKanbanBoard();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'task' | 'column' | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);

  const { openModal } = useModal();

  // Add this state in your KanbanBoard component
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Add this handler function
  const handleViewTaskDetails = (task: Task) => {
    setSelectedTask(task);
  };

  // Add this close handler
  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  // Setup drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      setActiveId(active.id);

      // Check if we're dragging a task or a column
      if (active.id.toString().includes('::')) {
        setActiveType('task');
        // Find the active task
        const [taskId, columnId] = active.id.toString().split('::');
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          setActiveItem(task);
        }
      } else {
        setActiveType('column');
        const column = columns.find((c) => c.id === active.id);
        if (column) {
          setActiveItem(column);
        }
      }
    },
    [columns, tasks]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveId(null);
        setActiveType(null);
        setActiveItem(null);
        return;
      }

      // Handle column reordering
      if (
        !active.id.toString().includes('::') &&
        !over.id.toString().includes('::')
      ) {
        const activeIndex = columns.findIndex((col) => col.id === active.id);
        const overIndex = columns.findIndex((col) => col.id === over.id);

        if (activeIndex !== overIndex) {
          reorderColumns(activeIndex, overIndex);
        }

        setActiveId(null);
        setActiveType(null);
        setActiveItem(null);
        return;
      }

      // Handle task movement
      if (active.id.toString().includes('::')) {
        const [activeTaskId, activeColumnId] = active.id.toString().split('::');

        // Dropping on a column container
        if (!over.id.toString().includes('::')) {
          const destinationColumnId = over.id.toString();
          const columnTasks = getTasksByColumn(destinationColumnId);
          moveTask(
            activeTaskId,
            activeColumnId,
            destinationColumnId,
            columnTasks.length
          );
        }
        // Dropping on another task
        else {
          const [overTaskId, overColumnId] = over.id.toString().split('::');
          const overTasks = getTasksByColumn(overColumnId);
          const overTaskIndex = overTasks.findIndex(
            (task) => task.id === overTaskId
          );

          // If dropped on itself, do nothing
          if (activeTaskId === overTaskId && activeColumnId === overColumnId) {
            setActiveId(null);
            setActiveType(null);
            setActiveItem(null);
            return;
          }

          moveTask(activeTaskId, activeColumnId, overColumnId, overTaskIndex);
        }
      }

      setActiveId(null);
      setActiveType(null);
      setActiveItem(null);
    },
    [columns, getTasksByColumn, moveTask, reorderColumns]
  );

  // Handle drag over for container dropping
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active.id.toString().includes('::')) return;

    const [activeTaskId, activeColumnId] = active.id.toString().split('::');

    // If dragging over a column container
    if (!over.id.toString().includes('::')) {
      const overColumnId = over.id.toString();
      if (activeColumnId !== overColumnId) {
        // Here you could set a state to show a visual indication
      }
    }
  }, []);

  // Open add/edit task modal with proper context
  const handleOpenTaskModal = useCallback(
    (columnId: string, task?: Task) => {
      // Defensive: ensure createdAt is present
      const modalTask = task
        ? { ...task, createdAt: task.createdAt ?? new Date() }
        : undefined;

      openModal({
        view: (
          <KanbanBoardProvider>
            <KanbanForm columnId={columnId} task={modalTask} />
          </KanbanBoardProvider>
        ),
        customSize: 600,
      });
    },
    [openModal]
  );

  // Open column form modal
  const handleOpenColumnModal = (column?: Column) => {
    setEditingColumn(column || null);
    setIsColumnModalOpen(true);
  };

  // Handle column submission
  const handleColumnSubmit = (data: KanbanColumnInput & { color: string }) => {
    if (editingColumn) {
      updateColumn({
        ...editingColumn,
        ...data,
      });
      toast.success('Column updated successfully');
    } else {
      addColumn({
        ...data,
        id: uuidv4(),
        icon: <PiListBullets className="mr-2 h-5 w-5" />,
      });
      toast.success('New column added successfully');
    }
    setIsColumnModalOpen(false);
    setEditingColumn(null);
  };

  // Handle column deletion
  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId);
    toast.success('Column deleted successfully');
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Title
            as="h2"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
          >
            {pageHeader.title}
          </Title>

          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="flex-wrap"
          >
            {pageHeader.breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item?.href })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleOpenColumnModal()}
            className="flex items-center gap-1"
            variant="outline"
          >
            View as List
          </Button>
          <Button
            onClick={() => handleOpenColumnModal()}
            className="flex items-center gap-1"
            variant="outline"
          >
            <PiPlus size={18} />
            Add Column
          </Button>
          <Button
            onClick={() => handleOpenTaskModal('todo')}
            className="bg-mainBlue flex items-center gap-1"
          >
            <PiPlus size={18} />
            New Task
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnTasks = getTasksByColumn(column.id);
              return (
                <SortableColumn
                  key={column.id}
                  id={column.id}
                  column={column}
                  onAddTask={() => handleOpenTaskModal(column.id)}
                  onEditColumn={() => handleOpenColumnModal(column)}
                  onDeleteColumn={() => handleDeleteColumn(column.id)}
                >
                  <SortableContext
                    items={columnTasks.map(
                      (task) => `${task.id}::${column.id}`
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnTasks.map((task) => (
                      <SortableTask
                        key={`${task.id}::${column.id}`}
                        id={`${task.id}::${column.id}`}
                        task={task}
                        tagColorMap={tagColorMap}
                        onEdit={() => handleOpenTaskModal(column.id, task)}
                        onViewDetails={() => handleViewTaskDetails(task)}
                      />
                    ))}
                  </SortableContext>
                </SortableColumn>
              );
            })}
          </div>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && activeType === 'task' && activeItem ? (
            <TaskCard task={activeItem} tagColorMap={tagColorMap} />
          ) : activeId && activeType === 'column' && activeItem ? (
            <div className="flex w-[280px] flex-col rounded-lg bg-gray-50 p-3 opacity-80">
              <div
                className={`mb-4 flex items-center justify-between rounded-md p-2 ${activeItem.color}`}
              >
                <div className="flex items-center">
                  {activeItem.icon}
                  <Title as="h3" className="font-semibold">
                    {activeItem.title}
                  </Title>
                </div>
                <div className="opacity-50">
                  <PiDotsThreeVertical size={18} />
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Column Form Modal with Color Selection */}
      <Modal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
      >
        <KanbanBoardProvider>
          <div className="m-auto p-4 md:px-7 md:py-10">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-lg">
                {editingColumn ? 'Edit Column' : 'Add New Column'}
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => setIsColumnModalOpen(false)}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiX className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>

            <Form<KanbanColumnInput & { color: string }>
              validationSchema={kanbanColumnSchema}
              onSubmit={handleColumnSubmit}
              useFormProps={{
                defaultValues: {
                  id: editingColumn?.id || '',
                  title: editingColumn?.title || '',
                  color: editingColumn?.color || 'bg-blue-100 text-blue-700',
                },
              }}
              className="grid grid-cols-1 gap-5 [&_label]:font-medium"
            >
              {({
                register,
                control,
                watch,
                setValue,
                formState: { errors },
              }) => {
                const selectedColor = watch('color');

                return (
                  <>
                    <input type="hidden" {...register('id')} />

                    <Input
                      label="Column Title"
                      placeholder="Enter column title"
                      {...register('title')}
                      error={errors.title?.message}
                    />

                    {/* Color Selector */}
                    <div>
                      <Text as="strong" className="mb-1.5 block font-medium">
                        Column Color
                      </Text>
                      <div className="grid grid-cols-5 gap-2">
                        {COLUMN_COLOR_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => setValue('color', option.value)}
                            style={{ backgroundColor: option.color }}
                            className={`h-8 w-full cursor-pointer rounded-md border ${
                              selectedColor === option.value
                                ? 'ring-2 ring-blue-500 ring-offset-1'
                                : 'border-gray-200 hover:opacity-80'
                            }`}
                            title={option.label}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      <Text as="span" className="text-xs text-gray-500">
                        Preview:
                      </Text>
                      <div className={`mt-1 rounded p-2 ${selectedColor}`}>
                        <div className="flex items-center">
                          <PiListBullets className="mr-2 h-5 w-5" />
                          <span>{watch('title') || 'Column Title'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full grid grid-cols-2 gap-4 pt-5">
                      <Button
                        variant="outline"
                        onClick={() => setIsColumnModalOpen(false)}
                        className="w-full"
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="w-full">
                        {editingColumn ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </>
                );
              }}
            </Form>
          </div>
        </KanbanBoardProvider>
      </Modal>

      {/* Task Details Modal */}
      {selectedTask && (
        <KanbanBoardProvider>
          <TaskDetailsModal
            isOpen={Boolean(selectedTask)}
            onClose={handleCloseTaskDetails}
            task={selectedTask}
            onEdit={() =>
              handleOpenTaskModal(selectedTask.columnId, selectedTask)
            }
          />
        </KanbanBoardProvider>
      )}
    </>
  );
}

// Export the board with its provider
export default function KanbanWithProvider() {
  return (
    <KanbanBoardProvider>
      <KanbanBoard />
    </KanbanBoardProvider>
  );
}
