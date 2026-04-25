'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import AnalysisStatusBadge from '@/app/shared/financial/AnalysisStatusBadge';
import EmptyState from '@/app/shared/financial/EmptyState';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';

import { getAnalyses, getApiErrorMessage } from '@/server/api';
import type { AiAnalysis } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

function fmtDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState<AiAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setAnalyses(await getAnalyses());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title="AI tahlillar"
        description="Barcha AI analiz natijalari."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'AI tahlillar' },
        ]}
      />

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <LoadingState rows={5} />
      ) : analyses.length === 0 ? (
        <EmptyState
          title="Tahlil topilmadi"
          description="Hali hech qanday AI tahlil bajarilmagan."
          actionLabel="Fayl yuklash"
          actionHref={routes.financialReporting.upload}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Fayl ID</th>
                <th className="hidden px-4 py-3 sm:table-cell">Model</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 md:table-cell">Yaratilgan</th>
                <th className="hidden px-4 py-3 lg:table-cell">Tugallangan</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analyses.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {a.uploadId.slice(0, 8)}…
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {a.modelName ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <AnalysisStatusBadge status={a.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                    {fmtDate(a.createdAt)}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 lg:table-cell">
                    {fmtDate(a.completedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={routes.financialReporting.analysisDetails(a.id)}
                      className="text-xs font-medium text-[#112855] hover:underline"
                    >
                      Ko&apos;rish →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
