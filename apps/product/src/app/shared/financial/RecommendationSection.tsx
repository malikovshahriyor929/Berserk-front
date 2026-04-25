'use client';

import { PiLightbulb } from 'react-icons/pi';
import type { DetailListItem } from './analysis-detail-utils';
import DetailListSection from './DetailListSection';

export default function RecommendationSection({ items }: { items: DetailListItem[] }) {
  return (
    <DetailListSection
      title="Tavsiyalar"
      icon={<PiLightbulb className="text-lg" />}
      tone="success"
      items={items}
      emptyText="Tavsiyalar mavjud emas."
    />
  );
}
