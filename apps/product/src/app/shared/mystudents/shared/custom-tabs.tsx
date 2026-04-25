import React, { useState } from 'react';
import cn from '@core/utils/class-names';

interface TabProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// Renamed to TabItem to avoid naming conflict
const TabItem: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};
TabItem.displayName = 'TabItem';

interface CustomTabsProps {
  children: React.ReactNode;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Create a properly typed array of tabs
  const childrenArray = React.Children.toArray(children);
  const tabs: React.ReactElement<TabProps>[] = [];

  // Manually filter and type check each child
  childrenArray.forEach((child) => {
    if (
      React.isValidElement(child) &&
      ((child.type as React.FC).displayName === 'TabItem' ||
        (child.type as any).name === 'TabItem')
    ) {
      tabs.push(child as React.ReactElement<TabProps>);
    }
  });

  return (
    <div>
      <div className="mb-1 flex overflow-x-auto border-b border-gray-200 dark:border-gray-300">
        {tabs.map((tab, index) => {
          const { label, icon } = tab.props;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium',
                index === activeTab
                  ? 'border-b-2 border-mainBlue text-mainBlue dark:border-sky-500 dark:text-sky-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {tabs[activeTab] && tabs[activeTab].props.children}
      </div>
    </div>
  );
};

export default CustomTabs;
export { TabItem as CustomTab }; // Export with the name CustomTab for backward compatibility
