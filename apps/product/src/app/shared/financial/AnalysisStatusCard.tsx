'use client';

import { PiCpu, PiCalendarBlank, PiChecks } from 'react-icons/pi';
import DetailCard from './DetailCard';
import AnalysisBadge from './AnalysisBadge';
import type { AiAnalysis } from './types';
import { formatDateTime } from './analysis-detail-utils';

const rowClassName =
  'flex items-center justify-between gap-4 border-t border-[#F1F5F9] py-3 text-sm first:border-t-0 first:pt-0 last:pb-0';

export default function AnalysisStatusCard({ analysis }: { analysis: AiAnalysis }) {
  return (
    <DetailCard title="Tahlil holati" icon={<PiChecks className="text-lg" />}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
            Status
          </div>
          <AnalysisBadge status={analysis.status} />
        </div>

        <div className={rowClassName}>
          <span className="flex items-center gap-2 text-[#64748B]">
            <PiCpu className="text-base text-[#94A3B8]" />
            Model
          </span>
          <span className="text-right font-medium text-[#0F172A]">
            {analysis.modelName ?? 'N/A'}
          </span>
        </div>
        <div className={rowClassName}>
          <span className="flex items-center gap-2 text-[#64748B]">
            <PiCalendarBlank className="text-base text-[#94A3B8]" />
            Yaratilgan
          </span>
          <span className="text-right font-medium text-[#0F172A]">
            {formatDateTime(analysis.createdAt)}
          </span>
        </div>
        <div className={rowClassName}>
          <span className="flex items-center gap-2 text-[#64748B]">
            <PiCalendarBlank className="text-base text-[#94A3B8]" />
            Tugallangan
          </span>
          <span className="text-right font-medium text-[#0F172A]">
            {formatDateTime(analysis.completedAt)}
          </span>
        </div>
      </div>
    </DetailCard>
  );
}
