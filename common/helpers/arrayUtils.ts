import { NOT_AVAILABLE } from '../config/strings';

export const switchGenreCheckedStatus = (status, genres, id) => {
  return genres.map((genre) =>
    genre.id === id ? { ...genre, isChecked: status } : genre,
  );
};

export const switchTypeCheckedStatus = (status, types, id) => {
  return types.map((type) =>
    type.id === id
      ? { ...type, isChecked: status }
      : { ...type, isChecked: !status },
  );
};

export const findRatingObj = (array, source) => {
  return array
    ? array.filter((rating) => rating.Source === source)[0]?.Value ||
        NOT_AVAILABLE
    : NOT_AVAILABLE;
};

export const getArrayOfYears = (startYear) => {
  const currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years.map((year) => {
    return {
      year,
      count: 0,
    };
  });
};

export function mergeArraysOfObjects(...args) {
  const hash = {};
  for (let l = 0; l < args.length; l++) {
    const arr = args[l];
    if (!arr.length) continue;
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      if (!('year' in el) || el['year'] === null) continue;
      const year = el.year;
      if (!hash[year]) hash[year] = {};
      for (const key in el) {
        if (el.hasOwnProperty(key)) hash[year][key] = el[key];
      }
    }
  }
  const result = [];
  for (const id in hash) {
    if (hash.hasOwnProperty(id)) result.push(hash[id]);
  }

  return result;
}
