import { useEffect, useRef } from 'react';

export function useWindowSizeListener(
  listener: (width: number, height: number) => void,
  deeps?: unknown[],
) {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const emitSize = () =>
      listenerRef.current(window.innerWidth, window.innerHeight);
    emitSize();
    window.addEventListener('resize', emitSize);
    return () => window.removeEventListener('resize', emitSize);
  }, deeps || []);
}
