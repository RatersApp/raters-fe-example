import { useCallback, useRef, useState } from 'react';

export function useDerivedState<V>(initialValue: V, deeps: unknown[]) {
  const ref = useRef({ deeps: deeps, value: initialValue }).current;
  const [, forceUpdate] = useState(0);

  const setValue = useCallback(
    (value: V | ((v: V) => V)) =>
      forceUpdate((count) => {
        const newValue = value instanceof Function ? value(ref.value) : value;
        if (ref.value != newValue) {
          ref.value = newValue;

          return count + 1;
        } else {
          return count;
        }
      }),
    [ref],
  );

  if (ref.deeps.some((item, index) => deeps[index] != item)) {
    ref.deeps = deeps;
    ref.value = initialValue;
  }

  return [ref.value, setValue] as const;
}
