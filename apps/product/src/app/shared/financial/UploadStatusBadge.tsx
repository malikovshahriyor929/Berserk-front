'use client';

import type { UploadStatus } from './types';

const STATUS_CONFIG: Record<
  UploadStatus,
  { label: string; className: string }
> = {
  UPLOADED:      { label: 'Yuklandi',       className: 'bg-gray-100 text-gray-600' },
  PARSING:       { label: 'Tahlil qilinmoqda', className: 'bg-blue-100 text-blue-700' },
  PARSED:        { label: 'Tahlil qilindi', className: 'bg-sky-100 text-sky-700' },
  ANALYZING:     { label: 'AI tahlili',     className: 'bg-yellow-100 text-yellow-700' },
  ANALYZED:      { label: 'Tahlil tayyor',  className: 'bg-green-100 text-green-700' },
  PDF_GENERATED: { label: 'PDF tayyor',     className: 'bg-emerald-100 text-emerald-700' },
  FAILED:        { label: 'Xatolik',        className: 'bg-red-100 text-red-600' },
};

export default function UploadStatusBadge({ status }: { status: UploadStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
