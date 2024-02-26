import { useCallback, useState } from 'react';

const useForceRerender = () => {
  const [, updateState] = useState(1);
  return useCallback(() => updateState((prev) => prev + 1), []);
};

export default useForceRerender;
