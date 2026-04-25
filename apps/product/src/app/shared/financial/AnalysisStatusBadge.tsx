'use client';

import type { AiAnalysisStatus } from './types';

const STATUS_CONFIG: Record<AiAnalysisStatus, { label: string; className: string }> = {
  PENDING: { label: 'Kutilmoqda',      className: 'bg-gray-100 text-gray-600' },
  RUNNING: { label: 'Bajarilmoqda',   className: 'bg-blue-100 text-blue-700' },
  SUCCESS: { label: 'Muvaffaqiyatli', className: 'bg-green-100 text-green-700' },
  FAILED:  { label: 'Xatolik',        className: 'bg-red-100 text-red-600' },
};

export default function AnalysisStatusBadge({ status }: { status: AiAnalysisStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
