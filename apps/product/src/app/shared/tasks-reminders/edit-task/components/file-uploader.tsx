import { ActionIcon, Title, Text } from 'rizzui';
import { PiTrashBold, PiUploadSimpleBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { Attachment } from '@/validators/edit-task-form.schema';

interface FileUploaderProps {
  attachmentFields: Attachment[];
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileUpload: (files: File[]) => void;
  removeAttachment: (index: number) => void;
}

export default function FileUploader({
  attachmentFields,
  dragOver,
  setDragOver,
  handleFileDrop,
  handleFileUpload,
  removeAttachment,
}: FileUploaderProps) {
  return (
    <div className="rounded-lg border border-mainBlue/50 dark:border-gray-300 p-5 shadow-sm">
      <Title
        as="h4"
        className="mb-5 flex text-mainBlue dark:text-gray-700 items-center gap-2 border-b border-dashed pb-3"
      >
        <span className="rounded-md bg-blue-50 p-2 text-mainBlue  dark:text-blue-600">
          <PiUploadSimpleBold className="h-5 w-5" />
        </span>
        Attachments
      </Title>

      <div
        className={cn(
          'relative mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors',
          dragOver && 'border-blue-500 bg-blue-50'
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
      >
        <PiUploadSimpleBold className="mb-2 h-8 w-8 text-gray-400" />
        <p className="mb-1 text-sm text-gray-600">
          <span className="font-medium text-blue-700">Click to upload</span> or
          drag and drop
        </p>
        <p className="text-xs text-gray-500">
          PDF, DOCX, XLSX, JPG, PNG (Max 10MB each)
        </p>

        <input
          type="file"
          multiple
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileUpload(Array.from(e.target.files));
              e.target.value = ''; // Reset input
            }
          }}
        />
      </div>

      {attachmentFields.length > 0 && (
        <div className="space-y-2">
          {attachmentFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                  {getFileIcon(field.type)}
                </div>
                <div>
                  <p className="text-sm font-medium">{field.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(field.size)}
                  </p>
                </div>
              </div>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => removeAttachment(index)}
              >
                <PiTrashBold className="h-4 w-4 text-red-500" />
              </ActionIcon>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to get file icon based on type
function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) {
    return <span className="text-xs text-red-600">PDF</span>;
  } else if (fileType.includes('word') || fileType.includes('doc')) {
    return <span className="text-xs text-blue-600">DOC</span>;
  } else if (
    fileType.includes('sheet') ||
    fileType.includes('excel') ||
    fileType.includes('xls')
  ) {
    return <span className="text-xs text-green-600">XLS</span>;
  } else if (fileType.includes('image/')) {
    return <span className="text-xs text-purple-600">IMG</span>;
  }
  return <span className="text-xs text-gray-600">FILE</span>;
}

// Helper function to format file sizes
export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
