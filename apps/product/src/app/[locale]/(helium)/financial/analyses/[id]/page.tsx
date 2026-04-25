'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PiArrowSquareOut, PiArrowsClockwise } from 'react-icons/pi';

import AnalysisDetailHeader from '@/app/shared/financial/AnalysisDetailHeader';
import AnalysisSummaryCard from '@/app/shared/financial/AnalysisSummaryCard';
import AnalysisStatusCard from '@/app/shared/financial/AnalysisStatusCard';
import FileInfoCard from '@/app/shared/financial/FileInfoCard';
import ErrorSection from '@/app/shared/financial/ErrorSection';
import PdfActionButton from '@/app/shared/financial/PdfActionButton';
import ErrorState from '@/app/shared/financial/ErrorState';
import EmptyState from '@/app/shared/financial/EmptyState';
import LoadingSkeleton from '@/app/shared/financial/LoadingSkeleton';

import {
  getAnalysis,
  getFinancialFile,
  getReports,
  generateReport,
  downloadReport,
  runAnalysis,
  getApiErrorMessage,
} from '@/server/api';
import {
  getFileChips,
  parseAnalysisDetail,
} from '@/app/shared/financial/analysis-detail-utils';
import type {
  AiAnalysis,
  FinancialUploadedFile,
  GeneratedReport,
} from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

export default function AnalysisDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [file, setFile] = useState<FinancialUploadedFile | null>(null);
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [rerunning, setRerunning] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [a, allReports] = await Promise.all([
        getAnalysis(id),
        getReports().catch(() => [] as GeneratedReport[]),
      ]);
      const upload = await getFinancialFile(a.uploadId).catch(() => null);
      setAnalysis(a);
      setFile(upload);
      // filter reports belonging to this analysis
      setReports(allReports.filter((r) => r.analysisId === id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleDownload = async (report: GeneratedReport) => {
    setDownloading(report.id);
    try {
      await downloadReport(report.id, report.fileName);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setDownloading(null);
    }
  };

  const handleGenerateAndDownload = async () => {
    if (!analysis) return;
    setGenerating(true);
    try {
      const newReport = await generateReport({
        analysisId: analysis.id,
        uploadId: analysis.uploadId,
      });
      toast.success('PDF hisobot yaratildi!');
      setReports((prev) => [newReport, ...prev]);
      // auto-download
      await handleDownload(newReport);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setGenerating(false);
    }
  };

  const handleRerunAnalysis = async () => {
    if (!analysis) return;
    setRerunning(true);
    try {
      const rerun = await runAnalysis(analysis.uploadId);
      toast.success('Qayta tahlil boshlandi');
      router.push(routes.financialReporting.analysisDetails(rerun.id));
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setRerunning(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC]">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !analysis)
    return <ErrorState message={error ?? 'Tahlil topilmadi'} onRetry={load} />;

  const detail = parseAnalysisDetail(analysis);
  const latestReport = reports[0] ?? null;
  const canDownloadPdf = Boolean(latestReport) || analysis.status === 'SUCCESS';
  const fileInfoItems = getFileChips(file, detail);

  return (
    <div className="space-y-6 bg-[#F8FAFC]">
      <AnalysisDetailHeader
        title="AI tahlil natijasi"
        subtitle="Yuklangan Excel fayl asosida avtomatik moliyaviy tahlil"
        breadcrumb={[
          { href: routes.dashboard.overview, name: 'Dashboard' },
          { href: routes.financialReporting.analyses, name: 'AI tahlillar' },
          { name: 'Tahlil tafsiloti' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={file ? routes.financialReporting.fileDetails(file.id) : routes.financialReporting.files}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
          >
            <PiArrowSquareOut className="text-base" />
            Faylga o‘tish
          </Link>
          <button
            onClick={handleRerunAnalysis}
            disabled={rerunning}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PiArrowsClockwise className={`text-base ${rerunning ? 'animate-spin' : ''}`} />
            Qayta tahlil
          </button>
          <PdfActionButton
            hasReport={Boolean(latestReport)}
            loading={Boolean(downloading) || generating}
            disabled={!canDownloadPdf}
            onClick={() =>
              latestReport ? handleDownload(latestReport) : handleGenerateAndDownload()
            }
          />
          <Link
            href={routes.financialReporting.analyses}
            className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
          >
            Orqaga qaytish
          </Link>
        </div>
      </AnalysisDetailHeader>

      {analysis.status === 'FAILED' ? (
        <ErrorSection
          items={[
            {
              id: 'analysis-failed',
              title: analysis.errorMessage ?? 'AI tahlil muvaffaqiyatsiz yakunlandi.',
              severity: 'critical',
            },
          ]}
        />
      ) : analysis.status === 'PENDING' || analysis.status === 'RUNNING' ? (
        <EmptyState
          title="Tahlil hali yakunlanmagan"
          description="Natijalar tayyor bo‘lgach ushbu sahifa avtomatik ravishda to‘liq structured ko‘rinishda chiqadi."
          actionLabel="Qayta yuklash"
          onAction={load}
        />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
            <AnalysisSummaryCard
              title="AI tahlil matni"
              summary={analysis.resultText?.trim() || detail.summary}
            />
            <AnalysisStatusCard analysis={analysis} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <AnalysisSummaryCard
                title="Qisqacha preview"
                summary={detail.summary}
              />
              {analysis.errorMessage ? (
                <ErrorSection
                  items={[
                    {
                      id: 'analysis-error-inline',
                      title: analysis.errorMessage,
                      severity: 'high',
                    },
                  ]}
                />
              ) : null}
            </div>
            <FileInfoCard items={fileInfoItems} />
          </div>
        </>
      )}
    </div>
  );
}
