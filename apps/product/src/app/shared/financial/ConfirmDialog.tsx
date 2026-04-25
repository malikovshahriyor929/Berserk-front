'use client';

import { PiWarning } from 'react-icons/pi';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  danger?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title = 'Tasdiqlash',
  message,
  confirmLabel = 'Ha, davom etish',
  cancelLabel = 'Bekor qilish',
  onConfirm,
  onCancel,
  isLoading,
  danger = true,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <PiWarning
            className={`text-3xl ${danger ? 'text-red-500' : 'text-yellow-500'}`}
          />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
              danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#112855] hover:bg-[#0B1E40]'
            }`}
          >
            {isLoading ? 'Yuklanmoqda...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
