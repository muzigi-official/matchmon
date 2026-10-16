import { createContext, RefObject } from 'react';

export interface IClickOutsideContextValue {
  ref: RefObject<HTMLDivElement>;
}

export const ClickOutsideContext = createContext<IClickOutsideContextValue | null>(null);
