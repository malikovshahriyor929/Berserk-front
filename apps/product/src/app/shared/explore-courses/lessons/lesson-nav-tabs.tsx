import { Button } from 'rizzui';
import { PiChartBar, PiBooks, PiQuestion, PiExam } from 'react-icons/pi';

interface LessonNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function LessonNavTabs({
  activeTab,
  onTabChange,
}: LessonNavTabsProps) {
  const tabs = [
    {
      id: 'progress',
      label: 'My progress',
      icon: <PiChartBar className="mr-2 h-5 w-5" />,
    },
    {
      id: 'tutorials',
      label: 'Tutorials',
      icon: <PiBooks className="mr-2 h-5 w-5" />,
    },
    {
      id: 'questions',
      label: 'Questions',
      icon: <PiQuestion className="mr-2 h-5 w-5" />,
    },
    {
      id: 'mock-exams',
      label: 'Mock exams',
      icon: <PiExam className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <div>
      <div className="mx-auto">
        <div className="no-scrollbar flex gap-1 overflow-x-auto px-1 py-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              size='sm'
              variant="text"
              className={`flex items-center md:px-5 md:py-3 whitespace-nowrap font-medium ${
                activeTab === tab.id
                  ? 'ring-1 ring-inset ring-mainBlue bg-mainBlue text-white hover:text-white'
                  : 'text-gray-700 hover:ring-1 hover:ring-mainBlue hover:text-mainBlue'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
