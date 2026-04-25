'use client';

import { PiChartBar } from 'react-icons/pi';
import DetailCard from './DetailCard';
import type { DetailMetric } from './analysis-detail-utils';

function metricToneClassName(tone: DetailMetric['tone']) {
  switch (tone) {
    case 'success':
      return 'text-[#16A34A]';
    case 'danger':
      return 'text-[#DC2626]';
    case 'info':
      return 'text-[#112855]';
    case 'warning':
      return 'text-[#D97706]';
    case 'neutral':
    default:
      return 'text-[#0F172A]';
  }
}

export default function MetricsCardGrid({ metrics }: { metrics: DetailMetric[] }) {
  return (
    <DetailCard title="Asosiy ko‘rsatkichlar" icon={<PiChartBar className="text-lg" />}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              {metric.label}
            </div>
            <div className={`mt-3 text-[28px] font-bold tracking-[-0.03em] ${metricToneClassName(metric.tone)}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
