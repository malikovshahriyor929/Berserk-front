'use client';

import { useParams } from 'next/navigation';
import {
  PiFileTextBold,
  PiUsersBold,
  PiCalendarBold,
  PiCircleNotch,
  PiListChecksBold,
} from 'react-icons/pi';
import { Text } from 'rizzui';
import { Step } from '@/validators/edit-task-form.schema';
import { useTaskForm } from './hooks/use-edit-task-form';
import StepsIndicator from './components/steps-indicator';
import TaskDetailsStep from './components/steps/task-details-step';
import StudentSelectionStep from './components/steps/student-selection-step';
import PriorityDeadlineStep from './components/steps/priority-deadline-step';

// Define the steps for the form
const steps: Step[] = [
  {
    id: 1,
    title: 'Task Details',
    icon: <PiFileTextBold className="h-5 w-5" />,
    description: 'Edit basic information',
  },
  {
    id: 2,
    title: 'Assign Students',
    icon: <PiUsersBold className="h-5 w-5" />,
    description: 'Select students',
  },
  {
    id: 3,
    title: 'Set Priority & Deadline',
    icon: <PiCalendarBold className="h-5 w-5" />,
    description: 'Finalize the task',
  },
];

export default function EditTaskForm() {
  const params = useParams();
  const taskId = params.id as string;

  const {
    currentStep,
    isLoading,
    selectedStudentIds,
    selectedClassIds,
    setSelectedStudentIds,
    setSelectedClassIds,
    showByClass,
    setShowByClass,
    dragOver,
    setDragOver,
    tags,
    stepsCompleted,
    form,
    checklistFields,
    attachmentFields,
    watchedValues,
    handleToggleStudent,
    handleSelectAllStudents,
    handleToggleClass,
    handleAddTag,
    handleRemoveTag,
    handleFileDrop,
    handleFileUpload,
    addChecklistItem,
    removeChecklist,
    removeAttachment,
    nextStep,
    prevStep,
    skipStep,
    onSubmit,
  } = useTaskForm(taskId);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <PiCircleNotch className="h-8 w-8 animate-spin text-blue-600" />
          <Text>Loading task data...</Text>
        </div>
      </div>
    );
  }

  // Clear all student selections
  const clearSelections = () => {
    setSelectedStudentIds([]);
    setSelectedClassIds([]);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Steps Progress Indicator */}
      <StepsIndicator
        steps={steps}
        currentStep={currentStep}
        stepsCompleted={stepsCompleted}
      />

      {/* Current Step Content */}
      {currentStep === 1 && (
        <TaskDetailsStep
          form={form}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          checklistFields={checklistFields}
          attachmentFields={attachmentFields}
          addChecklistItem={addChecklistItem}
          removeChecklist={removeChecklist}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleFileDrop={handleFileDrop}
          handleFileUpload={handleFileUpload}
          removeAttachment={removeAttachment}
          nextStep={nextStep}
          skipStep={skipStep}
        />
      )}

      {currentStep === 2 && (
        <StudentSelectionStep
          form={form}
          selectedStudentIds={selectedStudentIds}
          selectedClassIds={selectedClassIds}
          showByClass={showByClass}
          setShowByClass={setShowByClass}
          handleToggleStudent={handleToggleStudent}
          handleSelectAllStudents={handleSelectAllStudents}
          handleToggleClass={handleToggleClass}
          clearSelections={clearSelections}
          prevStep={prevStep}
          nextStep={nextStep}
          skipStep={skipStep}
        />
      )}

      {currentStep === 3 && (
        <PriorityDeadlineStep
          form={form}
          watchedValues={watchedValues}
          selectedStudentIds={selectedStudentIds}
          prevStep={prevStep}
        />
      )}
    </form>
  );
}