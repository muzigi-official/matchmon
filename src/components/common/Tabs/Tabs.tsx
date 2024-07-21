import React, { ReactNode, useState, useEffect } from 'react';
import { TabContainer, TabButton, TabContentContainer } from './Tabs.styles';

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
    <React.Fragment>
      <TabContainer>
        {tabs.map(tab => (
          <TabButton key={tab.label} $isSelected={selectedTab === tab.label} onClick={() => handleTabClick(tab.label)}>
            {tab.label}
          </TabButton>
        ))}
        <TabContentContainer>{tabs.find(tab => tab.label === selectedTab)?.content}</TabContentContainer>
      </TabContainer>
    </React.Fragment>
  );
};

export default Tabs;
