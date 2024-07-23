import React, { createContext, ReactNode, useContext, useEffect, useRef } from 'react';

interface IClickOutsideContextValue {
  ref: React.RefObject<HTMLDivElement>;
}

interface IClickOutsideProviderProps {
  children: ReactNode;
}
const ClickOutsideContext = createContext<IClickOutsideContextValue | null>(null);

export const ClickOutsideProvider = ({ children }: IClickOutsideProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ClickOutsideContext.Provider value={{ ref }}>
      <div ref={ref}>{children}</div>
    </ClickOutsideContext.Provider>
  );
};

export const useClickOutside = (callback: () => void, containerRef: React.RefObject<HTMLDivElement>) => {
  const context = useContext(ClickOutsideContext);

  if (!context) {
    throw new Error('useClickOutside must be used within a ClickOutsideProvider');
  }

  const { ref } = context;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, containerRef, callback]);
};
