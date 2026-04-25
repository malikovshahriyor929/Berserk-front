import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { EditTaskFormInput, editTaskSchema, StepsCompleted } from '@/validators/edit-task-form.schema';
import { Task, allTasksData } from '@/data/all-tasks-data';
import { studentsData, classesData } from '@/data/students-data';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

// Current system timestamp
const CURRENT_DATE = new Date('2025-07-15 06:38:53');
const CURRENT_USER = 'abduraufdev77';

export function useTaskForm(taskId: string) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [showByClass, setShowByClass] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [stepsCompleted, setStepsCompleted] = useState<StepsCompleted>({
    step1: false,
    step2: false,
    step3: false,
  });

  // Set up form with default values
  const form = useForm<EditTaskFormInput>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      priority: 'normal',
      taskType: 'reading',
      checklistItems: [],
      attachments: [],
      selectedStudents: [],
      selectedClasses: [],
    },
  });

  // Setup field arrays
  const {
    fields: checklistFields,
    append: appendChecklist,
    remove: removeChecklist,
  } = useFieldArray({
    control: form.control,
    name: 'checklistItems',
  });

  const {
    fields: attachmentFields,
    append: appendAttachment,
    remove: removeAttachment,
  } = useFieldArray({
    control: form.control,
    name: 'attachments',
  });

  // Watch form values
  const watchedValues = {
    title: form.watch('title'),
    description: form.watch('description'),
    tags: form.watch('tags'),
    attachments: form.watch('attachments'),
    checklistItems: form.watch('checklistItems'),
    priority: form.watch('priority'),
    deadline: form.watch('deadline'),
  };

  // Fetch task data on component mount
  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const task = allTasksData.find((t) => t.id === taskId);

        if (task) {
          setCurrentTask(task);

          // Populate form with task data
          form.setValue('title', task.title);
          form.setValue('description', task.description || '');
          form.setValue('tags', task.tags || []);
          setTags(task.tags || []);
          form.setValue('deadline', new Date(task.dueDate));
          form.setValue('priority', task.urgency.toLowerCase() as any);

          // Set student IDs
          const studentIds = task.assignedStudents.map((s) => s.id);
          setSelectedStudentIds(studentIds);
          form.setValue('selectedStudents', studentIds);

          // Find class IDs based on students (simplified approach)
          const classIds = classesData
            .filter((c) => c.students.some((s) => studentIds.includes(s.id)))
            .map((c) => c.id);

          setSelectedClassIds(classIds);
          form.setValue('selectedClasses', classIds);

          // Mark all steps as completed since we're editing an existing task
          setStepsCompleted({
            step1: true,
            step2: true,
            step3: true,
          });
        } else {
          toast.error('Task not found');
          router.push(routes.tasks.allTasks);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('Failed to load task data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId, form.setValue, router]);

  // Update form values when selected students/classes change
  useEffect(() => {
    form.setValue('selectedStudents', selectedStudentIds);
    form.setValue('selectedClasses', selectedClassIds);
  }, [selectedStudentIds, selectedClassIds, form.setValue]);

  // Update form tags when tags array changes
  useEffect(() => {
    form.setValue('tags', tags);
  }, [tags, form.setValue]);

  // Handle student selection toggling
  const handleToggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle select all students
  const handleSelectAllStudents = () => {
    if (selectedStudentIds.length === studentsData.length) {
      // Deselect all
      setSelectedStudentIds([]);
    } else {
      // Select all
      const allStudentIds = studentsData.map((s) => s.id);
      setSelectedStudentIds(allStudentIds);
    }
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

  // Add a new tag
  const handleAddTag = (newTag: string) => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
  };

  // Remove tag
  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
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

  // Navigation functions
  const nextStep = () => {
    // Mark current step as completed
    setStepsCompleted((prev) => ({
      ...prev,
      [`step${currentStep}`]: true,
    }));

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const skipStep = () => {
    nextStep();
  };

  // Form submission handler
  const onSubmit = (data: EditTaskFormInput) => {
    // Create updated task object
    const updatedTask = {
      ...currentTask,
      title: data.title,
      description: data.description || '',
      tags: data.tags || [],
      dueDate: data.deadline.toISOString(),
      urgency: capitalizeFirst(data.priority),
      assignedStudents: studentsData.filter((s) =>
        data.selectedStudents.includes(s.id)
      ),
      totalAssigned: data.selectedStudents.length,
      status: currentTask?.status || 0,
      submittedCount: currentTask?.submittedCount || 0,
    };

    console.log('Task updated:', updatedTask);
    console.log('Updated by:', CURRENT_USER);
    console.log('Updated at:', CURRENT_DATE.toISOString());

    toast.success(`Task "${data.title}" has been updated!`);

    // Navigate back to tasks page
    setTimeout(() => {
      router.push(routes.tasks.allTasks);
    }, 1000);
  };

  return {
    currentTask,
    currentStep,
    setCurrentStep,
    isLoading,
    selectedStudentIds,
    setSelectedStudentIds,
    selectedClassIds,
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
    appendAttachment,
    removeAttachment,
    nextStep,
    prevStep,
    skipStep,
    onSubmit,
    CURRENT_DATE,
    CURRENT_USER,
  };
}

// Helper function to capitalize first letter
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
