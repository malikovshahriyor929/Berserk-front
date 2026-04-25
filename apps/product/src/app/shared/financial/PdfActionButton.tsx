'use client';

import { PiDownloadSimple, PiFilePdf, PiSpinnerGap } from 'react-icons/pi';

interface PdfActionButtonProps {
  hasReport: boolean;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function PdfActionButton({
  hasReport,
  loading,
  disabled,
  onClick,
}: PdfActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#112855] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0B1E40] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <PiSpinnerGap className="animate-spin text-base" />
      ) : hasReport ? (
        <PiDownloadSimple className="text-base" />
      ) : (
        <PiFilePdf className="text-base" />
      )}
      {loading ? 'Jarayonda...' : hasReport ? 'PDF yuklab olish' : 'PDF yuklab olish'}
    </button>
  );
}
