'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { HiArrowUpTray, HiChartPie, HiDocumentChartBar, HiDocumentText, HiFolder, HiSparkles, HiPresentationChartLine } from 'react-icons/hi2';
import cn from '@core/utils/class-names';

const navItems = [
  { href: '/financial/dashboard', label: 'Dashboard', icon: HiChartPie },
  { href: '/financial/upload', label: 'Fayl yuklash', icon: HiArrowUpTray },
  { href: '/financial/files', label: 'Fayllar', icon: HiFolder },
  { href: '/financial/analyses', label: 'AI tahlillar', icon: HiSparkles },
  { href: '/financial/forecasts', label: 'Prognozlar', icon: HiPresentationChartLine },
  { href: '/financial/templates', label: 'Shablonlar', icon: HiDocumentChartBar },
  { href: '/financial/reports', label: 'Hisobotlar', icon: HiDocumentText },
];

type SidebarProps = {
  className?: string;
};

function normalizeLocale(locale: string | string[] | undefined) {
  if (Array.isArray(locale)) return locale[0] ?? 'en';
  return locale ?? 'en';
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = normalizeLocale(params.locale);

  return (
    <aside className={cn('w-[270px] border-r border-slate-200 bg-white', className)}>
      <div className="flex h-screen flex-col px-5 py-6">
        <Link href={`/${locale}/financial/dashboard`} className="flex items-center gap-3 px-2">
          <Image src="/logo.png" alt="Berserk" width={38} height={38} className="rounded-xl" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Berserk</p>
            <p className="text-lg font-semibold text-slate-900">Financial Suite</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#112855] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
