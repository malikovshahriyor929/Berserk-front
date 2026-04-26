import { Metadata } from 'next';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'SQB',
  description: `Platform that unites talented young people, their interaction, exchange of experience and intellectual potential, creating an effective environment for the development of the country's youth.`,
  logo: '/logo.png',
  icon: '/logo.png',
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HELIUM,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title
      ? `${title} - SQB`
      : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - SQB` : title,
      description,
      url: 'https://milliy-advisor.vercel.app/',
      siteName: 'SQB', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '/logo.png',
        alt: 'SQB Logo',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
