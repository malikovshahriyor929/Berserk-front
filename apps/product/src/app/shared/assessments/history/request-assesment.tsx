'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Select, Textarea, Title } from 'rizzui';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import toast from 'react-hot-toast';
import { DatePicker } from '@core/ui/datepicker';
import cn from '@core/utils/class-names';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const categoryOptions = [
    { label: 'IELTS', value: 'ielts' },
    { label: 'SAT', value: 'sat' },
    { label: 'Olympiads', value: 'olympiads' },
    { label: 'Volunteering', value: 'volunteering' },
    { label: 'Projects', value: 'projects' },
    { label: 'Other', value: 'other' },
];

const assessmentSchema = z.object({
    student: z.string().optional(),
    category: z.string(),
    score: z.number().min(0).max(100),
    date: z.date(),
    reason: z.string().min(5),
    notes: z.string().optional(),
});

type AssessmentInput = z.infer<typeof assessmentSchema>;

export default function AssessmentHistoryForm() {
    const { closeModal } = useModal();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const onSubmit: SubmitHandler<AssessmentInput> = (data) => {
        console.log('Assessment Entry:', data, uploadedFiles);
        toast.success(<b>Assessment Entry Added</b>);
        closeModal();
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    return (
        <div className="m-auto p-4 md:px-7 md:py-10">
            <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-lg">Add Assessment Entry</Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal} className="p-0 text-gray-500 hover:!text-gray-900">
                    <PiXBold className="h-[18px] w-[18px]" />
                </ActionIcon>
            </div>

            <Form<AssessmentInput>
                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: {
                        category: '',
                        score: 0,
                        date: new Date(),
                        reason: '',
                        notes: '',
                    },
                }}
                className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
            >
                {({ register, control, setValue, formState: { errors } }) => (
                    <>
                        <Input
                            label="Student ID (optional)"
                            placeholder="e.g. N001"
                            {...register('student')}
                            className="col-span-full"
                        />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Assessment Category"
                                    placeholder="Select category"
                                    options={categoryOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.category?.message}
                                    className="col-span-full"
                                />
                            )}
                        />

                        <Input
                            label="Score"
                            type="number"
                            placeholder="e.g. 92"
                            {...register('score', { valueAsNumber: true })}
                            error={errors.score?.message}
                        />

                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    dateFormat="MMMM d, yyyy"
                                    placeholderText="Select assessment date"
                                    className="date-picker-event-calendar"
                                />
                            )}
                        />

                        <Textarea
                            label="Reason / Context"
                            placeholder="Explain why this assessment was made"
                            {...register('reason')}
                            error={errors.reason?.message}
                            className="col-span-full"
                            textareaClassName="h-24"
                        />

                        <Textarea
                            label="Reviewer Notes (optional)"
                            placeholder="Extra comments for internal review"
                            {...register('notes')}
                            className="col-span-full"
                            textareaClassName="h-20"
                        />

                        <div className="col-span-full">
                            <label className="mb-1 block text-sm font-medium">Upload File(s)</label>
                            <div
                                {...getRootProps()}
                                className="border border-dashed border-gray-300 p-4 rounded-md bg-gray-50 text-sm text-gray-500 text-center cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to select'}
                            </div>
                            {uploadedFiles.length > 0 && (
                                <ul className="mt-2 text-xs text-gray-600 list-disc list-inside">
                                    {uploadedFiles.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                            <Button variant="outline" className="w-full @xl:w-auto" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full @xl:w-auto">
                                Save Entry
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}