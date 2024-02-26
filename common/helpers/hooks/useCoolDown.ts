import { useCallback, useEffect, useState } from 'react';

export const useCoolDown = ({
  initialCoolDowned = true,
  coolDown,
  onClick,
}: {
  coolDown: number;
  onClick: (...args: unknown[]) => void;
  initialCoolDowned?: boolean;
}) => {
  const [coolDownTime, setCoolDown] = useState(
    initialCoolDowned ? coolDown : 0,
  );
  const coolDownedClick = useCallback(
    (...args: unknown[]) => {
      setCoolDown(coolDown);
      onClick(...args);
    },
    [coolDown, onClick],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCoolDown((currentTime) => {
        if (currentTime != 0) {
          return Math.max(currentTime - 1, 0);
        } else {
          return currentTime;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return [coolDownTime, coolDownedClick] as const;
};
