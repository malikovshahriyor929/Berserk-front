'use client';

import { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Text, Title, Badge, ActionIcon, Tooltip } from 'rizzui';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import {
  PiFileXlsBold,
  PiFileCsvBold,
  PiUploadSimpleBold,
  PiTrashBold,
  PiWarningCircleBold,
  PiCheckCircleBold,
  PiXCircleBold,
  PiDownloadSimpleBold,
  PiCaretRightBold,
  PiCaretLeftBold,
} from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { routes } from '@/config/routes';

// Types
interface TestScoreRecord {
  id: string;
  studentId: string;
  studentName: string;
  testName: string;
  score: string;
  date: string;
  errors?: string[];
  isDuplicate?: boolean;
}

// Constants
const ALLOWED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

// Sample data for template
const sampleData = [
  {
    'Student ID': '1001',
    'Student Name': 'John Doe',
    'Test Name': 'IELTS',
    Score: '7.5',
    Date: '2023-06-15',
  },
  {
    'Student ID': '1002',
    'Student Name': 'Jane Smith',
    'Test Name': 'TOEFL',
    Score: '102',
    Date: '2023-06-20',
  },
  {
    'Student ID': '1003',
    'Student Name': 'Ahmed Ali',
    'Test Name': 'CEFR',
    Score: 'C1',
    Date: '2023-06-22',
  },
];

