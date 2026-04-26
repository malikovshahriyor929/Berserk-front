'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import cn from '@core/utils/class-names';
import { Button } from 'rizzui/button';

const navItems = [
  { href: '/financial/dashboard', label: 'Dashboard' },
  { href: '/financial/upload', label: 'Yuklash' },
  { href: '/financial/files', label: 'Fayllar' },
  { href: '/financial/analyses', label: 'Tahlillar' },
  { href: '/financial/reports', label: 'Hisobotlar' },
];

function normalizeLocale(locale: string | string[] | undefined) {
  if (Array.isArray(locale)) return locale[0] ?? 'en';
  return locale ?? 'en';
}

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = normalizeLocale(params.locale);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur xl:hidden">
      <div className='flex items-start justify-between px-4 py-4 md:px-5 lg:px-6'>
        <div className="">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Berserk"
              width={34}
              height={34}
              className="rounded-xl"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Financial Suite
              </p>
              <p className="text-xs text-slate-500">Moliyaviy boshqaruv</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-[#112855] bg-[#112855] text-white'
                      : 'border-slate-200 bg-white text-slate-600'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Button onClick={() => signOut({ callbackUrl: '/en/auth/login' })}>
          Log out
        </Button>
      </div>
    </header>
  );
}
