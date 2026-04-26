'use client';

import { ForecastRun } from '@/app/shared/financial/types';
import { PiCheckCircle, PiWarning, PiWarningCircle, PiLightbulb } from 'react-icons/pi';

export default function ForecastIssuesSection({ forecast }: { forecast: ForecastRun }) {
  const recommendations = forecast.resultJson?.recommendations || [];
  const warnings = forecast.resultJson?.warnings || [];
  const errors = forecast.resultJson?.errors || [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Recommendations */}
      <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6 space-y-4">
        <div className="flex items-center gap-2 text-green-700">
          <PiLightbulb className="h-5 w-5" />
          <h3 className="font-semibold">Tavsiyalar</h3>
        </div>
        <div className="space-y-3">
          {recommendations.length === 0 ? (
            <p className="text-sm text-green-600/70 italic">Tavsiyalar mavjud emas.</p>
          ) : (
            recommendations.map((r: any, i: number) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm border border-green-100">
                <p className="text-sm font-semibold text-green-800">{r.title}</p>
                <p className="mt-1 text-xs text-green-700/80">{r.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Warnings */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-700">
          <PiWarning className="h-5 w-5" />
          <h3 className="font-semibold">Ogohlantirishlar</h3>
        </div>
        <div className="space-y-3">
          {warnings.length === 0 ? (
            <p className="text-sm text-amber-600/70 italic">Ogohlantirishlar yo‘q.</p>
          ) : (
            warnings.map((w: any, i: number) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm border border-amber-100">
                <p className="text-sm font-semibold text-amber-800">{w.title}</p>
                <p className="mt-1 text-xs text-amber-700/80">{w.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Errors / Critical */}
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 space-y-4">
        <div className="flex items-center gap-2 text-red-700">
          <PiWarningCircle className="h-5 w-5" />
          <h3 className="font-semibold">Tanqidiy muammolar</h3>
        </div>
        <div className="space-y-3">
          {errors.length === 0 && forecast.status !== 'INSUFFICIENT_DATA' ? (
            <p className="text-sm text-red-600/70 italic">Kritik xatolar aniqlanmadi.</p>
          ) : (
            <>
              {forecast.status === 'INSUFFICIENT_DATA' && (
                <div className="rounded-xl bg-white p-3 shadow-sm border border-red-200">
                  <p className="text-sm font-semibold text-red-800">Ma’lumot yetarli emas</p>
                  <p className="mt-1 text-xs text-red-700/80">{forecast.errorMessage}</p>
                </div>
              )}
              {errors.map((e: any, i: number) => (
                <div key={i} className="rounded-xl bg-white p-3 shadow-sm border border-red-100">
                  <p className="text-sm font-semibold text-red-800">{e.title}</p>
                  <p className="mt-1 text-xs text-red-700/80">{e.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
