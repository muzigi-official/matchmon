import { useEffect, useRef, useContext, createContext, ReactNode, RefObject } from 'react';

interface ClickOutsideContextProps {
  ref: RefObject<HTMLUListElement>;
  handleClickOutside: (event: MouseEvent) => void;
}

const ClickOutsideContext = createContext<ClickOutsideContextProps | undefined>(undefined);

interface IClickOutsideProviderProps {
  onClickOutside: () => void;
  children: ReactNode;
}

export const ClickOutsideProvider = ({ onClickOutside, children }: IClickOutsideProviderProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return <ClickOutsideContext.Provider value={{ ref, handleClickOutside }}>{children}</ClickOutsideContext.Provider>;
};

export const useClickOutside = () => {
  const context = useContext(ClickOutsideContext);
  if (!context) {
    throw new Error('useClickOutside must be used within a ClickOutsideProvider');
  }
  return context;
};
