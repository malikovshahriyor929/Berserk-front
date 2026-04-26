'use client';

import { ActionIcon } from 'rizzui/action-icon';
import cn from '@core/utils/class-names';
import ProfileMenu from '@/layouts/profile-menu';
import HamburgerButton from '@/layouts/hamburger-button';
import Logo from '@core/components/logo';
import { Link } from '@/i18n/routing';
import Sidebar from './helium-sidebar';
import StyledThemeSwitch from '../settings/theme-switcher';

function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-3">
      <StyledThemeSwitch />
      <ProfileMenu />
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-[990] flex items-center bg-mainBlue-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 xl:-ms-1.5 xl:pl-4 2xl:-ms-0 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={
            <Sidebar className="static w-full xl:p-0 2xl:w-full [&>div]:xl:rounded-none" />
          }
        />
        <Link
          href="/"
          aria-label="Site Logo"
          className="me-2 w-8 shrink-0 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>
      </div>
      <HeaderMenuRight />
    </header>
  );
}
