import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const useCreatePortalInBody = (ElemTag) => {
  const wrapperRef = useRef(null);
  if (wrapperRef.current === null && typeof document !== 'undefined') {
    const elem = document.createElement(ElemTag);
    elem.setAttribute('data-body-portal', '');
    wrapperRef.current = elem;
  }
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || typeof document === 'undefined') {
      return;
    }
    document.body.appendChild(wrapper);
    // eslint-disable-next-line consistent-return
    return () => {
      document.body.removeChild(wrapper);
    };
  }, []);
  return (children) =>
    wrapperRef.current && createPortal(children, wrapperRef.current);
};

export default useCreatePortalInBody;
