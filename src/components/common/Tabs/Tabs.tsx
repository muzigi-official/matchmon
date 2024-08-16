import { ReactNode, useState, useEffect } from 'react';
import { TabsWrapper, TabButtonWrapper, TabContainer, TabButton, TabContentContainer } from './Tabs.styles';

interface ITab {
  label: string;
  content: ReactNode;
}

interface ITabsProps {
  tabs: ITab[];
  selectedTab?: string;
  onTabClick?: (label: string) => void;
}

const Tabs = ({ tabs, selectedTab: initialSelectedTab, onTabClick }: ITabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialSelectedTab || tabs[0]?.label);

  const handleTabClick = (label: string) => {
    setSelectedTab(label);
    if (onTabClick) {
      onTabClick(label);
    }
  };

  useEffect(() => {
    setSelectedTab(initialSelectedTab || tabs[0]?.label);
  }, [initialSelectedTab, tabs]);

  return (
    <TabsWrapper>
      <TabButtonWrapper>
        <TabContainer>
          {tabs.map(tab => (
            <TabButton
              key={tab.label}
              $isSelected={selectedTab === tab.label}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabContainer>
      </TabButtonWrapper>
      <TabContentContainer>{tabs.find(tab => tab.label === selectedTab)?.content}</TabContentContainer>
    </TabsWrapper>
  );
};

export default Tabs;
