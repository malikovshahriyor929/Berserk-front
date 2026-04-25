'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Select,
  Button,
  Avatar,
  Title,
  Text,
  Badge,
  Switch,
  Textarea,
  FieldError,
  NumberInput,
  RadioGroup,
  Radio,
  FileInput,
  SelectOption,
} from 'rizzui';
import cn from '@core/utils/class-names';
import { routes } from '@/config/routes';
import { toast } from 'react-hot-toast';
import {
  PiUser,
  PiBooks,
  PiChartBar,
  PiCertificate,
  PiCalendar,
  PiBuildings,
  PiPhone,
  PiEnvelope,
  PiGlobe,
  PiMapPin,
  PiPlusCircle,
  PiTrash,
  PiUploadSimple,
  PiStudent,
  PiIdentificationCard,
} from 'react-icons/pi';
import {
  createStudentSchema,
  type CreateStudentInput,
} from '@/validators/create-student.schema';

// Card component since rizzui doesn't have one
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={cn(
      'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Section title component for form sections
interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
  <div className="mb-6 flex items-center border-b border-dashed border-gray-200 pb-3">
    <span className="mr-2 rounded-md bg-[#043764]/10 p-2 text-[#043764]">
      {icon}
    </span>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
  </div>
);

// Faculty options
const facultyOptions: SelectOption[] = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Arts', label: 'Arts' },
];

// Year options
const yearOptions: SelectOption[] = [
  { value: '1st Year', label: '1st Year' },
  { value: '2nd Year', label: '2nd Year' },
  { value: '3rd Year', label: '3rd Year' },
  { value: '4th Year', label: '4th Year' },
];

// Advisor options
const advisorOptions: SelectOption[] = [
  { value: 'Maryam Barrows', label: 'Maryam Barrows' },
  { value: 'Mason Davis', label: 'Mason Davis' },
  { value: 'Jayda Schiller', label: 'Jayda Schiller' },
  { value: 'Retha Lehner', label: 'Retha Lehner' },
];

// CEFR level options
const cefrOptions: SelectOption[] = [
  { value: 'A1', label: 'A1' },
  { value: 'A2', label: 'A2' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'C1', label: 'C1' },
  { value: 'C2', label: 'C2' },
];

// Readiness score options
const readinessOptions: SelectOption[] = [
  { value: '1', label: '1 - Not Ready' },
  { value: '2', label: '2 - Somewhat Ready' },
  { value: '3', label: '3 - Moderately Ready' },
  { value: '4', label: '4 - Ready' },
  { value: '5', label: '5 - Fully Ready' },
];

// Status options
const statusOptions: SelectOption[] = [
  { value: 'On-Track', label: 'On-Track' },
  { value: 'Review Needed', label: 'Review Needed' },
  { value: 'New Student', label: 'New Student' },
  { value: 'At-Risk', label: 'At-Risk' },
];

// Test name options
const testNameOptions: SelectOption[] = [
  { value: 'IELTS', label: 'IELTS' },
  { value: 'TOEFL', label: 'TOEFL' },
  { value: 'CEFR Assessment', label: 'CEFR Assessment' },
  { value: 'Other', label: 'Other' },
];

