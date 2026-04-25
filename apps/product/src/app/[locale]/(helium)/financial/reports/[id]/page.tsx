'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { PiArrowLeft, PiDownloadSimple } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';

import { getReport, downloadReport, getApiErrorMessage } from '@/server/api';
import type { GeneratedReport } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

function fmtDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setReport(await getReport(id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleDownload = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      await downloadReport(report.id, report.fileName);
      toast.success('Yuklab olindi');
    } catch {
      toast.error('Yuklab olishda xatolik');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <LoadingState rows={6} />;
  if (error || !report)
    return <ErrorState message={error ?? 'Hisobot topilmadi'} onRetry={load} />;

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title={report.title}
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { href: routes.financialReporting.reports, name: 'PDF hisobotlar' },
          { name: report.title },
        ]}
      >
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors disabled:opacity-60"
          >
            <PiDownloadSimple />
            {downloading ? 'Yuklanmoqda...' : 'PDF yuklab olish'}
          </button>
          <Link
            href={routes.financialReporting.reports}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <PiArrowLeft />
            Orqaga
          </Link>
        </div>
      </FinancialPageHeader>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-gray-700">Hisobot ma&apos;lumotlari</p>
        <div className="grid grid-cols-2 gap-5 text-sm sm:grid-cols-3">
          {[
            { label: 'Sarlavha', value: report.title },
            { label: 'Fayl nomi', value: report.fileName },
            { label: 'Format', value: report.mimeType },
            { label: 'Hajm', value: fmtBytes(report.sizeBytes) },
            { label: 'Davr', value: report.range ?? '—' },
            { label: 'Yaratilgan', value: fmtDate(report.generatedAt) },
            ...(report.uploadId
              ? [{ label: 'Fayl ID', value: report.uploadId.slice(0, 12) + '…' }]
              : []),
            ...(report.analysisId
              ? [{ label: 'Tahlil ID', value: report.analysisId.slice(0, 12) + '…' }]
              : []),
            ...(report.templateId
              ? [{ label: 'Shablon ID', value: report.templateId.slice(0, 12) + '…' }]
              : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="mt-0.5 font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        {report.uploadId && (
          <Link
            href={routes.financialReporting.fileDetails(report.uploadId)}
            className="text-sm text-[#112855] hover:underline"
          >
            Fayl tafsilotiga o&apos;tish →
          </Link>
        )}
        {report.analysisId && (
          <Link
            href={routes.financialReporting.analysisDetails(report.analysisId)}
            className="text-sm text-[#112855] hover:underline"
          >
            AI tahlil natijasiga o&apos;tish →
          </Link>
        )}
      </div>
    </div>
  );
}
