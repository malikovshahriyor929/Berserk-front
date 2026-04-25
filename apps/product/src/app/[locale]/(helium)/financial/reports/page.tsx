'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiPlus, PiX } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ReportsTable from '@/app/shared/financial/ReportsTable';
import EmptyState from '@/app/shared/financial/EmptyState';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';

import {
  getReports,
  generateReport,
  getReportTemplates,
  getFinancialFiles,
  getAnalyses,
  getApiErrorMessage,
} from '@/server/api';
import type {
  GeneratedReport,
  ReportTemplate,
  FinancialUploadedFile,
  AiAnalysis,
  DashboardRange,
  GenerateReportPayload,
} from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

const RANGE_OPTIONS: { value: DashboardRange; label: string }[] = [
  { value: '1d', label: '1 kun' },
  { value: '1w', label: '1 hafta' },
  { value: '1m', label: '1 oy' },
  { value: '1y', label: '1 yil' },
  { value: '10y', label: '10 yil' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [files, setFiles] = useState<FinancialUploadedFile[]>([]);
  const [analyses, setAnalyses] = useState<AiAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState<{
    templateId: string;
    uploadId: string;
    analysisId: string;
    range: DashboardRange;
  }>({ templateId: '', uploadId: '', analysisId: '', range: '1m' });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [r, t, f, a] = await Promise.all([
        getReports(),
        getReportTemplates(),
        getFinancialFiles(),
        getAnalyses(),
      ]);
      setReports(r);
      setTemplates(t);
      setFiles(f);
      setAnalyses(a);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    const payload: GenerateReportPayload = {
      range: form.range,
      templateId: form.templateId || undefined,
      uploadId: form.uploadId || undefined,
      analysisId: form.analysisId || undefined,
    };
    try {
      const report = await generateReport(payload);
      setReports((prev) => [report, ...prev]);
      toast.success('PDF hisobot yaratildi!');
      setShowModal(false);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title="PDF hisobotlar"
        description="Yaratilgan PDF hisobotlar ro'yxati."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'PDF hisobotlar' },
        ]}
      >
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
        >
          <PiPlus />
          Hisobot yaratish
        </button>
      </FinancialPageHeader>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <LoadingState rows={5} />
      ) : reports.length === 0 ? (
        <EmptyState
          title="Hisobot topilmadi"
          description="Hali hech qanday PDF hisobot yaratilmagan."
          actionLabel="Hisobot yaratish"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <ReportsTable reports={reports} />
      )}

      {/* Generate modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                PDF hisobot yaratish
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <PiX />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Shablon
                </label>
                <select
                  value={form.templateId}
                  onChange={(e) => setForm((f) => ({ ...f, templateId: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#112855]"
                >
                  <option value="">Standart shablon</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Fayl (ixtiyoriy)
                </label>
                <select
                  value={form.uploadId}
                  onChange={(e) => setForm((f) => ({ ...f, uploadId: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#112855]"
                >
                  <option value="">Tanlanmagan</option>
                  {files.map((f) => (
                    <option key={f.id} value={f.id}>{f.originalName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  AI tahlil (ixtiyoriy)
                </label>
                <select
                  value={form.analysisId}
                  onChange={(e) => setForm((f) => ({ ...f, analysisId: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#112855]"
                >
                  <option value="">Tanlanmagan</option>
                  {analyses.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.id.slice(0, 8)}… — {a.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Davr
                </label>
                <select
                  value={form.range}
                  onChange={(e) => setForm((f) => ({ ...f, range: e.target.value as DashboardRange }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#112855]"
                >
                  {RANGE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={generating}
                  className="flex-1 rounded-xl bg-[#112855] py-2.5 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors disabled:opacity-60"
                >
                  {generating ? 'Yaratilmoqda...' : 'PDF yaratish'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
