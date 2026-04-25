'use client';

import { v4 as uuidv4 } from 'uuid';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, UseFormSetValue } from 'react-hook-form';
import {
  ActionIcon,
  Button,
  Input,
  Text,
  Textarea,
  Title,
  Badge,
} from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@core/ui/form';
import toast from 'react-hot-toast';
import { DatePicker } from '@core/ui/datepicker';
import {
  KanbanTaskInput,
  kanbanTaskSchema,
  TaskPriority,
} from '@/validators/kanban-form.schema';
import { useState } from 'react';
import useKanbanBoard, { PRIORITY_COLORS } from '@core/hooks/use-kanban-board';

interface KanbanFormProps {
  columnId?: string;
  task?: KanbanTaskInput & { id: string; createdAt: Date };
}

// Priority options with colors
const PRIORITY_OPTIONS = [
  { label: 'Open', value: 'open', color: 'bg-gray-200' },
  { label: 'Urgent', value: 'urgent', color: 'bg-red-100' },
  { label: 'High', value: 'high', color: 'bg-yellow-100' },
  { label: 'Normal', value: 'normal', color: 'bg-blue-100' },
  { label: 'Low', value: 'low', color: 'bg-gray-100' },
];

export default function KanbanForm({ columnId, task }: KanbanFormProps) {
  const { closeModal } = useModal();
  const { addTask, updateTask, columns } = useKanbanBoard();
  const [tagInput, setTagInput] = useState<string>('');

  const isUpdateTask = !!task;

  // Ensure we have a valid task with createdAt for editing
  const safeTask = task
    ? { ...task, createdAt: task.createdAt ?? new Date() }
    : undefined;

  // Ensure we're using a valid columnId
  const effectiveColumnId = columnId || columns[0]?.id;

  const onSubmit: SubmitHandler<KanbanTaskInput> = (data) => {
    // Ensure priority is a valid string
    const priority = data.priority || 'open';

    if (isUpdateTask && safeTask) {
      const updatedTask = {
        ...safeTask,
        ...data,
        id: safeTask.id,
        columnId: safeTask.columnId, // Cannot change column when editing
        createdAt: safeTask.createdAt || new Date(),
        description: data.description || '',
        tags: data.tags ?? [],
        priority: priority as TaskPriority,
      };
      console.log('Updating task:', updatedTask);
      updateTask(updatedTask);
      toast.success(<Text as="b">Task Updated Successfully</Text>);
    } else {
      const newTask = {
        ...data,
        id: uuidv4(), // Use UUID instead of lodash uniqueId
        columnId: effectiveColumnId,
        createdAt: new Date(),
        description: data.description || '',
        tags: data.tags ?? [],
        priority: priority as TaskPriority,
      };

      console.log('Adding new task:', newTask);
      addTask(newTask);
      toast.success(<Text as="b">Task Created Successfully</Text>);
    }
    closeModal();
  };

  // Add tag to task
  const handleAddTag = (
    tags: string[],
    setValue: UseFormSetValue<KanbanTaskInput>
  ) => {
    if (!tagInput.trim()) return;
    setValue('tags', [...(tags || []), tagInput.trim()]);
    setTagInput('');
  };

  // Remove tag from task
  const handleRemoveTag = (
    tagToRemove: string,
    tags: string[],
    setValue: UseFormSetValue<KanbanTaskInput>
  ) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isUpdateTask ? 'Update Task' : 'Create a new task'}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <Form<KanbanTaskInput>
        validationSchema={kanbanTaskSchema as any}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            id: safeTask?.id ?? '',
            title: safeTask?.title ?? '',
            description: safeTask?.description ?? '',
            tags: safeTask?.tags ?? [],
            dueDate: safeTask?.dueDate ?? null,
            assignee: safeTask?.assignee ?? 'AF',
            columnId: safeTask?.columnId ?? effectiveColumnId,
            priority: safeTask?.priority ?? 'open',
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({ register, control, setValue, watch, formState: { errors } }) => {
          const tags = watch('tags') || [];
          const priority = watch('priority') || 'open';

          return (
            <>
              {safeTask?.id && (
                <input type="hidden" {...register('id')} value={safeTask.id} />
              )}

              <Input
                label="Task Title"
                placeholder="Enter task title"
                {...register('title')}
                className="col-span-full"
                error={errors.title?.message}
              />

              <Textarea
                label="Task Description"
                placeholder="Enter task description"
                {...register('description')}
                error={errors.description?.message}
                textareaClassName="h-20"
                className="col-span-full"
              />

              {/* Hidden column ID input */}
              <input
                type="hidden"
                {...register('columnId')}
                value={safeTask?.columnId || columnId || columns[0]?.id}
              />

              <Controller
                name="dueDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    minDate={new Date()}
                    showTimeSelect
                    isClearable={true}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select due date"
                  />
                )}
              />

              {/* Radio Button Priority Selection */}
              <div className="col-span-full">
                <Text as="strong" className="mb-2 block font-medium">
                  Priority
                </Text>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-wrap gap-3">
                      {PRIORITY_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => onChange(option.value)}
                          className={`${option.color} flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 ${
                            value === option.value
                              ? 'ring-2 ring-blue-500 ring-offset-1'
                              : 'hover:opacity-80'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="h-4 w-4"
                          />
                          <span>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.priority?.message && (
                  <Text className="mt-1 text-xs text-red-500">
                    {errors.priority?.message}
                  </Text>
                )}
              </div>

              {/* Preview how task will look */}
              <div className="col-span-full mt-2">
                <Text as="span" className="text-xs text-gray-500">
                  Task appearance preview:
                </Text>
                <div
                  className={`mt-1 rounded border p-2 ${PRIORITY_COLORS[priority as TaskPriority]}`}
                >
                  <Text className="text-sm font-medium">
                    {watch('title') || 'Task title'}
                  </Text>
                </div>
              </div>

              <div className="col-span-full">
                <Text as="strong" className="mb-1.5 block font-medium">
                  Tags
                </Text>
                <div className="mb-2 flex flex-wrap gap-1">
                  {tags.map((tag: string) => (
                    <Badge
                      variant="outline"
                      key={tag}
                      className="flex items-center gap-1 bg-gray-200"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag, tags, setValue)}
                        className="ml-1 rounded-full"
                        type="button"
                      >
                        <PiXBold size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTagInput(e.target.value)
                    }
                    placeholder="Add tag"
                    className="flex-1"
                    onKeyPress={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(tags, setValue);
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleAddTag(tags, setValue)}
                    type="button"
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 w-full @xl:w-auto"
                >
                  {isUpdateTask ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
