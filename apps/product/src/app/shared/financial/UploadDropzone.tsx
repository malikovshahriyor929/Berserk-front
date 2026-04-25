'use client';

import { useCallback, useRef, useState } from 'react';
import { PiUploadSimple, PiFileCsv, PiMicrosoftExcelLogo, PiX } from 'react-icons/pi';

const ACCEPTED = ['.xlsx', '.xls', '.csv'];
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadDropzoneProps {
  onFile: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  disabled?: boolean;
}

export default function UploadDropzone({
  onFile,
  selectedFile,
  onClear,
  disabled,
}: UploadDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        setError('Faqat .xlsx, .xls yoki .csv formatdagi fayllar qabul qilinadi.');
        return;
      }
      if (file.size > MAX_BYTES) {
        setError('Fayl hajmi 25 MB dan oshmasligi kerak.');
        return;
      }
      onFile(file);
    },
    [onFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSet(file);
      e.target.value = '';
    },
    [validateAndSet]
  );

  if (selectedFile) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <PiMicrosoftExcelLogo className="text-3xl text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
            <p className="text-xs text-gray-400">{formatBytes(selectedFile.size)}</p>
          </div>
        </div>
        {!disabled && (
          <button
            onClick={onClear}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <PiX className="text-lg" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
          dragOver
            ? 'border-[#112855] bg-[#112855]/5'
            : 'border-gray-200 bg-gray-50 hover:border-[#112855]/50 hover:bg-[#112855]/5'
        } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <PiUploadSimple className="mb-3 text-4xl text-[#112855]" />
        <p className="mb-1 text-sm font-medium text-gray-700">
          Faylni bu yerga tashlang yoki tanlash uchun bosing
        </p>
        <p className="text-xs text-gray-400">
          .xlsx, .xls, .csv — maksimum 25 MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
