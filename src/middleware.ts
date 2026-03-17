import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // We match all pathnames except for /api, /_next, etc.
    matcher: ['/', '/(en|zh|th)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
