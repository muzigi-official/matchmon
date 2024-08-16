import { ReactNode } from 'react';
import { ClickOutsideProvider } from './ClickOutsideProvider';

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <ClickOutsideProvider>
      {/* 다른 Provider들을 여기에 추가... */}
      {children}
    </ClickOutsideProvider>
  );
};

export default Providers;
