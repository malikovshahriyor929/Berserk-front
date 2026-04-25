'use client';

import { PiTable } from 'react-icons/pi';
import DetailCard from './DetailCard';
import type { DetailAttributeItem } from './analysis-detail-utils';

export default function AttributesSummaryTable({
  items,
}: {
  items: DetailAttributeItem[];
}) {
  return (
    <DetailCard title="Aniqlangan atributlar" icon={<PiTable className="text-lg" />}>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-5 text-sm text-[#64748B]">
          Aniqlangan atributlar mavjud emas.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-[0.16em] text-[#64748B]">
                <th className="px-3 py-3">Attribute</th>
                <th className="px-3 py-3">Current value</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Sheet</th>
                <th className="px-3 py-3">Version count</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#F1F5F9] last:border-b-0">
                  <td className="px-3 py-4 font-medium text-[#0F172A]">{item.attribute}</td>
                  <td className="px-3 py-4 text-[#334155]">{item.currentValue}</td>
                  <td className="px-3 py-4 text-[#334155]">{item.type}</td>
                  <td className="px-3 py-4 text-[#334155]">{item.sheet}</td>
                  <td className="px-3 py-4 text-[#334155]">{item.versionCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DetailCard>
  );
}
