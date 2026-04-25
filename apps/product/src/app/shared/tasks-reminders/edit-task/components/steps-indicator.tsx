import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import { Step, StepsCompleted } from '@/validators/edit-task-form.schema';

interface StepsIndicatorProps {
  steps: Step[];
  currentStep: number;
  stepsCompleted: StepsCompleted;
}

export default function StepsIndicator({
  steps,
  currentStep,
  stepsCompleted,
}: StepsIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              'relative flex flex-1 flex-col items-center',
              step.id !== (steps.length + 1) &&
              'after:absolute after:right-0 after:top-5 after:h-2 after:w-full after:bg-gray-200 after:content-[""]',
              step.id === 1 && 'after:rounded-l-lg',
              step.id === steps.length && 'after:rounded-r-lg',
              step.id < currentStep && 'after:bg-mainBlue'
            )}
          >
            <div
              className={cn(
                'z-10 mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2',
                currentStep === step.id
                  ? 'border-mainBlue bg-mainBlue text-white'
                  : step.id < currentStep ||
                      stepsCompleted[
                        `step${step.id}` as keyof typeof stepsCompleted
                      ]
                    ? 'border-mainBlue bg-mainBlue text-white'
                    : 'border-gray-300 bg-white text-gray-500'
              )}
            >
              {step.icon}
            </div>
            <div className="text-center">
              <Text className="font-medium">{step.title}</Text>
              <Text className="text-xs text-gray-500">{step.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
