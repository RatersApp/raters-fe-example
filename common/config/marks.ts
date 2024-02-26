import { YEAR } from './strings';
import dayjs from 'dayjs';

const releaseDateMarks = [
  {
    value: 1940,
  },
  {
    value: 1950,
  },
  {
    value: 1960,
  },
  {
    value: 1970,
  },
  {
    value: 1980,
  },
  {
    value: 1990,
  },
  {
    value: 2000,
  },
  {
    value: 2010,
  },
  {
    value: dayjs().format(YEAR),
  },
];

const durationMarks = [
  {
    value: 0,
  },
  {
    value: 15,
  },
  {
    value: 30,
  },
  {
    value: 60,
  },
  {
    value: 90,
  },
  {
    value: 120,
  },
  {
    value: 150,
  },
  {
    value: 180,
  },
  {
    value: 210,
  },
];

export default {
  releaseDateMarks,
  durationMarks,
};