// Stepper component
function ImportStepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { title: 'Upload File', description: 'Upload CSV or Excel file' },
    { title: 'Preview Data', description: 'Verify and validate imported data' },
    { title: 'Confirmation', description: 'Complete the import process' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            <div className="flex items-center">
              {index > 0 && (
                <div
                  className={cn(
                    'h-1 w-full',
                    index <= currentStep ? 'bg-blue-900' : 'bg-gray-200'
                  )}
                />
              )}
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-white',
                  index < currentStep
                    ? 'bg-green-600'
                    : index === currentStep
                      ? 'bg-blue-900'
                      : 'bg-gray-300'
                )}
                style={{ aspectRatio: '1/1' }}
              >
                {index < currentStep ? (
                  <PiCheckCircleBold className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-1 w-full',
                    index < currentStep ? 'bg-blue-900' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
            <div className="mt-2 text-center">
              <p
                className={cn(
                  'text-sm font-medium',
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 1: File Upload Component
function FileUploadStep({
  onFileAccepted,
}: {
  onFileAccepted: (records: TestScoreRecord[]) => void;
}) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(
          'File type not supported. Please upload CSV or Excel file.'
        );
        return;
      }

      if (file.size > FILE_SIZE_LIMIT) {
        setFileError('File size exceeds limit (5MB)');
        return;
      }

      setFileError(null);
      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Process and validate the data
          const records: TestScoreRecord[] = jsonData.map(
            (row: any, index) => ({
              id: `record-${index}`,
              studentId: row['Student ID'] || '',
              studentName: row['Student Name'] || '',
              testName: row['Test Name'] || '',
              score: row['Score']?.toString() || '',
              date: row['Date'] || '',
              errors: [],
            })
          );

          // Basic validation
          const processedRecords = validateRecords(records);

          onFileAccepted(processedRecords);
        } catch (error) {
          console.error('Error parsing file:', error);
          setFileError('Failed to parse file. Please check the format.');
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    multiple: false,
  });

  // Generate sample template file
  const downloadSampleTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Scores');
    XLSX.writeFile(workbook, 'test-scores-template.xlsx');
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-blue-900 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          fileError && 'border-red-500 bg-red-50'
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-blue-50 p-3">
            {isLoading ? (
              <div className="h-10 w-10 animate-spin text-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-blue-800">
                <PiFileXlsBold className="h-8 w-8" />
                <PiFileCsvBold className="h-8 w-8" />
              </div>
            )}
          </div>

          <div>
            <p className="text-lg font-medium text-gray-700">
              {isDragActive
                ? 'Drop the file here'
                : 'Drag and drop your file here'}
            </p>
            <p className="mt-1 text-sm text-gray-500">or click to browse</p>
          </div>

          <div className="text-xs text-gray-500">
            <p>Supported formats: CSV, XLS, XLSX</p>
            <p>Maximum file size: 5MB</p>
          </div>

          {fileError && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <PiWarningCircleBold className="h-4 w-4" />
              {fileError}
            </div>
          )}

          <Button
            size="sm"
            variant="solid"
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-800"
          >
            <PiUploadSimpleBold className="h-4 w-4" />
            Select File
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="text-center">
          <p className="mb-2 text-sm text-gray-500">
            Download our sample template to ensure your data is formatted
            correctly
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={downloadSampleTemplate}
            className="mx-auto flex items-center gap-2"
          >
            <PiDownloadSimpleBold className="h-4 w-4" />
            Download Sample Template
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 2: Data Preview Component
function DataPreviewStep({
  records,
  onRecordsChange,
}: {
  records: TestScoreRecord[];
  onRecordsChange: (records: TestScoreRecord[]) => void;
}) {
  const [filteredRecords, setFilteredRecords] =
    useState<TestScoreRecord[]>(records);
  const [filter, setFilter] = useState<'all' | 'valid' | 'invalid'>('all');

  const validRecords = records.filter(
    (record) => !record.errors?.length && !record.isDuplicate
  );
  const invalidRecords = records.filter(
    (record) => record.errors?.length || record.isDuplicate
  );

  const handleFilterChange = (newFilter: 'all' | 'valid' | 'invalid') => {
    setFilter(newFilter);

    switch (newFilter) {
      case 'valid':
        setFilteredRecords(validRecords);
        break;
      case 'invalid':
        setFilteredRecords(invalidRecords);
        break;
      default:
        setFilteredRecords(records);
        break;
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    onRecordsChange(updatedRecords);

    // Update filtered view
    switch (filter) {
      case 'valid':
        setFilteredRecords(
          updatedRecords.filter(
            (record) => !record.errors?.length && !record.isDuplicate
          )
        );
        break;
      case 'invalid':
        setFilteredRecords(
          updatedRecords.filter(
            (record) => record.errors?.length || record.isDuplicate
          )
        );
        break;
      default:
        setFilteredRecords(updatedRecords);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Title as="h3" className="text-lg font-semibold">
            Data Preview
          </Title>
          <Text className="text-sm text-gray-500">
            Review your data before importing. Fix or remove any invalid
            entries.
          </Text>
        </div>

        <div className="flex items-center space-x-2">
          <Badge color="success" className="text-xs">
            {validRecords.length} Valid
          </Badge>
          {invalidRecords.length > 0 && (
            <Badge color="danger" className="text-xs">
              {invalidRecords.length} Invalid
            </Badge>
          )}
        </div>
      </div>

      <div className="mb-4 flex space-x-2">
        <Button
          size="sm"
          variant={filter === 'all' ? 'solid' : 'outline'}
          onClick={() => handleFilterChange('all')}
        >
          All ({records.length})
        </Button>
        <Button
          size="sm"
          variant={filter === 'valid' ? 'solid' : 'outline'}
          onClick={() => handleFilterChange('valid')}
          className="text-green-600"
        >
          Valid ({validRecords.length})
        </Button>
        <Button
          size="sm"
          variant={filter === 'invalid' ? 'solid' : 'outline'}
          onClick={() => handleFilterChange('invalid')}
          className="text-red-600"
          disabled={invalidRecords.length === 0}
        >
          Invalid ({invalidRecords.length})
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Student ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Student Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Test Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className={cn(
                    record.errors?.length || record.isDuplicate
                      ? 'bg-red-50'
                      : ''
                  )}
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.studentId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.studentName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.testName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.score}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {record.errors?.length || record.isDuplicate ? (
                      <Tooltip
                        content={
                          <div className="text-xs">
                            {record.isDuplicate && <div>Duplicate entry</div>}
                            {record.errors?.map((error, idx) => (
                              <div key={idx}>{error}</div>
                            ))}
                          </div>
                        }
                        placement="top"
                      >
                        <Badge color="danger" className="cursor-help text-xs">
                          <div className="flex items-center gap-1">
                            <PiWarningCircleBold className="h-3 w-3" />
                            Invalid
                          </div>
                        </Badge>
                      </Tooltip>
                    ) : (
                      <Badge color="success" className="text-xs">
                        <div className="flex items-center gap-1">
                          <PiCheckCircleBold className="h-3 w-3" />
                          Valid
                        </div>
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <PiTrashBold className="h-4 w-4" />
                    </ActionIcon>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {invalidRecords.length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500">
              <PiWarningCircleBold className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Some records have validation issues
              </p>
              <p className="mt-1 text-sm text-yellow-700">
                Please fix or remove invalid records before proceeding. You can
                still import valid records.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Step 3: Confirmation Component
function ConfirmationStep({
  records,
  onConfirm,
}: {
  records: TestScoreRecord[];
  onConfirm: () => void;
}) {
  const validRecords = records.filter(
    (record) => !record.errors?.length && !record.isDuplicate
  );

  const handleConfirm = () => {
    // Here you would typically send the data to your API
    console.log('Importing records:', validRecords);
    onConfirm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <PiCheckCircleBold className="h-8 w-8 text-green-600" />
        </div>
        <Title as="h3" className="mt-4 text-xl font-semibold">
          Ready to Import
        </Title>
        <Text className="mt-2 text-gray-500">
          You are about to import {validRecords.length} valid test score
          records.
        </Text>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Valid Records:</span>
            <span className="font-medium text-gray-900">
              {validRecords.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tests:</span>
            <span className="font-medium text-gray-900">
              {new Set(validRecords.map((r) => r.testName)).size} unique tests
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Students:</span>
            <span className="font-medium text-gray-900">
              {new Set(validRecords.map((r) => r.studentId)).size} unique
              students
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date Range:</span>
              <span className="font-medium text-gray-900">
                {getDateRange(validRecords)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleConfirm} className="px-8 bg-blue-800">
          Confirm and Import
        </Button>
      </div>
    </motion.div>
  );
}

// Success Component
function ImportSuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 py-10 text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <PiCheckCircleBold className="h-10 w-10 text-green-600" />
      </div>

      <div>
        <Title as="h3" className="text-2xl font-semibold text-gray-900">
          Import Successful!
        </Title>
        <Text className="mt-2 text-gray-500">
          The test scores have been imported successfully.
        </Text>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="px-6"
          onClick={() => window.location.reload()}
        >
          Import More Data
        </Button>

        <Button
          className="px-6 bg-blue-800"
          onClick={() =>
            (window.location.href = routes.myStudents.myAssignedStudents)
          }
        >
          View All Test Scores
        </Button>
      </div>
    </motion.div>
  );
}

export default function TestScoreImport() {
  const [step, setStep] = useState(0);
  const [records, setRecords] = useState<TestScoreRecord[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFileAccepted = (records: TestScoreRecord[]) => {
    setRecords(records);
    setStep(1); // Move to preview step
  };

  const handleRecordsChange = (updatedRecords: TestScoreRecord[]) => {
    setRecords(updatedRecords);
  };

  const handleImportConfirm = () => {
    // In a real application, you would make an API call here
    setTimeout(() => {
      setIsCompleted(true);
      setStep(3);
    }, 1000);
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  // Check if we can proceed to next step
  const canProceedToConfirmation = () => {
    const validRecords = records.filter(
      (record) => !record.errors?.length && !record.isDuplicate
    );
    return validRecords.length > 0;
  };

  return (
    <div className="w-full">
      {!isCompleted && <ImportStepper currentStep={step} />}

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {step === 0 && <FileUploadStep onFileAccepted={handleFileAccepted} />}

        {step === 1 && (
          <DataPreviewStep
            records={records}
            onRecordsChange={handleRecordsChange}
          />
        )}

        {step === 2 && (
          <ConfirmationStep records={records} onConfirm={handleImportConfirm} />
        )}

        {step === 3 && isCompleted && <ImportSuccessStep />}

        {/* Navigation buttons */}
        {!isCompleted && step > 0 && step < 2 && (
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2"
            >
              <PiCaretLeftBold className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={step === 1 && !canProceedToConfirmation()}
              className="flex items-center gap-2 bg-blue-800"
            >
              Next
              <PiCaretRightBold className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function validateRecords(records: TestScoreRecord[]): TestScoreRecord[] {
  // Check for required fields
  records = records.map((record) => {
    const errors: string[] = [];

    if (!record.studentId) errors.push('Student ID is required');
    if (!record.testName) errors.push('Test name is required');
    if (!record.score) errors.push('Score is required');
    if (!record.date) errors.push('Date is required');

    // Check date format
    if (record.date && !isValidDate(record.date)) {
      errors.push('Invalid date format (use YYYY-MM-DD)');
    }

    return {
      ...record,
      errors: errors.length ? errors : [],
    };
  });

  // Check for duplicates
  const uniqueKeys = new Set<string>();
  records = records.map((record) => {
    const key = `${record.studentId}-${record.testName}-${record.date}`;

    if (uniqueKeys.has(key)) {
      return {
        ...record,
        isDuplicate: true,
        errors: [...(record.errors || []), 'Duplicate record'],
      };
    } else {
      uniqueKeys.add(key);
      return record;
    }
  });

  return records;
}

function isValidDate(dateString: string): boolean {
  // Check if matches YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  // Check if it's a valid date
  const date = new Date(dateString);
  return date.toString() !== 'Invalid Date';
}

function getDateRange(records: TestScoreRecord[]): string {
  if (!records.length) return 'N/A';

  const validDates = records
    .map((r) => r.date)
    .filter((date) => isValidDate(date))
    .map((date) => new Date(date));

  if (!validDates.length) return 'N/A';

  const minDate = new Date(Math.min(...validDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...validDates.map((d) => d.getTime())));

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (minDate.getTime() === maxDate.getTime()) {
    return formatDate(minDate);
  }

  return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
}
