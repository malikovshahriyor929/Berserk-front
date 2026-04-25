import { Button } from 'rizzui';
import { PiArrowLeft, PiSkipForwardBold, PiCaretRight } from 'react-icons/pi';
import { UseFormReturn } from 'react-hook-form';
import { EditTaskFormInput } from '@/validators/edit-task-form.schema';
import StudentSelector from '../student-selector';

interface StudentSelectionStepProps {
  form: UseFormReturn<EditTaskFormInput>;
  selectedStudentIds: string[];
  selectedClassIds: string[];
  showByClass: boolean;
  setShowByClass: (value: boolean) => void;
  handleToggleStudent: (studentId: string) => void;
  handleSelectAllStudents: () => void;
  handleToggleClass: (classId: string) => void;
  clearSelections: () => void;
  prevStep: () => void;
  nextStep: () => void;
  skipStep: () => void;
}


export default function StudentSelectionStep({
  form,
  selectedStudentIds,
  selectedClassIds,
  showByClass,
  setShowByClass,
  handleToggleStudent,
  handleSelectAllStudents,
  handleToggleClass,
  clearSelections,
  prevStep,
  nextStep,
  skipStep,
}: StudentSelectionStepProps) {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <StudentSelector
        selectedStudentIds={selectedStudentIds}
        selectedClassIds={selectedClassIds}
        showByClass={showByClass}
        setShowByClass={setShowByClass}
        handleToggleStudent={handleToggleStudent}
        handleSelectAllStudents={handleSelectAllStudents}
        handleToggleClass={handleToggleClass}
        clearSelections={clearSelections}
        errors={errors.selectedStudents}
      />

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
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
    </>
  );
}