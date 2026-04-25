'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PiUploadSimple, PiMagnifyingGlass, PiSparkle, PiEye, PiTrash } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import UploadStatusBadge from '@/app/shared/financial/UploadStatusBadge';
import EmptyState from '@/app/shared/financial/EmptyState';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';
import ConfirmDialog from '@/app/shared/financial/ConfirmDialog';

import {
  getFinancialFiles,
  deleteFinancialFile,
  runAnalysis,
  getApiErrorMessage,
} from '@/server/api';
import type { FinancialUploadedFile, UploadStatus } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Barcha statuslar' },
  { value: 'UPLOADED', label: 'Yuklandi' },
  { value: 'PARSED', label: 'Tahlil qilindi' },
  { value: 'ANALYZED', label: 'AI tayyor' },
  { value: 'PDF_GENERATED', label: 'PDF tayyor' },
  { value: 'FAILED', label: 'Xatolik' },
];

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

function fmtBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FinancialFilesPage() {
  const [files, setFiles] = useState<FinancialUploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [runningId, setRunningId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFinancialFiles({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setFiles(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteFinancialFile(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      toast.success('Fayl o\'chirildi');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const handleRunAnalysis = async (id: string) => {
    setRunningId(id);
    try {
      await runAnalysis(id);
      toast.success('AI tahlil boshlandi');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setRunningId(null);
    }
  };

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title="Yuklangan fayllar"
        description="Barcha yuklangan Excel va CSV fayllar tarixi."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'Fayllar' },
        ]}
      >
        <Link
          href={routes.financialReporting.upload}
          className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
        >
          <PiUploadSimple />
          Fayl yuklash
        </Link>
      </FinancialPageHeader>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Fayl nomi bo'yicha qidirish..."
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#112855] focus:ring-1 focus:ring-[#112855]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#112855]"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <LoadingState rows={6} />
      ) : files.length === 0 ? (
        <EmptyState
          title="Fayl topilmadi"
          description="Hali hech qanday fayl yuklanmagan yoki filtr natijasi bo&apos;sh."
          actionLabel="Fayl yuklash"
          actionHref={routes.financialReporting.upload}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Fayl nomi</th>
                <th className="hidden px-4 py-3 sm:table-cell">Hajm</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 md:table-cell">Yuklangan sana</th>
                <th className="hidden px-4 py-3 lg:table-cell">Tahlillar</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {files.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="max-w-xs truncate font-medium text-gray-800">
                      {f.originalName}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                    {fmtBytes(f.sizeBytes)}
                  </td>
                  <td className="px-4 py-3">
                    <UploadStatusBadge status={f.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                    {fmtDate(f.uploadedAt)}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 lg:table-cell">
                    {f._count?.analyses ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={routes.financialReporting.fileDetails(f.id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#112855] transition-colors"
                        title="Ko&apos;rish"
                      >
                        <PiEye />
                      </Link>
                      <button
                        onClick={() => handleRunAnalysis(f.id)}
                        disabled={runningId === f.id}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-[#112855]/10 hover:text-[#112855] transition-colors disabled:opacity-40"
                        title="AI tahlil"
                      >
                        <PiSparkle />
                      </button>
                      <button
                        onClick={() => setConfirmId(f.id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="O'chirish"
                      >
                        <PiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmId}
        title="Faylni o&apos;chirish"
        message="Bu faylni o&apos;chirishni tasdiqlaysizmi? Bu amalni orqaga qaytarib bo'lmaydi."
        confirmLabel="Ha, o&apos;chirish"
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
        isLoading={!!deletingId}
      />
    </div>
  );
}
