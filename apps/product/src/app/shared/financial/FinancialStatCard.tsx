'use client';

import type { ReactNode } from 'react';

interface FinancialStatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  colorClass?: string;
}

export default function FinancialStatCard({
  title,
  value,
  icon,
  description,
  colorClass = 'text-[#112855]',
}: FinancialStatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-400">{description}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#112855]/10 text-xl text-[#112855]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
