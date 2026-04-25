'use client';

import { PiFileText } from 'react-icons/pi';
import DetailCard from './DetailCard';

interface FileInfoCardProps {
  items: Array<{ label: string; value: string }>;
}

export default function FileInfoCard({ items }: FileInfoCardProps) {
  return (
    <DetailCard title="Fayl ma'lumotlari" icon={<PiFileText className="text-lg" />}>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              {item.label}
            </div>
            <div className="inline-flex max-w-full rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#0F172A] ring-1 ring-[#E2E8F0]">
              <span className="truncate">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
