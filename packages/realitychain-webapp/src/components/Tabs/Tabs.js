import React, {useState, useEffect} from 'react';

import {TabList} from './TabList';
import {TabPanel} from './TabPanel';
import {useStyles} from './Tabs.styles';

export const TabsComponent = (props) => {
  const {
    tabs,
    selected,
    position,
    mark = 'underline',
    size = 'medium',
    onChangeTab,
    padding,
    paddingRight,
    paddingLeft,
  } = props;

  const styles = useStyles({position, mark, size});

  const [selectedTab, setSelectedTab] = useState(selected);

  useEffect(() => {
    setSelectedTab(selected);
  }, [selected]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onChangeTab(tab);
  };

  return (
    <div>
      <TabList {...props} onChangeTab={handleTabChange} className={styles.tabs} />

      {tabs.map(tab => {
        return tab.id === selectedTab ? (
          <TabPanel
            key={`tab-panel-${tab.id}`}
            value={selectedTab}
            index={tab.id}
            padding={padding}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}>
            {tab.component}
          </TabPanel>
        ) : null;
      })}
    </div>
  );
};
