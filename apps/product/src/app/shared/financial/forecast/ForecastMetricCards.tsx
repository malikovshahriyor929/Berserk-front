'use client';

import { ForecastRun } from '@/app/shared/financial/types';
import { PiArrowUpRight, PiArrowDownRight, PiTrendUp, PiTrendDown } from 'react-icons/pi';

function numFmt(v: number) {
  return new Intl.NumberFormat('uz-UZ').format(v);
}

export default function ForecastMetricCards({ forecast }: { forecast: ForecastRun }) {
  const metrics = forecast.resultJson?.metrics;
  if (!metrics) return null;

  const items = [
    {
      label: 'Bashorat qilingan daromad',
      value: metrics.predictedIncomeTotal,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Bashorat qilingan xarajat',
      value: metrics.predictedExpenseTotal,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Kutilayotgan sof foyda',
      value: metrics.predictedNetTotal,
      color: 'text-[#112855]',
      bg: 'bg-[#112855]/5',
    },
    {
      label: 'O‘sish sur’ati',
      value: `${(metrics.growthRate * 100).toFixed(1)}%`,
      color: metrics.growthRate >= 0 ? 'text-green-600' : 'text-red-600',
      bg: metrics.growthRate >= 0 ? 'bg-green-50' : 'bg-red-50',
      isPercent: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-xl font-bold ${item.color}`}>
              {item.isPercent ? item.value : numFmt(item.value as number)}
            </span>
            {!item.isPercent && <span className="text-xs text-gray-400">sum</span>}
          </div>
          <div className={`mt-3 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold uppercase ${item.bg} ${item.color}`}>
            {item.label.includes('daromad') || metrics.growthRate >= 0 ? <PiTrendUp /> : <PiTrendDown />}
            {item.isPercent ? 'Trend' : 'Kutilmoqda'}
          </div>
        </div>
      ))}
    </div>
  );
}
