import { ReactNode, useRef } from 'react';

import { ClickOutsideContext } from './ClickOutsideContext';

interface IClickOutsideProviderProps {
  children: ReactNode;
}

export const ClickOutsideProvider = ({ children }: IClickOutsideProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ClickOutsideContext.Provider value={{ ref }}>
      <div ref={ref}>{children}</div>
    </ClickOutsideContext.Provider>
  );
};
