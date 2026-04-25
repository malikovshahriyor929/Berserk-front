import { Controller, UseFormReturn } from 'react-hook-form';
import { Button, Input, Text, ActionIcon, Title } from 'rizzui';
import { PiCheckCircleBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { EditTaskFormInput } from '@/validators/edit-task-form.schema';

interface ChecklistInputProps {
  checklistFields: any[];
  addItem: () => void;
  removeItem: (index: number) => void;
  control: UseFormReturn<EditTaskFormInput>['control'];
}

export default function ChecklistInput({
  checklistFields,
  addItem,
  removeItem,
  control,
}: ChecklistInputProps) {
  return (
    <div className="rounded-lg border border-mainBlue/50 dark:border-gray-300 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-dashed pb-3">
        <Title as="h4" className="flex items-center gap-2 text-mainBlue dark:text-gray-700">
          <span className="rounded-md bg-blue-50 p-2 text-mainBlue dark:text-blue-600">
            <PiCheckCircleBold className="h-5 w-5" />
          </span>
          Checklist Items
        </Title>
        <Button
          type="button"
          variant="outline"
          onClick={addItem}
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
                onClick={() => removeItem(index)}
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
          onClick={addItem}
          className="w-full"
        >
          <PiPlusBold className="me-1.5 h-4 w-4" />
          Add Checklist Item
        </Button>
      )}
    </div>
  );
}
