'use client';

import type { ReactNode } from 'react';

interface DetailCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function DetailCard({
  title,
  icon,
  children,
  className,
  bodyClassName,
}: DetailCardProps) {
  return (
    <section
      className={`rounded-2xl border border-[#E5E7EB] bg-white ${className ?? ''}`}
    >
      <div className="flex items-center gap-3 border-b border-[#F1F5F9] px-5 py-4 sm:px-6">
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#112855]">
            {icon}
          </div>
        ) : null}
        <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
      </div>
      <div className={bodyClassName ?? 'px-5 py-5 sm:px-6 sm:py-6'}>{children}</div>
    </section>
  );
}
