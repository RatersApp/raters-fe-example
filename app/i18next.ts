// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import type _default from '../public/locales/default/common.json';
import type en from '../public/locales/en/common.json';
import type ru from '../public/locales/ru/common.json';
import type it from '../public/locales/it/common.json';
import type az from '../public/locales/az/common.json';
import type de from '../public/locales/de/common.json';
import type es from '../public/locales/es/common.json';
import type fr from '../public/locales/fr/common.json';
import type pt from '../public/locales/pt/common.json';
import type tr from '../public/locales/tr/common.json';
import type uk from '../public/locales/uk/common.json';
import type { CustomTypeOptions } from 'i18next';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'default';
    // custom resources type
    resources: {
      default: typeof _default;
      en: typeof en;
      ru: typeof ru;
      it: typeof it;
      az: typeof az;
      de: typeof de;
      es: typeof es;
      fr: typeof fr;
      pt: typeof pt;
      tr: typeof tr;
      uk: typeof uk;
    };
  }
}

//check localization keys
type LocalesIntersection = typeof _default &
  typeof en &
  typeof ru &
  typeof it &
  typeof az &
  typeof de &
  typeof es &
  typeof fr &
  typeof pt &
  typeof tr &
  typeof uk;
type LocalesUnion =
  CustomTypeOptions['resources'][keyof CustomTypeOptions['resources']];

const LocalesReal: LocalesUnion = {} as LocalesIntersection;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocalesNeed: LocalesIntersection = LocalesReal;
