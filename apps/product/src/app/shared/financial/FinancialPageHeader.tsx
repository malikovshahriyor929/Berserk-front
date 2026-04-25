'use client';

import PageHeader from '@/app/shared/page-header';

interface FinancialPageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: { name: string; href?: string }[];
  children?: React.ReactNode;
}

export default function FinancialPageHeader({
  title,
  description,
  breadcrumb,
  children,
}: FinancialPageHeaderProps) {
  const crumbs = breadcrumb ?? [
    { href: '/', name: 'Bosh sahifa' },
    { name: 'Moliyaviy hisobot' },
    { name: title },
  ];

  return (
    <div className="mb-6">
      <PageHeader title={title} breadcrumb={crumbs}>
        {children}
      </PageHeader>
      {description && (
        <p className="-mt-3 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
