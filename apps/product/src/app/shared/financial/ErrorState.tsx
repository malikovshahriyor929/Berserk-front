'use client';

import { PiWarningDiamond } from 'react-icons/pi';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <PiWarningDiamond className="mb-4 text-5xl text-red-400" />
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-[#112855] px-5 py-2 text-sm font-medium text-[#112855] hover:bg-[#112855] hover:text-white transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}
