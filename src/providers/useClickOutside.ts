import { RefObject, useContext, useEffect } from 'react';

import { ClickOutsideContext } from './ClickOutsideContext';

export const useClickOutside = (callback: () => void, containerRef: RefObject<HTMLDivElement>) => {
  const context = useContext(ClickOutsideContext);

  if (!context) {
    throw new Error('useClickOutside must be used within a ClickOutsideProvider');
  }

  const { ref } = context;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('되나??/');
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('here');
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, containerRef, callback]);
};
