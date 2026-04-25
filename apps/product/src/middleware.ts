import { NextRequest } from 'next/server';
import withAuth from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';

// List of public pages (no auth required)
const publicPages = [
  '/auth/sign-in-1',
  '/auth/sign-up-1',
  '/auth/otp-1',
  '/auth/forgot-password-1',
];

// Create the Next-Intl middleware for handling i18n routing
const intlMiddleware = createMiddleware({
  ...routing,
});

// Auth middleware wraps intlMiddleware so that i18n works for both authed and public pages
const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      ...pagesOptions,
      signIn: '/auth/sign-in-1',
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)', // same as isomorphic-intl, matches all non-static, non-api routes
  ],
};
