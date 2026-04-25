'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PiArrowLeft, PiSparkle, PiEye, PiSpinnerGap } from 'react-icons/pi';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import UploadDropzone from '@/app/shared/financial/UploadDropzone';
import UploadStatusBadge from '@/app/shared/financial/UploadStatusBadge';

import {
  uploadFinancialFile,
  runAnalysis,
  getApiErrorMessage,
  getFinancialFile,
} from '@/server/api';
import type { AiAnalysis, FinancialUploadedFile } from '@/app/shared/financial/types';
import { routes } from '@/config/routes';

function getProgressMeta(uploaded: FinancialUploadedFile | null, analysis: AiAnalysis | null) {
  if (!uploaded) {
    return {
      value: 0,
      title: 'AI tahlil kutilmoqda',
      description: 'Fayl yuklangandan keyin AI javob tayyorlanish jarayoni shu yerda ko‘rinadi.',
      complete: false,
      failed: false,
    };
  }

  if (analysis?.status === 'FAILED' || uploaded.status === 'FAILED') {
    return {
      value: 100,
      title: 'AI tahlilda xatolik yuz berdi',
      description: analysis?.errorMessage ?? uploaded.errorMessage ?? 'Jarayon muvaffaqiyatsiz tugadi.',
      complete: false,
      failed: true,
    };
  }

  if (analysis?.status === 'SUCCESS' || uploaded.status === 'ANALYZED' || uploaded.status === 'PDF_GENERATED') {
    return {
      value: 100,
      title: 'AI answer tayyor',
      description: 'Tahlil yakunlandi. Natijani ko‘rishingiz mumkin.',
      complete: true,
      failed: false,
    };
  }

  if (analysis?.status === 'RUNNING' || uploaded.status === 'ANALYZING') {
    return {
      value: 82,
      title: 'AI answer tayyorlanmoqda',
      description: 'Moliyaviy ko‘rsatkichlar tahlil qilinyapti.',
      complete: false,
      failed: false,
    };
  }

  if (analysis?.status === 'PENDING' || uploaded.status === 'PARSED') {
    return {
      value: 58,
      title: 'AI tahlil navbatga qo‘yildi',
      description: 'Fayl parse qilindi, AI bosqichi boshlanmoqda.',
      complete: false,
      failed: false,
    };
  }

  if (uploaded.status === 'PARSING') {
    return {
      value: 32,
      title: 'Fayl qayta ishlanmoqda',
      description: 'Sheet va transaction ma’lumotlari tayyorlanyapti.',
      complete: false,
      failed: false,
    };
  }

  return {
    value: 12,
    title: 'Fayl muvaffaqiyatli yuklandi',
    description: 'AI tahlilni boshlash yoki avtomatik jarayon tugashini kutish mumkin.',
    complete: false,
    failed: false,
  };
}

