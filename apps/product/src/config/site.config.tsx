import { Metadata } from 'next';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Prezident Iqtidorli Farzandlari',
  description: `Platform that unites talented young people, their interaction, exchange of experience and intellectual potential, creating an effective environment for the development of the country's youth.`,
  logo: '/logo-tashabbus-blue.png',
  icon: '/logo-tashabbus.png',
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
      ? `${title} - Prezident Iqtidorli Farzandlari`
      : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Prezident Iqtidorli Farzandlari` : title,
      description,
      url: 'https://milliy-advisor.vercel.app/',
      siteName: 'Prezident Iqtidorli Farzandlari', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '/logo-tashabbus-blue.png',
        alt: 'Prezident Iqtidorli Farzandlari Logo',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
