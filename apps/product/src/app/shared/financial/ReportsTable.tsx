'use client';

import Link from 'next/link';
import { PiDownloadSimple, PiEye } from 'react-icons/pi';
import type { GeneratedReport } from './types';
import { routes } from '@/config/routes';
import { downloadReport } from '@/server/api';
import toast from 'react-hot-toast';

interface ReportsTableProps {
  reports: GeneratedReport[];
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('uz-UZ', {
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

export default function ReportsTable({ reports }: ReportsTableProps) {
  const handleDownload = async (report: GeneratedReport) => {
    try {
      await downloadReport(report.id, report.fileName);
      toast.success('Yuklab olindi');
    } catch {
      toast.error('Yuklab olishda xatolik');
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <th className="px-4 py-3">Sarlavha</th>
            <th className="hidden px-4 py-3 sm:table-cell">Fayl nomi</th>
            <th className="hidden px-4 py-3 md:table-cell">Davr</th>
            <th className="hidden px-4 py-3 lg:table-cell">Hajm</th>
            <th className="px-4 py-3">Yaratilgan</th>
            <th className="px-4 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {reports.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{r.title}</td>
              <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                {r.fileName}
              </td>
              <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                {r.range ?? '—'}
              </td>
              <td className="hidden px-4 py-3 text-gray-400 lg:table-cell">
                {fmtBytes(r.sizeBytes)}
              </td>
              <td className="px-4 py-3 text-gray-400">{fmtDate(r.generatedAt)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={routes.financialReporting.reportDetails(r.id)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#112855] transition-colors"
                    title="Ko&apos;rish"
                  >
                    <PiEye />
                  </Link>
                  <button
                    onClick={() => handleDownload(r)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-[#112855]/10 hover:text-[#112855] transition-colors"
                    title="Yuklab olish"
                  >
                    <PiDownloadSimple />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
