'use client';

import Link from 'next/link';
import { PiPencilSimple, PiTrash, PiStar, PiStarFill } from 'react-icons/pi';
import type { ReportTemplate } from './types';
import { routes } from '@/config/routes';

interface ReportTemplateTableProps {
  templates: ReportTemplate[];
  onDelete: (id: string) => void;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function ReportTemplateTable({
  templates,
  onDelete,
}: ReportTemplateTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <th className="px-4 py-3">Nom</th>
            <th className="hidden px-4 py-3 sm:table-cell">Tavsif</th>
            <th className="px-4 py-3">Standart</th>
            <th className="hidden px-4 py-3 md:table-cell">Yangilangan</th>
            <th className="px-4 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {templates.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{t.name}</td>
              <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                {t.description ?? '—'}
              </td>
              <td className="px-4 py-3">
                {t.isDefault ? (
                  <PiStarFill className="text-yellow-500" />
                ) : (
                  <PiStar className="text-gray-300" />
                )}
              </td>
              <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                {fmtDate(t.updatedAt)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={routes.financialReporting.templateDetails(t.id)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#112855] transition-colors"
                    title="Tahrirlash"
                  >
                    <PiPencilSimple />
                  </Link>
                  <button
                    onClick={() => onDelete(t.id)}
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
  );
}
