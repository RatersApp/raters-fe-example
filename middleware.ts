import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { languageCodes } from './common/config/strings';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  const userLang = req.cookies.get('userLang')?.value;
  const locale =
    !userLang || !Object.keys(languageCodes).includes(userLang)
      ? 'default'
      : userLang;
  if (locale && req.nextUrl.locale !== locale) {
    if (locale === 'default') {
      return NextResponse.redirect(
        new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/${locale}/${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url,
        ),
      );
    }
  }

  if (req.nextUrl.locale === 'en') {
    return NextResponse.redirect(
      new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }

  return;
}
