'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  PiUploadSimple,
  PiFiles,
  PiSparkle,
  PiChartBar,
  PiArrowClockwise,
} from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import FinancialStatCard from '@/app/shared/financial/FinancialStatCard';
import DashboardRangeTabs from '@/app/shared/financial/DashboardRangeTabs';
import DashboardCharts from '@/app/shared/financial/DashboardCharts';
import EmptyState from '@/app/shared/financial/EmptyState';
import ErrorState from '@/app/shared/financial/ErrorState';
import { LoadingCards, LoadingChart } from '@/app/shared/financial/LoadingState';
import UploadStatusBadge from '@/app/shared/financial/UploadStatusBadge';
import AnalysisStatusBadge from '@/app/shared/financial/AnalysisStatusBadge';

import {
  getDashboardSummary,
  getDashboardCharts,
  getApiErrorMessage,
} from '@/server/api';
import type { DashboardRange, DashboardSummary, DashboardCharts as DashboardChartsType } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

const VALID_RANGES: DashboardRange[] = ['1d', '1w', '1m', '1y', '10y'];

export default function FinancialDashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawRange = searchParams.get('range') as DashboardRange | null;
  const range: DashboardRange = VALID_RANGES.includes(rawRange as DashboardRange)
    ? (rawRange as DashboardRange)
    : '1m';

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [charts, setCharts] = useState<DashboardChartsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, c] = await Promise.all([
        getDashboardSummary(range),
        getDashboardCharts(range),
      ]);
      setSummary(s);
      setCharts(c);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRangeChange = (r: DashboardRange) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', r);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title="Moliyaviy dashboard"
        description="Excel fayllar, AI tahlillar va PDF hisobotlar bo'yicha umumiy ko'rsatkichlar."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'Dashboard' },
        ]}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <PiArrowClockwise className={loading ? 'animate-spin' : ''} />
            Yangilash
          </button>
          <Link
            href={routes.financialReporting.upload}
            className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
          >
            <PiUploadSimple />
            Fayl yuklash
          </Link>
        </div>
      </FinancialPageHeader>

      <DashboardRangeTabs value={range} onChange={handleRangeChange} />

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <>
          <LoadingCards count={4} />
          <LoadingChart />
          <LoadingChart />
        </>
      ) : summary ? (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FinancialStatCard
              title="Jami yuklamalar"
              value={summary.totalUploads}
              icon={<PiUploadSimple />}
            />
            <FinancialStatCard
              title="Jami hisobotlar"
              value={summary.totalReports}
              icon={<PiFiles />}
            />
            <FinancialStatCard
              title="Jami atributlar"
              value={summary.totalAttributes}
              icon={<PiChartBar />}
            />
            <FinancialStatCard
              title="Jami AI tahlillar"
              value={summary.totalAnalyses}
              icon={<PiSparkle />}
            />
          </div>

          {/* Financial totals */}
          {summary.totals && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FinancialStatCard
                title="Kirim"
                value={summary.totals.income?.toLocaleString('uz-UZ') ?? '—'}
                colorClass="text-green-700"
              />
              <FinancialStatCard
                title="Chiqim"
                value={summary.totals.expense?.toLocaleString('uz-UZ') ?? '—'}
                colorClass="text-red-600"
              />
              <FinancialStatCard
                title="Sof"
                value={summary.totals.net?.toLocaleString('uz-UZ') ?? '—'}
                colorClass="text-[#112855]"
              />
            </div>
          )}

          {/* Charts */}
          {charts ? (
            <DashboardCharts data={charts} />
          ) : (
            <LoadingChart />
          )}

          {/* Latest activity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {summary.latestUpload && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  So&apos;nggi yuklama
                </p>
                <p className="mb-1 truncate text-sm font-medium text-gray-800">
                  {summary.latestUpload.originalName}
                </p>
                <div className="flex items-center justify-between">
                  <UploadStatusBadge status={summary.latestUpload.status} />
                  <Link
                    href={routes.financialReporting.fileDetails(summary.latestUpload.id)}
                    className="text-xs text-[#112855] hover:underline"
                  >
                    Ko&apos;rish →
                  </Link>
                </div>
              </div>
            )}

            {summary.latestAnalysis && (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  So&apos;nggi AI tahlil
                </p>
                <p className="mb-1 text-sm font-medium text-gray-800">
                  {summary.latestAnalysis.modelName ?? 'AI Model'}
                </p>
                <div className="flex items-center justify-between">
                  <AnalysisStatusBadge status={summary.latestAnalysis.status} />
                  <Link
                    href={routes.financialReporting.analysisDetails(summary.latestAnalysis.id)}
                    className="text-xs text-[#112855] hover:underline"
                  >
                    Ko&apos;rish →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Anomalies */}
          {summary.anomalies && summary.anomalies.length > 0 && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <p className="mb-3 text-sm font-semibold text-red-700">
                Anomaliyalar ({summary.anomalies.length})
              </p>
              <ul className="space-y-1.5">
                {summary.anomalies.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {a.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Empty state */}
          {summary.totalUploads === 0 && (
            <EmptyState
              title="Hali fayl yuklanmagan"
              description="Moliyaviy ma'lumotlarni tahlil qilish uchun Excel fayl yuklang."
              actionLabel="Excel fayl yuklash"
              actionHref={routes.financialReporting.upload}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
