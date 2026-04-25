'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  PiArrowLeft,
  PiChartBar,
  PiChecks,
  PiFilePdf,
  PiFiles,
  PiSparkle,
  PiTable,
} from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import UploadStatusBadge from '@/app/shared/financial/UploadStatusBadge';
import AnalysisStatusBadge from '@/app/shared/financial/AnalysisStatusBadge';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingSkeleton from '@/app/shared/financial/LoadingSkeleton';
import DetailCard from '@/app/shared/financial/DetailCard';
import AnalysisSummaryCard from '@/app/shared/financial/AnalysisSummaryCard';
import AttributesSummaryTable from '@/app/shared/financial/AttributesSummaryTable';
import { parseAnalysisDetail } from '@/app/shared/financial/analysis-detail-utils';

import {
  getFinancialFile,
  runAnalysis,
  getApiErrorMessage,
} from '@/server/api';
import type { FinancialUploadedFile } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

function fmtDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function fmtBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

function readScalar(value: unknown): string {
  if (value == null) return '—';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return `${value.length} ta element`;
  }

  if (typeof value === 'object') {
    return `${Object.keys(value as Record<string, unknown>).length} ta maydon`;
  }

  return '—';
}

export default function FileDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<FinancialUploadedFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFinancialFile(id);
      setFile(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    try {
      await runAnalysis(id);
      toast.success('AI tahlil boshlandi');
      await load();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setAnalyzing(false);
    }
  };

  const latestAnalysis = useMemo(() => {
    if (!file?.analyses?.length) return null;

    return [...file.analyses].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })[0];
  }, [file?.analyses]);

  const latestAnalysisDetail = latestAnalysis ? parseAnalysisDetail(latestAnalysis) : null;
  const analysisAttributes = latestAnalysis?.attributes ?? [];
  const attributeRows = analysisAttributes.slice(0, 12).map((attribute, index) => ({
    id: `${attribute.key}-${attribute.rowIndex ?? index}`,
    attribute: attribute.label ?? attribute.key,
    currentValue:
      attribute.currentValueText ??
      (attribute.currentValueDate ? fmtDate(attribute.currentValueDate) : null) ??
      readScalar(attribute.currentValueNumber) ??
      attribute.currentValueRaw ??
      '—',
    type: attribute.dataType,
    sheet: attribute.sheetName ?? '—',
    versionCount: String(attribute.versionCount ?? 1),
  }));

  if (loading) return <LoadingSkeleton />;
  if (error || !file) return <ErrorState message={error ?? 'Fayl topilmadi'} onRetry={load} />;

  const infoItems = [
    { label: 'ID', value: file.id },
    { label: 'Original file', value: file.originalName },
    { label: 'Stored name', value: file.storedName ?? '—' },
    { label: 'Format', value: file.extension ?? file.mimeType ?? '—' },
    { label: 'Hajm', value: fmtBytes(file.sizeBytes) },
    { label: 'Status', value: file.status },
    { label: 'Yuklangan', value: fmtDate(file.uploadedAt) },
    { label: 'Parsed', value: fmtDate(file.parsedAt) },
    { label: 'Analyzed', value: fmtDate(file.analyzedAt) },
    { label: 'Checksum', value: file.checksum ?? '—' },
  ];

  const countItems = [
    { label: 'Sheets', value: String(file.sheets?.length ?? file._count?.sheets ?? 0) },
    { label: 'Analyses', value: String(file.analyses?.length ?? file._count?.analyses ?? 0) },
    { label: 'Reports', value: String(file.reports?.length ?? file._count?.reports ?? 0) },
    { label: 'Rows', value: String(file._count?.rows ?? 0) },
    { label: 'Attributes', value: String(file._count?.attributes ?? analysisAttributes.length) },
  ];
  const latestAnalysisSafe = latestAnalysis;

  return (
    <div className="space-y-6 bg-[#F8FAFC]">
      <FinancialPageHeader
        title={file.originalName}
        description="Backenddan qaytgan fayl, tahlil, sheet va atribut ma’lumotlari structured ko‘rinishda chiqarildi."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { href: routes.financialReporting.files, name: 'Fayllar' },
          { name: file.originalName },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0B1E40] disabled:opacity-60"
          >
            <PiSparkle />
            {analyzing ? 'Tahlil boshlanmoqda...' : 'AI tahlil boshlash'}
          </button>
          <Link
            href={routes.financialReporting.files}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <PiArrowLeft />
            Orqaga
          </Link>
        </div>
      </FinancialPageHeader>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
        <DetailCard title="Fayl ma'lumotlari" icon={<PiFiles className="text-lg" />}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                  {item.label}
                </div>
                <div className="break-all text-sm font-medium text-[#0F172A]">{item.value}</div>
              </div>
            ))}
          </div>
          {file.errorMessage ? (
            <div className="mt-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">
              {file.errorMessage}
            </div>
          ) : null}
        </DetailCard>

        <DetailCard title="Qisqa statistika" icon={<PiChartBar className="text-lg" />}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {countItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                  {item.label}
                </div>
                <div className="mt-2 text-2xl font-bold text-[#112855]">{item.value}</div>
              </div>
            ))}
          </div>
        </DetailCard>
      </div>

      {latestAnalysisDetail && latestAnalysisSafe ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
          <AnalysisSummaryCard summary={latestAnalysisDetail.summary} />
          <DetailCard title="So‘nggi AI tahlil" icon={<PiChecks className="text-lg" />}>
            <div className="space-y-4 text-sm text-[#334155]">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <AnalysisStatusBadge status={latestAnalysisSafe.status} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Model</span>
                <span className="text-right font-medium text-[#0F172A]">
                  {latestAnalysisSafe.modelName ?? '—'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Prompt version</span>
                <span className="text-right font-medium text-[#0F172A]">
                  {latestAnalysisSafe.promptVersion ?? '—'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Yaratilgan</span>
                <span className="text-right font-medium text-[#0F172A]">
                  {fmtDate(latestAnalysisSafe.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Tugallangan</span>
                <span className="text-right font-medium text-[#0F172A]">
                  {fmtDate(latestAnalysisSafe.completedAt)}
                </span>
              </div>
              <Link
                href={routes.financialReporting.analysisDetails(latestAnalysisSafe.id)}
                className="inline-flex items-center text-sm font-medium text-[#112855] hover:underline"
              >
                AI natijani ko‘rish →
              </Link>
            </div>
          </DetailCard>
        </div>
      ) : null}

      <DetailCard title="Sheets" icon={<PiTable className="text-lg" />}>
        {file.sheets && file.sheets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-[0.14em] text-[#64748B]">
                  <th className="px-3 py-3">Sheet</th>
                  <th className="px-3 py-3">Rows</th>
                  <th className="px-3 py-3">Columns</th>
                  <th className="px-3 py-3">Range</th>
                  <th className="px-3 py-3">Headers</th>
                </tr>
              </thead>
              <tbody>
                {file.sheets.map((sheet) => (
                  <tr key={sheet.id} className="border-b border-[#F1F5F9] last:border-b-0">
                    <td className="px-3 py-4 font-medium text-[#0F172A]">
                      {sheet.sheetName ?? sheet.name ?? 'Unknown'}
                    </td>
                    <td className="px-3 py-4 text-[#334155]">{sheet.rowCount ?? '—'}</td>
                    <td className="px-3 py-4 text-[#334155]">{sheet.columnCount ?? '—'}</td>
                    <td className="px-3 py-4 text-[#334155]">{sheet.detectedRange ?? '—'}</td>
                    <td className="px-3 py-4 text-[#334155]">
                      {sheet.headers?.slice(0, 3).join(', ') || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-[#64748B]">Sheet ma’lumotlari topilmadi.</p>
        )}
      </DetailCard>

      {file.analyses && file.analyses.length > 0 ? (
        <DetailCard title="AI tahlillar" icon={<PiSparkle className="text-lg" />}>
          <div className="space-y-3">
            {file.analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <AnalysisStatusBadge status={analysis.status} />
                      <span className="text-sm font-medium text-[#0F172A]">
                        {analysis.modelName ?? 'AI Model'}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B]">
                      Prompt: {analysis.promptVersion ?? '—'} • Created: {fmtDate(analysis.createdAt)} •
                      Completed: {fmtDate(analysis.completedAt)}
                    </p>
                    <p className="text-sm text-[#334155]">
                      Attributes: {analysis.attributes?.length ?? 0} • Sheets:{' '}
                      {analysis.inputSummary?.sheets?.length ?? 0}
                    </p>
                  </div>
                  <Link
                    href={routes.financialReporting.analysisDetails(analysis.id)}
                    className="text-sm font-medium text-[#112855] hover:underline"
                  >
                    Ko‘rish →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
      ) : null}

      {file.reports && file.reports.length > 0 ? (
        <DetailCard title="PDF hisobotlar" icon={<PiFilePdf className="text-lg" />}>
          <div className="space-y-3">
            {file.reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{report.title}</p>
                  <p className="text-sm text-[#64748B]">
                    {report.fileName} • {fmtBytes(report.sizeBytes)} • {fmtDate(report.generatedAt)}
                  </p>
                </div>
                <Link
                  href={routes.financialReporting.reportDetails(report.id)}
                  className="text-sm font-medium text-[#112855] hover:underline"
                >
                  Ko‘rish →
                </Link>
              </div>
            ))}
          </div>
        </DetailCard>
      ) : null}

      {attributeRows.length > 0 ? (
        <AttributesSummaryTable items={attributeRows} />
      ) : null}
    </div>
  );
}
