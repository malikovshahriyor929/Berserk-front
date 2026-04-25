'use client';

import { PiWarningOctagon } from 'react-icons/pi';
import type { DetailListItem } from './analysis-detail-utils';
import DetailListSection from './DetailListSection';

export default function ErrorSection({ items }: { items: DetailListItem[] }) {
  return (
    <DetailListSection
      title="Xatolar va kritik muammolar"
      icon={<PiWarningOctagon className="text-lg" />}
      tone="danger"
      items={items}
      emptyText="Kritik xatolar aniqlanmadi."
    />
  );
}
