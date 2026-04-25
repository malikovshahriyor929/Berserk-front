'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Input,
  Textarea,
  Text,
  Badge,
  Avatar,
  Checkbox,
  ActionIcon,
  Select,
  Switch,
  AdvancedRadio,
} from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import {
  PiPlusBold,
  PiTrashBold,
  PiXBold,
  PiUploadSimpleBold,
  PiCheckCircleBold,
  PiBookOpenBold,
  PiFileTextBold,
  PiListChecksBold,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { routes } from '@/config/routes';
import { studentsData, classesData, Student } from '@/data/students-data';
import { log } from 'console';

// Define task priorities
export const TaskPriority = z.enum(['urgent', 'high', 'normal', 'low']);
export type TaskPriorityType = z.infer<typeof TaskPriority>;

// Define checklist item schema
export const ChecklistItemSchema = z.object({
  id: z.string(),
  text: z.string().min(1, { message: "Checklist item can't be empty" }),
  isCompleted: z.boolean().default(false),
});
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

// Define attachment schema
export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string().optional(),
});
export type Attachment = z.infer<typeof AttachmentSchema>;

// Define the form schema directly in this file to avoid import issues
const assignTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  deadline: z
    .date({
      required_error: 'Deadline is required',
      invalid_type_error: 'Deadline must be a valid date',
    })
    .refine((date) => date > new Date(), {
      message: 'Deadline must be in the future',
    }),
  priority: z.enum(['urgent', 'high', 'normal', 'low']).default('normal'),
  taskType: z.enum(['reading', 'worksheet', 'quiz']).default('reading'),
  checklistItems: z.array(ChecklistItemSchema).optional().default([]),
  attachments: z.array(AttachmentSchema).optional().default([]),
  selectedStudents: z
    .array(z.string())
    .min(1, { message: 'Select at least one student' }),
  selectedClasses: z.array(z.string()).optional().default([]),
});

// Generate form types from zod validation schema
export type AssignTaskFormInput = z.infer<typeof assignTaskSchema>;

// Task type options
const taskTypeOptions = [
  {
    value: 'reading',
    name: 'Reading',
    icon: <PiBookOpenBold className="me-1.5 h-4 w-4" />,
  },
  {
    value: 'worksheet',
    name: 'Worksheet',
    icon: <PiFileTextBold className="me-1.5 h-4 w-4" />,
  },
  {
    value: 'quiz',
    name: 'Quiz',
    icon: <PiListChecksBold className="me-1.5 h-4 w-4" />,
  },
];

// Priority options with colors
const priorityOptions = [
  { name: 'Urgent', value: 'urgent', color: 'bg-red-100 text-red-600' },
  { name: 'High', value: 'high', color: 'bg-orange-100 text-orange-600' },
  { name: 'Normal', value: 'normal', color: 'bg-blue-100 text-blue-600' },
  { name: 'Low', value: 'low', color: 'bg-green-100 text-green-600' },
];

