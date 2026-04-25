'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PiPlus } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ReportTemplateTable from '@/app/shared/financial/ReportTemplateTable';
import ReportTemplateForm from '@/app/shared/financial/ReportTemplateForm';
import EmptyState from '@/app/shared/financial/EmptyState';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';
import ConfirmDialog from '@/app/shared/financial/ConfirmDialog';

import {
  getReportTemplates,
  createReportTemplate,
  deleteReportTemplate,
  getApiErrorMessage,
} from '@/server/api';
import type { ReportTemplate, CreateReportTemplatePayload } from '@/app/shared/financial/types';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTemplates(await getReportTemplates());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (payload: CreateReportTemplatePayload) => {
    setSaving(true);
    try {
      const t = await createReportTemplate(payload);
      setTemplates((prev) => [t, ...prev]);
      toast.success('Shablon yaratildi');
      setCreating(false);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await deleteReportTemplate(id);
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      toast.success('Shablon o\'chirildi');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  if (creating) {
    return (
      <div className="space-y-6">
        <FinancialPageHeader
          title="Yangi shablon yaratish"
          breadcrumb={[
            { href: '/', name: 'Bosh sahifa' },
            { name: 'Moliyaviy hisobot' },
            { href: '/financial/templates', name: 'Shablonlar' },
            { name: 'Yangi' },
          ]}
        />
        <ReportTemplateForm
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
          isSaving={saving}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title="Hisobot shablonlari"
        description="PDF hisobot shablonlarini boshqarish."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'Shablonlar' },
        ]}
      >
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
        >
          <PiPlus />
          Yangi shablon
        </button>
      </FinancialPageHeader>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <LoadingState rows={4} />
      ) : templates.length === 0 ? (
        <EmptyState
          title="Shablon topilmadi"
          description="Hali hech qanday hisobot shabloni yaratilmagan."
          actionLabel="Shablon yaratish"
          onAction={() => setCreating(true)}
        />
      ) : (
        <ReportTemplateTable
          templates={templates}
          onDelete={(id) => setConfirmId(id)}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmId}
        title="Shablonni o'chirish"
        message="Bu shablonni o'chirishni tasdiqlaysizmi?"
        confirmLabel="Ha, o'chirish"
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
        isLoading={deleting}
      />
    </div>
  );
}
