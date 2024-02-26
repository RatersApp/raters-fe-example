import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

type Effect = typeof useEffect;

export const useIsPersisted = () =>
  useSelector(
    (state: { _persist?: { rehydrated: boolean } }) =>
      !!state._persist?.rehydrated,
  );

export const usePersistedEffect: Effect = (effect, deps = []) => {
  const isRehydrated = useIsPersisted();
  useEffect(() => {
    if (isRehydrated) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRehydrated, ...deps]);
};

const onChange =
  (effector = useEffect) =>
  (callback: EffectCallback, deps: DependencyList = []) => {
    const lastDeps = useRef<DependencyList>();
    effector(() => {
      const prevDeps = lastDeps.current || deps;
      lastDeps.current = deps;
      if (deps.some((el, i) => el != prevDeps[i])) {
        return callback();
      }
    }, deps);
  };

export const useOnChange = onChange(useEffect);
export const usePersistedOnChange = onChange(usePersistedEffect);
