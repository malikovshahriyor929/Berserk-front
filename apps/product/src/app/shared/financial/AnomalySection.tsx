'use client';

import { PiScanSmiley } from 'react-icons/pi';
import type { DetailListItem } from './analysis-detail-utils';
import DetailListSection from './DetailListSection';

export default function AnomalySection({ items }: { items: DetailListItem[] }) {
  return (
    <DetailListSection
      title="Anomaliyalar"
      icon={<PiScanSmiley className="text-lg" />}
      tone="info"
      items={items}
      emptyText="Anomaliyalar aniqlanmadi."
    />
  );
}
