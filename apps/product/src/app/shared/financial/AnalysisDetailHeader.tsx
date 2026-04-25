'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { PiCaretRightBold } from 'react-icons/pi';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface AnalysisDetailHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb: BreadcrumbItem[];
  actions?: ReactNode;
  children?: ReactNode;
}

export default function AnalysisDetailHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  children,
}: AnalysisDetailHeaderProps) {
  return (
    <header className="rounded-[28px] border border-[#E5E7EB] bg-white px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#64748B]">
            {breadcrumb.map((item, index) => (
              <span key={`${item.name}-${index}`} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-[#112855]">
                    {item.name}
                  </Link>
                ) : (
                  <span className={index === breadcrumb.length - 1 ? 'text-[#0F172A]' : ''}>
                    {item.name}
                  </span>
                )}
                {index < breadcrumb.length - 1 ? (
                  <PiCaretRightBold className="text-[10px] text-[#94A3B8]" />
                ) : null}
              </span>
            ))}
          </nav>
          <div className="space-y-2">
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0F172A] sm:text-[32px]">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
        {children ?? actions ? (
          <div className="flex flex-wrap items-center gap-3 xl:justify-end">
            {children ?? actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
