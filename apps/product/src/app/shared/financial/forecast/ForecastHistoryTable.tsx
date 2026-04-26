'use client';

import { ForecastRun } from '@/app/shared/financial/types';
import { Badge, ActionIcon, Tooltip } from 'rizzui';
import { PiEye, PiTrash, PiChartLineUp, PiWarningCircle } from 'react-icons/pi';
import Link from 'next/link';
import { deleteForecast } from '@/server/api';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ForecastHistoryTableProps {
  data: ForecastRun[];
  onRefresh: () => void;
}

export default function ForecastHistoryTable({ data, onRefresh }: ForecastHistoryTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Ushbu prognozni o‘chirib tashlamoqchimisiz?')) return;
    setDeleting(id);
    try {
      await deleteForecast(id);
      toast.success('Prognoz o‘chirildi');
      onRefresh();
    } catch (err) {
      toast.error('O‘chirishda xatolik');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <Badge color="success" variant="flat">Muvaffaqiyatli</Badge>;
      case 'RUNNING':
        return <Badge color="primary" variant="flat">Jarayonda...</Badge>;
      case 'FAILED':
        return <Badge color="danger" variant="flat">Xatolik</Badge>;
      case 'INSUFFICIENT_DATA':
        return <Badge color="warning" variant="flat">Yetarsiz ma’lumot</Badge>;
      default:
        return <Badge color="secondary" variant="flat">{status}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-4">Fayl nomi</th>
            <th className="px-6 py-4">Horizon</th>
            <th className="px-6 py-4">Ssenariy</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Sana</th>
            <th className="px-6 py-4 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                Hozircha prognozlar mavjud emas.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.upload?.originalName || 'Noma’lum fayl'}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.horizon.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.scenario}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Tooltip content="Ko'rish">
                      <Link href={`/financial/forecasts/${item.id}`}>
                        <ActionIcon size="sm" variant="flat" color="primary">
                          <PiEye className="h-4 w-4" />
                        </ActionIcon>
                      </Link>
                    </Tooltip>
                    <Tooltip content="O'chirish">
                      <ActionIcon
                        size="sm"
                        variant="flat"
                        color="danger"
                        onClick={() => handleDelete(item.id)}
                        isLoading={deleting === item.id}
                      >
                        <PiTrash className="h-4 w-4" />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
