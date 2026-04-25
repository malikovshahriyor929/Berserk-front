import { Controller, UseFormReturn } from 'react-hook-form';
import { Text, Input, Textarea, AdvancedRadio, Title, Button } from 'rizzui';
import {
  PiFileTextBold,
  PiBookOpenBold,
  PiSkipForwardBold,
  PiCaretRight,
  PiListChecksBold,
} from 'react-icons/pi';
import { EditTaskFormInput } from '@/validators/edit-task-form.schema';
import TagsInput from '../tags-input';
import ChecklistInput from '../checklist-input';
import FileUploader from '../file-uploader';
import { useRouter } from '@/i18n/routing';
import { routes } from '@/config/routes';

interface TaskDetailsStepProps {
  form: UseFormReturn<EditTaskFormInput>;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  checklistFields: any[];
  attachmentFields: any[];
  addChecklistItem: () => void;
  removeChecklist: (index: number) => void;
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileUpload: (files: File[]) => void;
  removeAttachment: (index: number) => void;
  nextStep: () => void;
  skipStep: () => void;
}

export default function TaskDetailsStep({
  form,
  tags,
  onAddTag,
  onRemoveTag,
  checklistFields,
  attachmentFields,
  addChecklistItem,
  removeChecklist,
  dragOver,
  setDragOver,
  handleFileDrop,
  handleFileUpload,
  removeAttachment,
  nextStep,
  skipStep,
}: TaskDetailsStepProps) {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {/* Task Basic Information */}
        <div className="rounded-lg border border-mainBlue/50 p-5 shadow-sm dark:border-gray-300">
          <Title
            as="h4"
            className="mb-5 flex items-center gap-2 border-b border-dashed pb-3 text-mainBlue dark:text-gray-700"
          >
            <span className="rounded-md bg-blue-50 p-2 text-mainBlue">
              <PiFileTextBold className="h-5 w-5" />
            </span>
            Task Basic Information
          </Title>

          {/* Title */}
          <div className="mb-4">
            <Text className="mb-2 block font-medium text-gray-900">
              Task Title
            </Text>
            <Input
              placeholder="Enter task title"
              {...register('title')}
              error={errors.title?.message}
              className="font-medium"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <Text className="mb-2 block font-medium text-gray-900">
              Description
            </Text>
            <Textarea
              placeholder="Enter task description"
              {...register('description')}
              textareaClassName="h-28"
            />
          </div>

          {/* Task Type */}
          <div className="mb-4">
            <Text className="mb-2 block font-medium text-gray-900">
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
        </div>

        {/* Tags Input Component */}
        <TagsInput tags={tags} onAddTag={onAddTag} onRemoveTag={onRemoveTag} />

        {/* Checklist Component */}
        <ChecklistInput
          checklistFields={checklistFields}
          addItem={addChecklistItem}
          removeItem={removeChecklist}
          control={control}
        />

        {/* File Uploader Component */}
        <FileUploader
          attachmentFields={attachmentFields}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleFileDrop={handleFileDrop}
          handleFileUpload={handleFileUpload}
          removeAttachment={removeAttachment}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(routes.tasks.allTasks)}
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={skipStep}
            className="flex items-center"
          >
            <PiSkipForwardBold className="mr-1.5 h-4 w-4" />
            Skip
          </Button>
          <Button type="button" onClick={nextStep}>
            Continue
            <PiCaretRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
