'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PiArrowLeft } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ReportTemplateForm from '@/app/shared/financial/ReportTemplateForm';
import ErrorState from '@/app/shared/financial/ErrorState';
import LoadingState from '@/app/shared/financial/LoadingState';

import {
  getReportTemplate,
  updateReportTemplate,
  getApiErrorMessage,
} from '@/server/api';
import type { ReportTemplate, CreateReportTemplatePayload } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

export default function EditTemplatePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [template, setTemplate] = useState<ReportTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTemplate(await getReportTemplate(id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (payload: CreateReportTemplatePayload) => {
    setSaving(true);
    try {
      await updateReportTemplate(id, payload);
      toast.success('Shablon yangilandi');
      router.push(routes.financialReporting.templates);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState rows={8} />;
  if (error || !template)
    return <ErrorState message={error ?? 'Shablon topilmadi'} onRetry={load} />;

  return (
    <div className="space-y-6">
      <FinancialPageHeader
        title={`Shablon tahrirlash: ${template.name}`}
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { href: routes.financialReporting.templates, name: 'Shablonlar' },
          { name: 'Tahrirlash' },
        ]}
      >
        <Link
          href={routes.financialReporting.templates}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <PiArrowLeft />
          Orqaga
        </Link>
      </FinancialPageHeader>

      <ReportTemplateForm
        initial={template}
        onSave={handleSave}
        onCancel={() => router.push(routes.financialReporting.templates)}
        isSaving={saving}
      />
    </div>
  );
}
