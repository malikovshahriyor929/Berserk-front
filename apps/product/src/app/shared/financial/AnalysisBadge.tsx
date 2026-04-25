'use client';

import type { AiAnalysisStatus } from './types';
import type { DetailSeverity } from './analysis-detail-utils';

interface AnalysisBadgeProps {
  status?: AiAnalysisStatus;
  severity?: DetailSeverity;
  label?: string;
  tone?: 'status' | 'severity' | 'category';
  categoryType?: string;
}

function badgeClasses(
  props: Pick<AnalysisBadgeProps, 'status' | 'severity' | 'label' | 'tone' | 'categoryType'>
) {
  if (props.tone === 'category') {
    const type = props.categoryType?.toLowerCase();
    if (type === 'income') return 'border-[#BBF7D0] bg-[#ECFDF5] text-[#16A34A]';
    if (type === 'expense') return 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]';
    return 'border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B]';
  }

  if (props.tone === 'severity') {
    if (props.severity === 'high' || props.severity === 'critical') {
      return 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]';
    }

    if (props.severity === 'low') {
      return 'border-[#BBF7D0] bg-[#ECFDF5] text-[#16A34A]';
    }

    return 'border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]';
  }

  switch (props.status) {
    case 'SUCCESS':
      return 'border-[#BBF7D0] bg-[#ECFDF5] text-[#16A34A]';
    case 'RUNNING':
      return 'border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]';
    case 'FAILED':
      return 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]';
    case 'PENDING':
    default:
      return 'border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]';
  }
}

function statusLabel(status?: AiAnalysisStatus) {
  switch (status) {
    case 'SUCCESS':
      return 'Muvaffaqiyatli';
    case 'RUNNING':
      return 'Jarayonda';
    case 'FAILED':
      return 'Xatolik';
    case 'PENDING':
    default:
      return 'Kutilmoqda';
  }
}

export default function AnalysisBadge(props: AnalysisBadgeProps) {
  const text =
    props.label ??
    (props.tone === 'severity'
      ? props.severity?.toUpperCase() ?? 'MEDIUM'
      : props.tone === 'category'
        ? props.categoryType ?? 'unknown'
        : statusLabel(props.status));

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClasses(
        props
      )}`}
    >
      {text}
    </span>
  );
}