export default function AddStudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      testScores: [
        {
          name: 'IELTS',
          date: '',
          score: '',
          breakdown: { Reading: '', Listening: '', Writing: '', Speaking: '' },
        },
      ],
      courses: [{ code: '', name: '', credits: '', grade: '' }],
      certificates: [{ name: '', date: '', expiry: '' }],
    },
  });

  // Field arrays for dynamic fields
  const {
    fields: testScoreFields,
    append: appendTestScore,
    remove: removeTestScore,
  } = useFieldArray({ control, name: 'testScores' });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({ control, name: 'courses' });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({ control, name: 'certificates' });

  // Handle form submission
  const onSubmit = (data: CreateStudentInput) => {
    setLoading(true);
    console.log('Form data:', data);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Student added successfully!');
      router.push(routes.myStudents.myAssignedStudents);
    }, 1000);
  };

  // Handle photo upload
  const handlePhotoUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Watch form values for preview
  const watchedValues = {
    fullName: watch('fullName') || 'New Student',
    faculty: watch('faculty') || 'Computer Science',
    yearOfStudy: watch('yearOfStudy') || '1st Year',
  };

  return (
    <form className="@container" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 @2xl:grid-cols-2 @5xl:grid-cols-12">
        <div className="@5xl:col-span-8">
          {/* Basic Personal Information */}
          <Card className="mb-6">
            <SectionTitle
              icon={<PiUser className="h-5 w-5" />}
              title="Personal Information"
            />
            <div className="mb-10 grid gap-4 @md:grid-cols-2">
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                />
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter email address"
                      prefix={<PiEnvelope className="h-4 w-4" />}
                      error={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Phone"
                      placeholder="Enter phone number"
                      prefix={<PiPhone className="h-4 w-4" />}
                      error={errors.phone?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Date of Birth"
                      type="date"
                      prefix={<PiCalendar className="h-4 w-4" />}
                      error={errors.dateOfBirth?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Nationality"
                      placeholder="Enter nationality"
                      prefix={<PiGlobe className="h-4 w-4" />}
                      error={errors.nationality?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="@md:col-span-2">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Address"
                      placeholder="Enter full address"
                      // prefix={<PiMapPin className="h-4 w-4" />}
                      error={errors.address?.message}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <Avatar
                  size="lg"
                  src={photoPreview ?? undefined}
                  name="Student"
                  className="border-2 border-gray-100"
                />
                <Controller
                  name="profilePhoto"
                  control={control}
                  render={({ field }) => (
                    <FileInput
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0] || null);
                        handlePhotoUpload(e.target.files);
                      }}
                      accept="image/*"
                      className="w-full max-w-xs"
                    />
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card className="mb-6">
            <SectionTitle
              icon={<PiBuildings className="h-5 w-5" />}
              title="Academic Information"
            />
            <div className="grid gap-4 @md:grid-cols-2">
              <div>
                <Controller
                  name="faculty"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Faculty"
                      options={facultyOptions}
                      placeholder="Select faculty"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.faculty?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="yearOfStudy"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Year of Study"
                      options={yearOptions}
                      placeholder="Select year"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.yearOfStudy?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="enrollmentDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Enrollment Date"
                      type="date"
                      prefix={<PiCalendar className="h-4 w-4" />}
                      error={errors.enrollmentDate?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="graduationDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Expected Graduation Date"
                      type="date"
                      prefix={<PiCalendar className="h-4 w-4" />}
                      error={errors.graduationDate?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="advisor"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Academic Advisor"
                      options={advisorOptions}
                      placeholder="Select advisor"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.advisor?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Input
                  label="GPA"
                  placeholder="Enter GPA"
                  {...register('gpa')}
                  error={errors.gpa?.message}
                />
              </div>
              <div>
                <Controller
                  name="cefr"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="CEFR Level"
                      options={cefrOptions}
                      placeholder="Select CEFR level"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.cefr?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="readinessScore"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Readiness Score"
                      options={readinessOptions}
                      placeholder="Select readiness score"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.readinessScore?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Status"
                      options={statusOptions}
                      placeholder="Select status"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.status?.message}
                    />
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Test Scores */}
          <Card className="mb-6">
            <SectionTitle
              icon={<PiChartBar className="h-5 w-5" />}
              title="Test Scores"
            />

            {testScoreFields.map((field, index) => (
              <div
                key={field.id}
                className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Title as="h4" className="text-base font-medium">
                    Test #{index + 1}
                  </Title>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="text"
                      color="danger"
                      onClick={() => removeTestScore(index)}
                      className="h-auto p-0"
                    >
                      <PiTrash className="h-4 w-4" />
                      <span className="ms-1 font-medium">Remove</span>
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 @md:grid-cols-3">
                  <div>
                    <Controller
                      name={`testScores.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Test Name"
                          options={testNameOptions}
                          placeholder="Select test"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.testScores?.[index]?.name?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`testScores.${index}.date`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Test Date"
                          type="date"
                          error={errors.testScores?.[index]?.date?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Input
                      label="Overall Score"
                      placeholder="Enter score"
                      {...register(`testScores.${index}.score`)}
                      error={errors.testScores?.[index]?.score?.message}
                    />
                  </div>
                </div>

                <Title as="h5" className="mb-2 mt-4 text-sm font-medium">
                  Score Breakdown
                </Title>
                <div className="grid gap-4 @md:grid-cols-4">
                  <div>
                    <Input
                      label="Reading"
                      placeholder="Reading score"
                      size="sm"
                      {...register(`testScores.${index}.breakdown.Reading`)}
                      error={
                        errors.testScores?.[index]?.breakdown?.Reading?.message
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Listening"
                      placeholder="Listening score"
                      size="sm"
                      {...register(`testScores.${index}.breakdown.Listening`)}
                      error={
                        errors.testScores?.[index]?.breakdown?.Listening
                          ?.message
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Writing"
                      placeholder="Writing score"
                      size="sm"
                      {...register(`testScores.${index}.breakdown.Writing`)}
                      error={
                        errors.testScores?.[index]?.breakdown?.Writing?.message
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Speaking"
                      placeholder="Speaking score"
                      size="sm"
                      {...register(`testScores.${index}.breakdown.Speaking`)}
                      error={
                        errors.testScores?.[index]?.breakdown?.Speaking?.message
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendTestScore({
                  name: '',
                  date: '',
                  score: '',
                  breakdown: {
                    Reading: '',
                    Listening: '',
                    Writing: '',
                    Speaking: '',
                  },
                })
              }
              className="mt-2 w-full"
            >
              <PiPlusCircle className="mr-1 h-4 w-4" />
              Add Another Test Score
            </Button>
          </Card>

          {/* Courses */}
          <Card className="mb-6">
            <SectionTitle
              icon={<PiBooks className="h-5 w-5" />}
              title="Courses"
            />

            {courseFields.map((field, index) => {
              const watchedGrade = watch(`courses.${index}.grade`);

              return (
                <div
                  key={field.id}
                  className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Title as="h4" className="text-base font-medium">
                      Course #{index + 1}
                    </Title>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="text"
                        color="danger"
                        onClick={() => removeCourse(index)}
                        className="h-auto p-0"
                      >
                        <PiTrash className="h-4 w-4" />
                        <span className="ms-1 font-medium">Remove</span>
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 @md:grid-cols-4">
                    <div>
                      <Input
                        label="Course Code"
                        placeholder="e.g. CS301"
                        {...register(`courses.${index}.code`)}
                        error={errors.courses?.[index]?.code?.message}
                      />
                    </div>
                    <div className="@md:col-span-2">
                      <Input
                        label="Course Name"
                        placeholder="e.g. Data Structures"
                        {...register(`courses.${index}.name`)}
                        error={errors.courses?.[index]?.name?.message}
                      />
                    </div>
                    <div>
                      <Input
                        label="Credits"
                        type="number"
                        min={1}
                        max={6}
                        placeholder="Credits"
                        {...register(`courses.${index}.credits`)}
                        error={errors.courses?.[index]?.credits?.message}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium">
                      Grade (if completed)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        'A',
                        'A-',
                        'B+',
                        'B',
                        'B-',
                        'C+',
                        'C',
                        'C-',
                        'D',
                        'F',
                        'Incomplete',
                      ].map((grade) => (
                        <Controller
                          key={grade}
                          name={`courses.${index}.grade`}
                          control={control}
                          render={({ field }) => (
                            <Badge
                              className="cursor-pointer"
                              variant={
                                watchedGrade === grade ? 'solid' : 'outline'
                              }
                              color={
                                grade.startsWith('A')
                                  ? 'success'
                                  : grade.startsWith('B')
                                    ? 'info'
                                    : grade.startsWith('C')
                                      ? 'warning'
                                      : grade === 'Incomplete'
                                        ? 'secondary'
                                        : 'danger'
                              }
                              onClick={() => field.onChange(grade)}
                            >
                              {grade}
                            </Badge>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendCourse({
                  code: '',
                  name: '',
                  credits: '',
                  grade: '',
                })
              }
              className="mt-2 w-full"
            >
              <PiPlusCircle className="mr-1 h-4 w-4" />
              Add Another Course
            </Button>
          </Card>

          {/* Certificates */}
          <Card className="mb-6">
            <SectionTitle
              icon={<PiCertificate className="h-5 w-5" />}
              title="Certificates"
            />

            {certificateFields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Title as="h4" className="text-base font-medium">
                    Certificate #{index + 1}
                  </Title>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="text"
                      color="danger"
                      onClick={() => removeCertificate(index)}
                      className="h-auto p-0"
                    >
                      <PiTrash className="h-4 w-4" />
                      <span className="ms-1 font-medium">Remove</span>
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 @md:grid-cols-3">
                  <div className="@md:col-span-3">
                    <Input
                      label="Certificate Name"
                      placeholder="Enter certificate name"
                      {...register(`certificates.${index}.name`)}
                      error={errors.certificates?.[index]?.name?.message}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`certificates.${index}.date`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Issue Date"
                          type="date"
                          prefix={<PiCalendar className="h-4 w-4" />}
                          error={errors.certificates?.[index]?.date?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`certificates.${index}.expiry`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Expiry Date"
                          type="date"
                          prefix={<PiCalendar className="h-4 w-4" />}
                          error={errors.certificates?.[index]?.expiry?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`certificates.${index}.file`}
                      control={control}
                      render={({ field }) => (
                        <FileInput
                          label="Upload Certificate"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendCertificate({
                  name: '',
                  date: '',
                  expiry: '',
                  file: null,
                })
              }
              className="mt-2 w-full"
            >
              <PiPlusCircle className="mr-1 h-4 w-4" />
              Add Another Certificate
            </Button>
          </Card>
        </div>

        {/* Right Column - Student ID Preview */}
        <div className="@5xl:col-span-4">
          <div className="sticky top-24">
            <Card className="overflow-hidden">
              <SectionTitle
                icon={<PiIdentificationCard className="h-5 w-5" />}
                title="Student ID Preview"
              />

              <div className="mb-4 flex items-center justify-between">
                <Text className="text-sm text-gray-500">
                  Preview how the student ID will appear
                </Text>
                <Switch
                  label="Show Preview"
                  checked={showPreview}
                  onChange={() => setShowPreview(!showPreview)}
                />
              </div>

              {showPreview && (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="bg-[#043764] px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">
                        Student ID Card
                      </h3>
                      <div className="text-sm font-medium">2023-2024</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6 flex items-center gap-4">
                      <Avatar
                        size="lg"
                        src={photoPreview ?? undefined}
                        name={watchedValues.fullName}
                      />
                      <div>
                        <Title as="h3" className="text-lg font-semibold">
                          {watchedValues.fullName}
                        </Title>
                        <Text className="text-gray-500">
                          Faculty of {watchedValues.faculty}
                        </Text>
                        <Badge variant="outline" size="sm" className="mt-1">
                          {watchedValues.yearOfStudy}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex w-full">
                        <Text className="min-w-32 text-gray-500">
                          Student ID:
                        </Text>
                        <Text className="flex-1 font-medium">
                          Auto-generated
                        </Text>
                      </div>
                      <div className="flex w-full">
                        <Text className="min-w-32 text-gray-500">Faculty:</Text>
                        <Text className="flex-1 font-medium">
                          {watchedValues.faculty}
                        </Text>
                      </div>
                      <div className="flex w-full">
                        <Text className="min-w-32 text-gray-500">
                          Valid Until:
                        </Text>
                        <Text className="flex-1 font-medium">
                          July 31, 2024
                        </Text>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-24 w-24 bg-gray-100 p-2">
                          {/* QR Code placeholder */}
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <path
                              d="M0,0 h100v100h-100z"
                              fill="none"
                              stroke="#000"
                              strokeWidth="2"
                            />
                            <rect
                              x="10"
                              y="10"
                              width="30"
                              height="30"
                              fill="#000"
                            />
                            <rect
                              x="60"
                              y="10"
                              width="30"
                              height="30"
                              fill="#000"
                            />
                            <rect
                              x="10"
                              y="60"
                              width="30"
                              height="30"
                              fill="#000"
                            />
                            <rect
                              x="60"
                              y="60"
                              width="10"
                              height="10"
                              fill="#000"
                            />
                            <rect
                              x="80"
                              y="60"
                              width="10"
                              height="10"
                              fill="#000"
                            />
                            <rect
                              x="60"
                              y="80"
                              width="10"
                              height="10"
                              fill="#000"
                            />
                            <rect
                              x="80"
                              y="80"
                              width="10"
                              height="10"
                              fill="#000"
                            />
                          </svg>
                        </div>
                        <Text className="mt-1 text-center text-xs text-gray-500">
                          Verify Student
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-dashed border-gray-200 pt-6">
                <Button
                  type="submit"
                  className="w-full bg-[#043764] text-white"
                  size="lg"
                  isLoading={loading}
                >
                  <PiStudent className="mr-1 h-5 w-5" />
                  Add Student
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
