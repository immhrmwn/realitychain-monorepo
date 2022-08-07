import React, {useState, useEffect} from 'react';

import {Tooltip} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import {useStyles} from './TabList.styles';

export const TabList = props => {
  const {
    tabs,
    selected,
    mark = 'underline',
    textColor = 'primary',
    size = 'medium',
    background,
    onChangeTab,
    ...tabsProps
  } = props;

  const styles = useStyles({mark, size, background});

  const [selectedTab, setSelectedTab] = useState(selected);

  useEffect(() => {
    setSelectedTab(selected);
  }, [selected]);

  const handleTabChange = (event, tab) => {
    setSelectedTab(tab);
    onChangeTab(tab);
  };

  return (
    <Tabs
      {...tabsProps}
      value={selectedTab}
      textColor={textColor}
      TabIndicatorProps={{
        className: styles.indicatorColor,
        children: <span className={styles.indicator} />,
      }}
      classes={{root: styles.tabs}}
      onChange={handleTabChange}>
      {tabs.map((tab, i) => {
        if (tab.tooltip) {
          return (
            <Tooltip
              key={`tab-${tab.id}`}
              title={<Typography component="span">{tab.tooltip}</Typography>}
              arrow>
              <span>
                <Tab
                  label={tab.title}
                  value={tab.id}
                  icon={tab.icon}
                  className={styles.tab}
                  disabled={tab.disabled}
                />
              </span>
            </Tooltip>
          );
        } else {
          return (
            <Tab
              key={`tab-${tab.id}`}
              label={tab.title}
              value={tab.id}
              icon={tab.icon}
              className={styles.tab}
              disabled={tab.disabled}
            />
          );
        }
      })}
    </Tabs>
  );
};
