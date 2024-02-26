import { useRef } from 'react';

export const useLastError = <T>(errors: T[]) => {
  const lastErrors = useRef(errors);
  const error = useRef<T>();
  errors.forEach((el, i) => {
    if (lastErrors.current[i] != el && el) {
      error.current = el;
    }
  });
  lastErrors.current = errors;

  return error.current;
};