export default function FinancialUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<FinancialUploadedFile | null>(null);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadFinancialFile(file);
      setUploaded(result);
      toast.success('Fayl muvaffaqiyatli yuklandi!');

      if (autoAnalyze) {
        setAnalyzing(true);
        try {
          const startedAnalysis = await runAnalysis(result.id);
          setAnalysis(startedAnalysis);
          toast.success('AI tahlil boshlandi');
        } catch (err) {
          toast.error('AI tahlilni boshlashda xatolik: ' + getApiErrorMessage(err));
        } finally {
          setAnalyzing(false);
        }
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleRunAnalysis = async () => {
    if (!uploaded) return;
    setAnalyzing(true);
    try {
      const startedAnalysis = await runAnalysis(uploaded.id);
      setAnalysis(startedAnalysis);
      toast.success('AI tahlil boshlandi');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setUploaded(null);
    setAnalysis(null);
  };

  useEffect(() => {
    if (!uploaded) return;

    const shouldPoll =
      uploaded.status === 'UPLOADED' ||
      uploaded.status === 'PARSING' ||
      uploaded.status === 'PARSED' ||
      uploaded.status === 'ANALYZING' ||
      analysis?.status === 'PENDING' ||
      analysis?.status === 'RUNNING';

    if (!shouldPoll) return;

    const intervalId = window.setInterval(async () => {
      try {
        const nextFile = await getFinancialFile(uploaded.id);
        setUploaded(nextFile);

        const latestAnalysis = nextFile.analyses?.[0] ?? null;
        if (latestAnalysis) {
          setAnalysis((current) => {
            if (!current) return latestAnalysis;
            return new Date(latestAnalysis.createdAt).getTime() >= new Date(current.createdAt).getTime()
              ? latestAnalysis
              : current;
          });
        }
      } catch {
        window.clearInterval(intervalId);
      }
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, [uploaded?.id, uploaded?.status, analysis?.status]);

  const progress = useMemo(() => getProgressMeta(uploaded, analysis), [uploaded, analysis]);

  return (
    <div className=" space-y-6">
      <FinancialPageHeader
        title="Excel fayl yuklash"
        description="Moliyaviy ma'lumotlarni tahlil qilish uchun Excel yoki CSV fayl yuklang."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { href: routes.financialReporting.files, name: 'Fayllar' },
          { name: 'Yuklash' },
        ]}
      >
        <Link
          href={routes.financialReporting.files}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#112855] transition-colors"
        >
          <PiArrowLeft />
          Fayllar ro&apos;yxati
        </Link>
      </FinancialPageHeader>

      {uploaded ? (
        <div className="rounded-xl border border-[#BBF7D0] bg-[#ECFDF5] p-6 space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-[#166534]">{progress.title}</p>
                {!progress.complete && !progress.failed ? (
                  <PiSpinnerGap className="animate-spin text-[#16A34A]" />
                ) : null}
              </div>
              <p className="text-sm text-[#166534]/80">{progress.description}</p>
            </div>
            <UploadStatusBadge status={uploaded.status} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-medium text-[#0F172A]">
              <span>AI answer progress</span>
              <span>{progress.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/80 ring-1 ring-[#BBF7D0]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress.failed ? 'bg-[#DC2626]' : 'bg-[#112855]'
                }`}
                style={{ width: `${progress.value}%` }}
              />
            </div>
            <p className="text-xs text-[#64748B]">
              0% dan 100% gacha AI javob tayyorlanish bosqichi ko‘rsatiladi.
            </p>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Nom:</span> {uploaded.originalName}</p>
            <p><span className="font-medium">ID:</span> {uploaded.id}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing || progress.complete}
              className="flex items-center gap-2 rounded-xl bg-[#112855] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors disabled:opacity-60"
            >
              <PiSparkle />
              {analyzing ? 'Tahlil boshlanmoqda...' : progress.complete ? 'AI tahlil yakunlangan' : 'AI tahlilni boshlash'}
            </button>
            <Link
              href={
                analysis?.id && progress.complete
                  ? routes.financialReporting.analysisDetails(analysis.id)
                  : routes.financialReporting.fileDetails(uploaded.id)
              }
              className="flex items-center gap-2 rounded-xl border border-[#112855] px-4 py-2 text-sm font-medium text-[#112855] hover:bg-[#112855]/5 transition-colors"
            >
              <PiEye />
              {analysis?.id && progress.complete ? 'AI natijani ko‘rish' : 'Fayl tafsiloti'}
            </Link>
            <button
              onClick={reset}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Yangi fayl yuklash
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <UploadDropzone
            onFile={setFile}
            selectedFile={file}
            onClear={() => setFile(null)}
            disabled={uploading}
          />

          <div className="flex items-center gap-2">
            <input
              id="autoAnalyze"
              type="checkbox"
              checked={autoAnalyze}
              onChange={(e) => setAutoAnalyze(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#112855] focus:ring-[#112855]"
              disabled={uploading}
            />
            <label htmlFor="autoAnalyze" className="text-sm text-gray-700">
              Yuklangandan keyin avtomatik AI tahlil qilish
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full rounded-xl bg-[#112855] py-2.5 text-sm font-semibold text-white hover:bg-[#0B1E40] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? 'Yuklanmoqda...' : 'Fayl yuklash'}
          </button>
        </div>
      )}
    </div>
  );
}
