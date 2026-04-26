'use client';

import { ForecastRun } from '@/app/shared/financial/types';
import { PiInfo } from 'react-icons/pi';

export default function ForecastSummaryCard({ forecast }: { forecast: ForecastRun }) {
  const summary = forecast.resultJson?.summary || forecast.resultText || 'Tahlil yakunlandi.';
  const methodology = forecast.resultJson?.methodology?.explanation;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-gray-900">
        <PiInfo className="h-5 w-5 text-[#112855]" />
        <h3 className="font-semibold">Prognoz xulosasi</h3>
      </div>
      <div className="text-sm leading-relaxed text-gray-600 space-y-3">
        {summary.split('\n').map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {methodology && (
        <div className="mt-4 pt-4 border-t border-gray-50">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Metodologiya</p>
          <p className="mt-1 text-xs text-gray-500">{methodology}</p>
        </div>
      )}
    </div>
  );
}
