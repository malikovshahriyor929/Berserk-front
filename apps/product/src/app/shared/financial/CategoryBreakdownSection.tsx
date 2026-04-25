'use client';

import { PiRows } from 'react-icons/pi';
import DetailCard from './DetailCard';
import AnalysisBadge from './AnalysisBadge';
import type { DetailCategoryItem } from './analysis-detail-utils';

export default function CategoryBreakdownSection({
  items,
}: {
  items: DetailCategoryItem[];
}) {
  return (
    <DetailCard title="Kategoriyalar" icon={<PiRows className="text-lg" />}>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-5 text-sm text-[#64748B]">
          Kategoriyalar mavjud emas.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-[0.16em] text-[#64748B]">
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Count</th>
                <th className="px-3 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#F1F5F9] last:border-b-0">
                  <td className="px-3 py-4 font-medium text-[#0F172A]">{item.category}</td>
                  <td className="px-3 py-4">
                    <AnalysisBadge tone="category" categoryType={item.type} />
                  </td>
                  <td className="px-3 py-4 text-[#334155]">{item.count}</td>
                  <td className="px-3 py-4 text-[#334155]">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DetailCard>
  );
}
