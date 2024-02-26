import dayjs from 'dayjs';
//todo init date lang by selected language
import en from 'dayjs/locale/en';
import ru from 'dayjs/locale/ru';
import de from 'dayjs/locale/de';
import az from 'dayjs/locale/az';
import it from 'dayjs/locale/it';
import tr from 'dayjs/locale/tr';
import uk from 'dayjs/locale/uk';
import fr from 'dayjs/locale/fr';
import pt from 'dayjs/locale/pt';
import ka from 'dayjs/locale/ka';
import es from 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { i18n } from 'next-i18next';

dayjs.extend(relativeTime);

dayjs.locale('en', {
  ...en,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
});

dayjs.locale('default', {
  ...en,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
});

dayjs.locale('ru', {
  ...ru,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 мин',
    m: '1 мин',
    mm: '%d мин',
    h: '1 ч',
    hh: '%d ч',
    d: '1 д',
    dd: '%d д',
    M: '1 м',
    MM: '%d м',
    y: '1 г',
    yy: '%d г',
  },
});

dayjs.locale('az', {
  ...az,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 d',
    m: '1 d',
    mm: '%d d',
    h: '1 s',
    hh: '%d s',
    d: '1 g',
    dd: '%d g',
    M: '1 ay',
    MM: '%d ay',
    y: '1 i',
    yy: '%d i',
  },
});

dayjs.locale('it', {
  ...it,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 o',
    hh: '%d o',
    d: '1 g',
    dd: '%d g',
    M: '1 m',
    MM: '%d m',
    y: '1 a',
    yy: '%d a',
  },
});

dayjs.locale('de', {
  ...de,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 s',
    hh: '%d s',
    d: '1 t',
    dd: '%d t',
    M: '1 m',
    MM: '%d m',
    y: '1 j',
    yy: '%d j',
  },
});

dayjs.locale('tr', {
  ...tr,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 d',
    mm: '%d d',
    h: '1 s',
    hh: '%d s',
    d: '1 g',
    dd: '%d g',
    M: '1 a',
    MM: '%d a',
    y: '1 y',
    yy: '%d y',
  },
});

dayjs.locale('uk', {
  ...uk,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 с',
    m: '1 х',
    mm: '%d х',
    h: '1 г',
    hh: '%d г',
    d: '1 д',
    dd: '%d д',
    M: '1 м',
    MM: '%d м',
    y: '1 р',
    yy: '%d р',
  },
});

dayjs.locale('fr', {
  ...fr,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 h',
    hh: '%d h',
    d: '1 j',
    dd: '%d j',
    M: '1 m',
    MM: '%d m',
    y: '1 a',
    yy: '%d a',
  },
});

dayjs.locale('pt', {
  ...pt,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 a',
    yy: '%d a',
  },
});

dayjs.locale('es', {
  ...es,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 s',
    m: '1 min',
    mm: '%d min',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 a',
    yy: '%d a',
  },
});

dayjs.locale('ka', {
  ...ka,
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 წ',
    m: '1 წუ',
    mm: '%d წუ',
    h: '1 ს',
    hh: '%d ს',
    d: '1 დ',
    dd: '%d დ',
    M: '1 თ',
    MM: '%d თ',
    y: '1 წე',
    yy: '%d წე',
  },
});

export const getDifferenceInDays = (endDate: string) =>
  dayjs(endDate).fromNow();
export const getShortDateFromTimeStamp = (
  timestamp: number,
  format: string,
  lang?: string,
) => {
  dayjs.locale(lang || i18n?.language);
  return dayjs(timestamp * 1000).format(format);
};
export const getAge = (timestamp: number) =>
  dayjs().diff(dayjs(timestamp * 1000), 'y');
export const getDate = (time: number, format: string, lang?: string) => {
  dayjs.locale(lang || i18n?.language);
  return dayjs(time).format(format);
};

export const numberToKFormat = (num: number) =>
  Math.abs(num) > 999
    ? `${Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1)}k`
    : (Math.sign(num) * Math.abs(num)).toString();
