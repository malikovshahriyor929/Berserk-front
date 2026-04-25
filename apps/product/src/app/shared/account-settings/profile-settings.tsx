'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SubmitHandler, Controller, useForm, useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  PiEnvelopeSimple,
  PiSealCheckFill,
  PiPhone,
  PiBuildings,
  PiCalendar,
  PiTrash,
  PiPlusCircle,
  PiGraduationCap,
  PiLightbulb,
} from 'react-icons/pi';
import { Form } from '@core/ui/form';
import {
  Button,
  Title,
  Text,
  Input,
  Checkbox,
  Select,
  Textarea,
  Badge,
} from 'rizzui';
import cn from '@core/utils/class-names';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from '@/validators/advisor-profile-settings.schema';
import FormGroup from '@/app/shared/form-group';
import {Link} from '@/i18n/routing';
import FormFooter from '@core/components/form-footer';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { useLayout } from '@/layouts/use-layout';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

// Department options
const departmentOptions = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Sociology', label: 'Sociology' },
  { value: 'Languages', label: 'Languages' },
  { value: 'History', label: 'History' },
  { value: 'Art & Design', label: 'Art & Design' },
];

// Position options
const positionOptions = [
  { value: 'Professor', label: 'Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'Senior Lecturer', label: 'Senior Lecturer' },
  { value: 'Research Fellow', label: 'Research Fellow' },
  { value: 'Department Chair', label: 'Department Chair' },
];

// Common research interests for suggestion
const commonResearchInterests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Computer Vision',
  'Natural Language Processing',
  'Cybersecurity',
  'Network Systems',
  'Distributed Computing',
  'Human-Computer Interaction',
  'Software Engineering',
  'Educational Technology',
  'Bioinformatics',
  'Robotics',
  'Internet of Things',
  'Quantum Computing',
];

interface EducationField {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface ResearchField {
  id: string;
  value: string;
}

export default function ProfileSettingsView() {
  const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
    toast.success(<Text as="b">Profile successfully updated!</Text>);
    console.log('Profile settings data ->', data);
  };

  return (
    <Form<ProfileFormTypes>
      validationSchema={profileFormSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{ mode: 'onChange', defaultValues }}
    >
      {(methods) => <ProfileSettingsForm {...methods} />}
    </Form>
  );
}

function ProfileSettingsForm({
  register,
  control,
  getValues,
  setValue,
  formState: { errors },
}: UseFormReturn<ProfileFormTypes>) {
  const [newInterest, setNewInterest] = useState('');

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: 'education' });

  const {
    fields: researchFields,
    append: appendResearch,
    remove: removeResearch,
  } = useFieldArray({ control, name: 'researchInterests' });

  

