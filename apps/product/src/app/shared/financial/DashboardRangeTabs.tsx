'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { DashboardRange } from './types';

const RANGES: { label: string; value: DashboardRange }[] = [
  { label: '1 kun', value: '1d' },
  { label: '1 hafta', value: '1w' },
  { label: '1 oy', value: '1m' },
  { label: '1 yil', value: '1y' },
  { label: '10 yil', value: '10y' },
];

interface DashboardRangeTabsProps {
  value: DashboardRange;
  onChange: (range: DashboardRange) => void;
}

export default function DashboardRangeTabs({
  value,
  onChange,
}: DashboardRangeTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            value === r.value
              ? 'bg-[#112855] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