export default function AssignTaskForm() {
  const router = useRouter();
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [showByClass, setShowByClass] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Set up form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssignTaskFormInput>({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'normal',
      taskType: 'reading',
      checklistItems: [],
      attachments: [],
      selectedStudents: [],
      selectedClasses: [],
    },
  });

  // Setup field arrays for checklist items
  const {
    fields: checklistFields,
    append: appendChecklist,
    remove: removeChecklist,
  } = useFieldArray({
    control,
    name: 'checklistItems',
  });

  // Setup field arrays for attachments
  const {
    fields: attachmentFields,
    append: appendAttachment,
    remove: removeAttachment,
  } = useFieldArray({
    control,
    name: 'attachments',
  });

  // Section title component for form sections
  interface SectionTitleProps {
    icon: React.ReactNode;
    title: string;
  }
  
  const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
    <div className="mb-6 mr-2 flex flex-1 items-center border-b border-dashed border-gray-500 pb-3">
      <span className="mr-2 rounded-md bg-[#043764]/10 p-2 text-[#043764]">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
  );

  // Convert selected student IDs to Student objects
  const selectedStudents = selectedStudentIds
    .map((id) => studentsData.find((student) => student.id === id))
    .filter((student): student is Student => !!student);

  // Update form values when selected students/classes change
  useEffect(() => {
    setValue('selectedStudents', selectedStudentIds);
    setValue('selectedClasses', selectedClassIds);
  }, [selectedStudentIds, selectedClassIds, setValue]);

  // Handle student selection toggling
  const handleToggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle class selection toggling
  const handleToggleClass = (classId: string) => {
    if (selectedClassIds.includes(classId)) {
      // Remove class and all its students
      setSelectedClassIds((prev) => prev.filter((id) => id !== classId));

      const studentIdsInClass =
        classesData.find((c) => c.id === classId)?.students.map((s) => s.id) ||
        [];

      setSelectedStudentIds((prev) =>
        prev.filter((id) => !studentIdsInClass.includes(id))
      );
    } else {
      // Add class and all its students
      setSelectedClassIds((prev) => [...prev, classId]);

      const studentIdsInClass =
        classesData.find((c) => c.id === classId)?.students.map((s) => s.id) ||
        [];

      setSelectedStudentIds((prev) => {
        const newIds = [...prev];
        studentIdsInClass.forEach((id) => {
          if (!newIds.includes(id)) {
            newIds.push(id);
          }
        });
        return newIds;
      });
    }
  };

  // Handle file drops
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    }
  };

  // Handle file uploads
  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      appendAttachment({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    });
  };

  // Add new checklist item
  const addChecklistItem = () => {
    appendChecklist({
      id: uuidv4(),
      text: '',
      isCompleted: false,
    });
  };

  // Form submission handler
  const onSubmit: SubmitHandler<AssignTaskFormInput> = (data) => {
    console.log('Form Data:', data);

    // Create task object from form data
    const taskData = {
      id: uuidv4(),
      title: data.title,
      description: data.description || '',
      deadline: data.deadline.toISOString(),
      priority: data.priority,
      taskType: data.taskType,
      checklistItems: data.checklistItems || [],
      attachments: data.attachments || [],
      assignedStudents: selectedStudents,
      status: 0, // New task starts at 0% completion
      submittedCount: 0,
      totalAssigned: selectedStudents.length,
      createdAt: new Date().toISOString(),
    };

    console.log('Task assigned:', taskData);
    toast.success(
      `Task "${data.title}" assigned to ${selectedStudents.length} students!`
    );

    // Navigate back to tasks page
    setTimeout(() => {
      router.push(routes.tasks.allTasks);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="@container">
      <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-12">
        {/* Left column - Task details */}
        <div className="@3xl:col-span-8 @3xl:space-y-6">
          {/* Basic task information */}
          <div className="rounded-lg border border-gray-300 p-5 shadow-sm">
            <SectionTitle
              icon={<PiPlusBold className="h-5 w-5" />}
              title="Task details"
            />
            <div className="mb-6">
              <Text className="mb-2 block font-medium text-gray-600">
                Task Title
              </Text>
              <Input
                placeholder="Enter task title"
                {...register('title')}
                error={errors.title?.message}
              />
            </div>
            {/*  Task type selection */}
            <div className="mb-6">
              <Text className="mb-2 block font-medium text-gray-600">
                Task Type
              </Text>
              <Controller
                name="taskType"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <AdvancedRadio
                      name="taskType"
                      value="reading"
                      checked={field.value === 'reading'}
                      onChange={() => field.onChange('reading')}
                      className="hover:border-primary-light border-primary-lighter"
                      inputClassName="border-primary-lighter checked:border-blue-900 checked:bg-blue-900"
                    >
                      <PiBookOpenBold className="mx-auto mb-3 h-auto w-7 text-primary" />
                      <Text className="text-center text-xs font-semibold">
                        Reading
                      </Text>
                    </AdvancedRadio>

                    <AdvancedRadio
                      name="taskType"
                      value="worksheet"
                      checked={field.value === 'worksheet'}
                      onChange={() => field.onChange('worksheet')}
                      className="hover:border-primary-light border-primary-lighter"
                      inputClassName="border-primary-lighter checked:border-blue-900 checked:bg-blue-900"
                    >
                      <PiFileTextBold className="mx-auto mb-3 h-auto w-7 text-primary" />
                      <Text className="text-center text-xs font-semibold">
                        Worksheet
                      </Text>
                    </AdvancedRadio>

                    <AdvancedRadio
                      name="taskType"
                      value="quiz"
                      checked={field.value === 'quiz'}
                      onChange={() => field.onChange('quiz')}
                      className="hover:border-primary-light border-primary-lighter"
                      inputClassName="border-primary-lighter checked:border-blue-900 checked:bg-blue-900"
                    >
                      <PiListChecksBold className="mx-auto mb-3 h-auto w-7 text-primary" />
                      <Text className="text-center text-xs font-semibold">
                        Quiz
                      </Text>
                    </AdvancedRadio>
                  </div>
                )}
              />
            </div>
            {/* Deadline section */}
            <div className="mb-6">
              <Text
                as="strong"
                className="mb-1.5 block font-medium text-gray-600"
              >
                Deadline
              </Text>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    placeholderText="Select task deadline"
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                )}
              />
            </div>
            {/* Priority section update */}
            <div className="mb-6">
              <Text
                as="strong"
                className="mb-1.5 block font-medium text-gray-600"
              >
                Priority
              </Text>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    <AdvancedRadio
                      name="priority"
                      value="urgent"
                      checked={field.value === 'urgent'}
                      onChange={() => field.onChange('urgent')}
                      className="overflow-clip rounded-md border-red-200 bg-red-50 text-red-600 checked:bg-red-500 hover:border-red-300 [&_span]:border-red-200"
                      inputClassName="border-red-200 checked:border-red-600 checked:bg-red-600 focus:ring-red-600"
                      alignment="center"
                    >
                      Urgent
                    </AdvancedRadio>

                    <AdvancedRadio
                      name="priority"
                      value="high"
                      checked={field.value === 'high'}
                      onChange={() => field.onChange('high')}
                      className="overflow-clip rounded-md border-orange-200 bg-orange-50 text-orange-600 hover:border-orange-300 [&_span]:border-orange-200"
                      inputClassName="border-orange-200 checked:border-orange-600 checked:bg-orange-600 focus:ring-orange-600"
                      alignment="center"
                    >
                      High
                    </AdvancedRadio>

                    <AdvancedRadio
                      name="priority"
                      value="normal"
                      checked={field.value === 'normal'}
                      onChange={() => field.onChange('normal')}
                      className="overflow-clip rounded-md border-blue-200 bg-blue-100 text-blue-600 hover:border-blue-300 [&_span]:border-blue-200"
                      inputClassName="border-blue-200 checked:border-blue-600 checked:bg-blue-600 focus:ring-blue-600"
                      alignment="center"
                    >
                      Normal
                    </AdvancedRadio>

                    <AdvancedRadio
                      name="priority"
                      value="low"
                      checked={field.value === 'low'}
                      onChange={() => field.onChange('low')}
                      className="overflow-clip rounded-md border-green-200 bg-green-100 text-green-600 hover:border-green-300 [&_span]:border-green-200"
                      inputClassName="border-green-200 checked:border-green-600 checked:bg-green-600 focus:ring-green-600"
                      alignment="center"
                    >
                      Low
                    </AdvancedRadio>
                  </div>
                )}
              />
            </div>
            <div className="mb-6">
              <Text
                as="strong"
                className="my-1.5 block font-medium text-gray-900"
              >
                Description
              </Text>
              <Textarea
                placeholder="Enter task description"
                {...register('description')}
                textareaClassName="h-28"
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-6 rounded-lg border border-gray-300 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <SectionTitle
                icon={<PiCheckCircleBold className="h-5 w-5" />}
                title="Checklist Items"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addChecklistItem}
                className="h-8 w-8 p-0"
              >
                <PiPlusBold className="h-4 w-4" />
              </Button>
            </div>

            {checklistFields.length === 0 ? (
              <Text className="mb-4 text-sm text-gray-500">
                Add checklist items that students need to complete
              </Text>
            ) : (
              <div className="space-y-4">
                {checklistFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Controller
                      name={`checklistItems.${index}.text`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          placeholder="Enter checklist item"
                          {...field}
                          className="flex-grow"
                        />
                      )}
                    />
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      onClick={() => removeChecklist(index)}
                    >
                      <PiTrashBold className="h-4 w-4 text-red-500" />
                    </ActionIcon>
                  </div>
                ))}
              </div>
            )}

            {checklistFields.length === 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={addChecklistItem}
                className="w-full"
              >
                <PiPlusBold className="me-1.5 h-4 w-4" />
                Add Checklist Item
              </Button>
            )}
          </div>

          {/* Attachments */}
          <div className="mt-6 rounded-lg border border-gray-300 p-5 shadow-sm">
            <SectionTitle
              icon={<PiUploadSimpleBold className="h-5 w-5" />}
              title="Attachments"
            />

            <div
              className={cn(
                'relative mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors',
                dragOver && 'border-blue-500 bg-blue-50'
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
            >
              <PiUploadSimpleBold className="mb-2 h-8 w-8 text-gray-400" />
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium text-blue-700">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOCX, XLSX, JPG, PNG (Max 10MB each)
              </p>

              <input
                type="file"
                multiple
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(Array.from(e.target.files));
                    e.target.value = ''; // Reset input
                  }
                }}
              />
            </div>

            {attachmentFields.length > 0 && (
              <div className="space-y-2">
                {attachmentFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between rounded-md border border-gray-200 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                        {getFileIcon(field.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{field.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(field.size)}
                        </p>
                      </div>
                    </div>
                    <ActionIcon
                      size="sm"
                      variant="text"
                      onClick={() => removeAttachment(index)}
                    >
                      <PiTrashBold className="h-4 w-4 text-red-500" />
                    </ActionIcon>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column - Student selection */}
        <div className="@3xl:col-span-4">
          <div className="rounded-lg border border-gray-300 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle
                icon={<PiBookOpenBold className="h-5 w-5" />}
                title="Assign To"
              />
              <div className="flex items-center">
                <Text className="mr-2 text-sm">By Class</Text>
                <Switch
                  variant="outline"
                  rounded="lg"
                  checked={showByClass}
                  onChange={() => setShowByClass(!showByClass)}
                />
              </div>
            </div>

            {errors.selectedStudents?.message && (
              <div className="mb-2 text-sm text-red-500">
                {errors.selectedStudents?.message}
              </div>
            )}

            {selectedStudents.length > 0 && (
              <div className="mb-4">
                <Text className="mb-2 block font-medium">
                  Selected Students ({selectedStudents.length})
                </Text>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudents.slice(0, 5).map((student) => (
                    <Badge
                      key={student.id}
                      className="flex items-center gap-1 py-1.5 pl-1 pr-1"
                    >
                      <Avatar
                        src={student.avatar}
                        name={student.name}
                        size="sm"
                        className="rounded-full"
                      />
                      <span className="ml-1 mr-1">{student.name}</span>
                      <ActionIcon
                        size="sm"
                        variant="text"
                        className="h-5 w-5"
                        onClick={() => handleToggleStudent(student.id)}
                      >
                        <PiXBold className="h-3 w-3" />
                      </ActionIcon>
                    </Badge>
                  ))}
                  {selectedStudents.length > 5 && (
                    <Badge variant="outline">
                      +{selectedStudents.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="mb-3 flex items-center justify-between">
              <Text className="font-medium text-gray-600">
                {showByClass ? 'Classes' : 'Students'}
              </Text>
              <Button
                type="button"
                color="danger"
                size="sm"
                variant="text"
                onClick={() => {
                  setSelectedStudentIds([]);
                  setSelectedClassIds([]);
                }}
              >
                Clear All
              </Button>
            </div>

            {/* Student/Class Selection */}
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
              {showByClass ? (
                // Show by class
                <div>
                  {classesData.map((classGroup) => (
                    <div
                      key={classGroup.id}
                      className="border-b last:border-b-0"
                    >
                      <div
                        className="flex cursor-pointer items-center p-3 hover:bg-gray-50"
                        onClick={() => handleToggleClass(classGroup.id)}
                      >
                        <Checkbox
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleClass(classGroup.id);
                            console.log(`Toggled class ${classGroup.id}`);
                          }}
                          className="mr-2"
                        />
                        <div className="flex-1">
                          <Text className="font-medium">{classGroup.name}</Text>
                          <Text className="text-xs text-gray-500">
                            {classGroup.students.length} students
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show individual students
                <div>
                  {studentsData.map((student) => (
                    <div
                      key={student.id}
                      className="flex cursor-pointer items-center border-b p-2 last:border-b-0 hover:bg-gray-50"
                      onClick={() => handleToggleStudent(student.id)}
                    >
                      <Checkbox
                        checked={selectedStudentIds.includes(student.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleStudent(student.id);
                        }}
                        className="mr-2"
                      />
                      <Avatar
                        src={student.avatar}
                        name={student.name}
                        size="sm"
                        className="mr-3 rounded-full"
                      />
                      <div>
                        <Text className="font-medium">{student.name}</Text>
                        <Text className="text-xs text-gray-500">
                          {student.className || 'No class'}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-900 text-white hover:bg-blue-800 sm:w-auto"
              disabled={isSubmitting}
            >
              <PiCheckCircleBold className="me-1.5 h-4 w-4" />
              {isSubmitting ? 'Assigning...' : 'Assign Task'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

// Helper function to get file icon based on type
function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) {
    return <span className="text-xs text-red-600">PDF</span>;
  } else if (fileType.includes('word') || fileType.includes('doc')) {
    return <span className="text-xs text-blue-600">DOC</span>;
  } else if (
    fileType.includes('sheet') ||
    fileType.includes('excel') ||
    fileType.includes('xls')
  ) {
    return <span className="text-xs text-green-600">XLS</span>;
  } else if (fileType.includes('image/')) {
    return <span className="text-xs text-purple-600">IMG</span>;
  }
  return <span className="text-xs text-gray-600">FILE</span>;
}

// Helper function to format file sizes
function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
