import { useEffect, useState } from 'react';

const usePreloadFallback = (...fallbackList) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const srcSet = fallbackList.map((item) => {
      const img = new Image();
      img.src = item;
      return img;
    });

    setItems([...srcSet]);
  }, []);

  return items;
};

export default usePreloadFallback;
