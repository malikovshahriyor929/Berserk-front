'use client';

import { useEffect, useState } from 'react';
import { PiCopy, PiMagnifyingGlass } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { getAttributesPalette } from '@/server/api';
import type { FinancialAttribute } from './types';

export default function AttributePalette() {
  const [attrs, setAttrs] = useState<FinancialAttribute[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttributesPalette()
      .then(setAttrs)
      .catch(() => toast.error('Atributlar yuklanmadi'))
      .finally(() => setLoading(false));
  }, []);

  const types = Array.from(new Set(attrs.map((a) => a.dataType))).sort();

  const filtered = attrs.filter((a) => {
    const matchSearch =
      !search ||
      a.label.toLowerCase().includes(search.toLowerCase()) ||
      a.attributeKey.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || a.dataType === typeFilter;
    return matchSearch && matchType;
  });

  const copyPlaceholder = (key: string) => {
    navigator.clipboard
      .writeText(`{{${key}}}`)
      .then(() => toast.success(`Nusxalandi: {{${key}}}`))
      .catch(() => toast.error('Nusxalab bo\'lmadi'));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <p className="mb-3 text-sm font-semibold text-gray-700">Atributlar palitasi</p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Qidirish..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#112855] focus:ring-1 focus:ring-[#112855]"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#112855]"
          >
            <option value="">Hammasi</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {loading ? (
          <div className="py-6 text-center text-sm text-gray-400">
            Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-gray-400">
            Topilmadi
          </div>
        ) : (
          filtered.map((attr) => (
            <div
              key={attr.id}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-gray-800">
                  {attr.label}
                </p>
                <p className="truncate text-[10px] text-gray-400">
                  {attr.attributeKey} · {attr.dataType}
                </p>
              </div>
              <button
                onClick={() => copyPlaceholder(attr.attributeKey)}
                className="ml-2 shrink-0 rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#112855] transition-colors"
                title="Placeholder nusxalash"
              >
                <PiCopy className="text-sm" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
