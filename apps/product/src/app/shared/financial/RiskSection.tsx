'use client';

import { PiShieldWarning } from 'react-icons/pi';
import type { DetailListItem } from './analysis-detail-utils';
import DetailListSection from './DetailListSection';

export default function RiskSection({ items }: { items: DetailListItem[] }) {
  return (
    <DetailListSection
      title="Risklar"
      icon={<PiShieldWarning className="text-lg" />}
      tone="neutral"
      items={items}
      emptyText="Risklar aniqlanmadi."
    />
  );
}