return (
  <>
    <ProfileHeader
      title={getValues('name') || 'Dr. Maryam Barrows'}
      description="Update your profile information and preferences."
    >
      <div className="w-full sm:w-auto md:ms-auto">
        <Link href={routes.profile}>
          <Button as="span" className="bg-mainBlue dark:bg-blue-600">
            View Profile
          </Button>
        </Link>
      </div>
    </ProfileHeader>
    <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
      {/* Basic Information Section */}
      <div className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Title as="h3" className="mb-6 font-semibold">
          Basic Information
        </Title>

        <FormGroup title="Full Name" className="mb-10 @3xl:grid-cols-12">
          <Input
            className="col-span-full"
            placeholder="Enter your full name with title"
            {...register('name')}
            error={errors.name?.message}
          />
        </FormGroup>

        <FormGroup title="Username" className="mb-10 @3xl:grid-cols-12">
          <Input
            className="col-span-full"
            prefix="faculty.newuu.uz/"
            placeholder="Username"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            {...register('username')}
            error={errors.username?.message}
          />
        </FormGroup>

        <FormGroup
          title="Profile Photo"
          description="This will be displayed on your profile."
          className="mb-10 @3xl:grid-cols-12"
        >
          <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
            <AvatarUpload
              name="avatar"
              setValue={setValue}
              getValues={getValues}
              error={errors?.avatar?.message as string}
            />
          </div>
        </FormGroup>

        <FormGroup title="Website" className="mb-10 @3xl:grid-cols-12">
          <Input
            type="url"
            className="col-span-full"
            prefix="https://"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="Enter your website url"
            {...register('website')}
            error={errors.website?.message}
          />
        </FormGroup>
      </div>

      {/* Contact Information Section */}
      <div className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Title as="h3" className="mb-6 font-semibold">
          Contact Information
        </Title>

        <FormGroup title="Email" className="mb-10 @3xl:grid-cols-12">
          <Input
            prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
            type="email"
            className="col-span-full"
            placeholder="your.email@newuu.uz"
            {...register('email')}
            error={errors.email?.message}
          />
        </FormGroup>

        <FormGroup title="Phone" className="mb-10 @3xl:grid-cols-12">
          <Input
            prefix={<PiPhone className="h-6 w-6 text-gray-500" />}
            className="col-span-full"
            placeholder="+998 (XX) XXX-XX-XX"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </FormGroup>

        <FormGroup title="Office Location" className="mb-10 @3xl:grid-cols-12">
          <Input
            prefix={<PiBuildings className="h-6 w-6 text-gray-500" />}
            className="col-span-full"
            placeholder="Building and room number"
            {...register('office')}
            error={errors.office?.message}
          />
        </FormGroup>

        <FormGroup
          title="Office Hours"
          className="mb-10 @3xl:grid-cols-12"
          description="Enter your regular office hours (e.g., Mon, Wed: 13:00-15:00)"
        >
          <Input
            prefix={<PiCalendar className="h-6 w-6 text-gray-500" />}
            className="col-span-full"
            placeholder="Day: Time-Time, Day: Time-Time"
            {...register('officeHours')}
            error={errors.officeHours?.message}
          />
        </FormGroup>
      </div>

      {/* Professional Information Section */}
      <div className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Title as="h3" className="mb-6 font-semibold">
          Professional Information
        </Title>

        <FormGroup title="Department" className="mb-10 @3xl:grid-cols-12">
          <Controller
            control={control}
            name="department"
            render={({ field: { value, onChange } }) => (
              <Select
                dropdownClassName="!z-10 h-auto"
                inPortal={false}
                placeholder="Select Department"
                options={departmentOptions}
                onChange={onChange}
                value={value}
                getOptionValue={(option) => option.value}
                displayValue={(selected) =>
                  departmentOptions?.find((d) => d.value === selected)?.label ??
                  ''
                }
                error={errors?.department?.message as string}
              />
            )}
          />
        </FormGroup>

        <FormGroup title="Position" className="mb-10 @3xl:grid-cols-12">
          <Controller
            control={control}
            name="position"
            render={({ field: { value, onChange } }) => (
              <Select
                dropdownClassName="!z-10 h-auto"
                inPortal={false}
                placeholder="Select Position"
                options={positionOptions}
                onChange={onChange}
                value={value}
                getOptionValue={(option) => option.value}
                displayValue={(selected) =>
                  positionOptions?.find((p) => p.value === selected)?.label ??
                  ''
                }
                error={errors?.position?.message as string}
              />
            )}
          />
        </FormGroup>

        <FormGroup title="Specialization" className="mb-10 @3xl:grid-cols-12">
          <Input
            className="col-span-full"
            placeholder="Your area of specialization"
            {...register('specialization')}
            error={errors.specialization?.message}
          />
        </FormGroup>

        <FormGroup title="Faculty Since" className="mb-10 @3xl:grid-cols-12">
          <Input
            prefix={<PiCalendar className="h-6 w-6 text-gray-500" />}
            className="col-span-full"
            placeholder="Month Year (e.g., Sept 2015)"
            {...register('joinDate')}
            error={errors.joinDate?.message}
          />
        </FormGroup>
      </div>

      {/* Biography Section */}
      <FormGroup
        title="Professional Bio"
        className="mb-10 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        description="Write a professional biography highlighting your expertise and experience."
      >
        <div className="@3xl:col-span-2">
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value } }) => (
              <QuillEditor
                value={value}
                onChange={onChange}
                className="[&>.ql-container_.ql-editor]:min-h-[150px]"
              />
            )}
          />
        </div>
      </FormGroup>

      {/* Education Section */}
      <div className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Title as="h3" className="mb-6 flex items-center font-semibold">
          <PiGraduationCap className="mr-2 h-5 w-5 text-gray-500" />
          Education Background
        </Title>

        {educationFields.map((field: EducationField, index: number) => (
          <div
            key={field.id}
            className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <div className="mb-3 flex items-center justify-between">
              <Title as="h4" className="text-base font-medium">
                Degree #{index + 1}
              </Title>
              <Button
                type="button"
                variant="text"
                color="danger"
                onClick={() => removeEducation(index)}
                className="h-auto p-0"
              >
                <PiTrash className="h-4 w-4" />
                <span className="ms-1 font-medium">Remove</span>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <Input
                  label="Degree"
                  placeholder="e.g., Ph.D in Computer Science"
                  {...register(`education.${index}.degree`)}
                />
              </div>
              <div className="md:col-span-5">
                <Input
                  label="Institution"
                  placeholder="e.g., Massachusetts Institute of Technology"
                  {...register(`education.${index}.institution`)}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Year"
                  placeholder="e.g., 2012"
                  {...register(`education.${index}.year`)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendEducation({
              degree: '',
              institution: '',
              year: '',
            })
          }
          className="w-full"
        >
          <PiPlusCircle className="mr-1 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Research Interests Section */}
      <div className="pt-7 @2xl:pt-9 @3xl:pt-11">
        <Title as="h3" className="mb-6 flex items-center font-semibold">
          <PiLightbulb className="mr-2 h-5 w-5 text-gray-500" />
          Research Interests
        </Title>

        <div className="mb-4 flex flex-wrap gap-2">
          {researchFields.map((field: ResearchField, index: number) => (
            <Badge
              key={field.id}
              variant="flat"
              className="flex items-center gap-1 text-sm"
              color={
                ['primary', 'secondary', 'info', 'success', 'warning'][
                  index % 5
                ] as any
              }
            >
              <Controller
                control={control}
                name={`researchInterests.${index}.value`}
                render={({ field }) => <span>{field.value}</span>}
              />
              <button
                type="button"
                onClick={() => removeResearch(index)}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200/50"
              >
                <PiTrash className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="Add a research interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            disabled={!newInterest.trim()}
            onClick={() => {
              if (newInterest.trim()) {
                appendResearch({ value: newInterest.trim() });
                setNewInterest('');
              }
            }}
          >
            Add
          </Button>
        </div>

        <div className="mt-4">
          <Text className="mb-2 text-sm font-medium text-gray-600">
            Suggestions:
          </Text>
          <div className="flex flex-wrap gap-2">
            {commonResearchInterests
              .filter(
                (interest) =>
                  !getValues('researchInterests')?.some(
                    (item) => item.value === interest
                  )
              )
              .slice(0, 8)
              .map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    appendResearch({ value: interest });
                  }}
                >
                  <PiPlusCircle className="mr-1 h-3 w-3" />
                  {interest}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      {/* Publications and Documents */}
      <FormGroup
        title="Academic Documents"
        description="Upload your CV, publications, or other important documents"
        className="mb-10 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
      >
        <div className="@3xl:col-span-2">
          <UploadZone
            name="portfolios"
            getValues={getValues}
            setValue={setValue}
            error={errors?.portfolios?.message as string}
          />
        </div>
      </FormGroup>
    </div>

    <FormFooter
      // isLoading={isLoading}
      altBtnText="Cancel"
      submitBtnText="Save Changes"
    />
  </>
);

}

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  const { layout } = useLayout();

  return (
    <div
      className={cn(
        'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-indigo-100 before:to-blue-100 @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-indigo-900/30 dark:before:to-blue-900/30 md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10'
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          <Image
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp"
            alt="profile-pic"
            fill
            sizes="(max-width: 768px) 100vw"
            className="aspect-auto"
          />
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? (
            <Text className="text-sm text-gray-500">{description}</Text>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
