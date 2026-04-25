import { Controller, UseFormReturn } from 'react-hook-form';
import { Text, Badge, Button, AdvancedRadio, Title } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import { PiClockBold, PiArrowLeft, PiCheckCircleBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { EditTaskFormInput } from '@/validators/edit-task-form.schema';
import { capitalizeFirst } from '../../hooks/use-edit-task-form';

interface PriorityDeadlineStepProps {
  form: UseFormReturn<EditTaskFormInput>;
  watchedValues: {
    title: string;
    priority: string;
    deadline: Date;
  };
  selectedStudentIds: string[];
  prevStep: () => void;
}

export default function PriorityDeadlineStep({
  form,
  watchedValues,
  selectedStudentIds,
  prevStep,
}: PriorityDeadlineStepProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="rounded-lg border border-gray-300 p-5 shadow-sm">
      <Title
        as="h4"
        className="mb-5 flex items-center gap-2 border-b border-dashed pb-3 text-mainBlue"
      >
        <span className="rounded-md bg-blue-50 p-2 text-mainBlue">
          <PiClockBold className="h-5 w-5" />
        </span>
        Set Priority & Deadline
      </Title>

      {/* Priority section */}
      <div className="mb-6">
        <Text className="mb-3 block font-medium text-mainBlue dark:text-gray-600">
          Task Priority
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
                className="overflow-clip rounded-md border-red-200 bg-red-50 dark:bg-red-900/20 text-red-600 checked:bg-red-500 hover:border-red-300 [&_span]:border-red-200"
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

      {/* Deadline section */}
      <div className="mb-6">
        <Text as="strong" className="mb-1.5 block font-medium text-mainBlue">
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
              className="w-full"
            />
          )}
        />
        {errors.deadline && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.deadline.message}
          </Text>
        )}
      </div>

      {/* Summary Section */}
      <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <Text className="mb-2 font-medium text-blue-900">Task Summary</Text>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <Text className="text-sm font-medium text-gray-600">Title:</Text>
            <Text className="text-sm">{watchedValues.title}</Text>
          </div>
          <div>
            <Text className="text-sm font-medium text-gray-600">Priority:</Text>
            <Badge
              className={cn(
                watchedValues.priority === 'urgent' && 'bg-red-50 text-red-600',
                watchedValues.priority === 'high' &&
                  'bg-orange-50 text-orange-600',
                watchedValues.priority === 'normal' &&
                  'bg-blue-50 text-blue-600',
                watchedValues.priority === 'low' && 'bg-green-50 text-green-600'
              )}
            >
              {capitalizeFirst(watchedValues.priority || '')}
            </Badge>
          </div>
          <div>
            <Text className="text-sm font-medium text-gray-600">Deadline:</Text>
            <Text className="text-sm">
              {watchedValues.deadline
                ? formatDate(watchedValues.deadline)
                : 'Not set'}
            </Text>
          </div>
          <div>
            <Text className="text-sm font-medium text-gray-600">
              Assigned to:
            </Text>
            <Text className="text-sm">
              {selectedStudentIds.length} students
            </Text>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex items-center"
        >
          <PiArrowLeft className="mr-1.5 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-3">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="bg-mainBlue text-white hover:bg-mainBlue/90"
            disabled={isSubmitting}
          >
            <PiCheckCircleBold className="me-1.5 h-4 w-4" />
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to format date
function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}