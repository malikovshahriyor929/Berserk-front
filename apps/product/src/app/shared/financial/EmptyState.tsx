'use client';

import Link from 'next/link';
import { PiTrayDuotone } from 'react-icons/pi';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'Ma\'lumot topilmadi',
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <PiTrayDuotone className="mb-4 text-6xl text-gray-300" />
      <p className="mb-1 text-lg font-semibold text-gray-700">{title}</p>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="rounded-lg bg-[#112855] px-5 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="rounded-lg bg-[#112855] px-5 py-2 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
