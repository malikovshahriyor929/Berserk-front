'use client';

import { PiWarningCircle } from 'react-icons/pi';
import type { DetailListItem } from './analysis-detail-utils';
import DetailListSection from './DetailListSection';

export default function WarningSection({ items }: { items: DetailListItem[] }) {
  return (
    <DetailListSection
      title="Ogohlantirishlar"
      icon={<PiWarningCircle className="text-lg" />}
      tone="warning"
      items={items}
      emptyText="Ogohlantirishlar aniqlanmadi."
    />
  );
}
