'use client';

import type { ReactNode } from 'react';
import DetailCard from './DetailCard';
import AnalysisBadge from './AnalysisBadge';
import type { DetailListItem, DetailTone } from './analysis-detail-utils';

const toneStyles: Record<DetailTone, { card: string; item: string; icon: string; text: string }> = {
  success: {
    card: 'border-[#BBF7D0] bg-[#ECFDF5]',
    item: 'border-[#BBF7D0] bg-white',
    icon: 'text-[#16A34A]',
    text: 'text-[#166534]',
  },
  warning: {
    card: 'border-[#FDE68A] bg-[#FFFBEB]',
    item: 'border-[#FDE68A] bg-white',
    icon: 'text-[#D97706]',
    text: 'text-[#92400E]',
  },
  danger: {
    card: 'border-[#FECACA] bg-[#FEF2F2]',
    item: 'border-[#FECACA] bg-white',
    icon: 'text-[#DC2626]',
    text: 'text-[#991B1B]',
  },
  info: {
    card: 'border-[#DBEAFE] bg-[#EFF6FF]',
    item: 'border-[#DBEAFE] bg-white',
    icon: 'text-[#2563EB]',
    text: 'text-[#1D4ED8]',
  },
  neutral: {
    card: 'border-[#E5E7EB] bg-[#F8FAFC]',
    item: 'border-[#E5E7EB] bg-white',
    icon: 'text-[#64748B]',
    text: 'text-[#334155]',
  },
};

interface DetailListSectionProps {
  title: string;
  icon: ReactNode;
  tone: DetailTone;
  items: DetailListItem[];
  emptyText: string;
}

export default function DetailListSection({
  title,
  icon,
  tone,
  items,
  emptyText,
}: DetailListSectionProps) {
  const styles = toneStyles[tone];

  return (
    <DetailCard
      title={title}
      icon={<span className={styles.icon}>{icon}</span>}
      className={styles.card}
    >
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-4 py-5 text-sm text-[#64748B]">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className={`rounded-2xl border px-4 py-4 ${styles.item}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className={`text-sm font-semibold ${styles.text}`}>{item.title}</p>
                  {item.description ? (
                    <p className="text-sm leading-6 text-[#475569]">{item.description}</p>
                  ) : null}
                  {item.recommendation ? (
                    <p className="text-sm font-medium leading-6 text-[#0F172A]">
                      Tavsiya: {item.recommendation}
                    </p>
                  ) : null}
                  {item.meta ? (
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#94A3B8]">
                      {item.meta}
                    </p>
                  ) : null}
                </div>
                {item.severity ? (
                  <AnalysisBadge tone="severity" severity={item.severity} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </DetailCard>
  );
}
