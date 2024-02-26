import { useEffect } from 'react';

export const useIntersection = (selector: string, className: string) => {
  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      if (IntersectionObserver) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              entries[0].target.classList.add(className);
            }
          },
          { rootMargin: '0px 0px -50% 0px' },
        );

        observer.observe(element);

        return () => observer.disconnect();
      } else {
        element.classList.add(className);
      }
    }
    return () => {
      /**/
    };
  }, [className, selector]);
};
