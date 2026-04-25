import { createId } from '@paralleldrive/cuid2';
import SuitcaseIcon from '@core/components/icons/suit-case';
import CheckCircleIcon from '@core/components/icons/check-circle';
import HourGlassRoundIcon from '@core/components/icons/hour-glass-round';
import StackIcon from '@core/components/icons/stack';
import { IconType } from 'react-icons/lib';

export const projectStatData: StatType[] = [
  {
    title: 'Total Tasks',
    amount: 128,
    increased: true,
    percentage: '12.3',
    icon: SuitcaseIcon,
  },
  {
    title: 'Completed Tasks',
    amount: 92,
    increased: true,
    percentage: '9.8',
    icon: CheckCircleIcon,
  },
  {
    title: 'In Progress',
    amount: 23,
    increased: true,
    percentage: '4.2',
    icon: HourGlassRoundIcon,
  },
  {
    title: 'Pending Review',
    amount: 13,
    increased: false,
    percentage: '2.5',
    icon: StackIcon,
  },
];

export const projectStatViewOptions = [
  {
    label: 'Last Day',
    value: 'last-day',
  },
  {
    label: 'Last 7 Days',
    value: 'last-seven-days',
  },
  {
    label: 'Last 30 Days',
    value: 'last-thirty-days',
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: number;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

type OverAllProgressDataDataType = {
  name: string;
  color: string;
  percentage: number;
  count: number;
};

export const overAllProgressData = [
  { name: 'Completed', percentage: 71.9, color: '#65BE58', count: 92 },
  { name: 'In Progress', percentage: 18.0, color: '#FF712F', count: 23 },
  { name: 'Pending Review', percentage: 10.1, color: '#666666', count: 13 },
];

export const overAllProgressViewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export const activitiesData = [
  { label: 'IELTS Prep', completed: 40, inProgress: 10 },
  { label: 'SAT Prep', completed: 25, inProgress: 15 },
  { label: 'Personal Statement', completed: 15, inProgress: 8 },
  { label: 'Application Forms', completed: 12, inProgress: 5 },
];

export const activitiesStatus = [
  { name: 'Completed' },
  { name: 'In Progress' },
];

export const ACTIVITIES_COLORS = ['#3AA6B9', '#365486'];

export const clientList = [
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Dilnoza Karimova',
    address: 'Toshkent',
    workType: 'IELTS + Common App',
    workProgress: 92,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    name: 'Javohir Islomov',
    address: 'Andijon',
    workType: 'SAT + Financial Aid',
    workProgress: 80,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: 'Malika Ergasheva',
    address: 'Namangan',
    workType: 'IELTS + Essay Prep',
    workProgress: 68,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    name: 'Sardor Tursunov',
    address: 'Samarqand',
    workType: 'SAT + Statement',
    workProgress: 100,
  },
  {
    id: createId(),
    avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
    name: 'Ziyoda Abdullayeva',
    address: 'Xorazm',
    workType: 'Full Application Pack',
    workProgress: 88,
  },
];


export const projectStatisticsDailyData = [
  {
    label: 'Sat',
    completed: 9800,
    inProgress: 8000,
    active: 1800,
  },
  {
    label: 'Sun',
    completed: 8700,
    inProgress: 4900,
    active: 1600,
  },
  {
    label: 'Mon',
    completed: 5000,
    inProgress: 8600,
    active: 3200,
  },
  {
    label: 'Tue',
    completed: 4500,
    inProgress: 6800,
    active: 1200,
  },
  {
    label: 'Wed',
    completed: 2500,
    inProgress: 3800,
    active: 1000,
  },
  {
    label: 'Thu',
    completed: 8000,
    inProgress: 5900,
    active: 1200,
  },
  {
    label: 'Fri',
    completed: 8700,
    inProgress: 4800,
    active: 1600,
  },
];

export const projectStatisticsMonthlyData = [
  {
    label: 'Jan',
    completed: 5650,
    inProgress: 4540,
    active: 3200,
  },
  {
    label: 'Feb',
    completed: 1890,
    inProgress: 5510,
    active: 680,
  },
  {
    label: 'Mar',
    completed: 4300,
    inProgress: 3000,
    active: 1500,
  },
  {
    label: 'Apr',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
  {
    label: 'May',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
  {
    label: 'Jun',
    completed: 5710,
    inProgress: 5830,
    active: 2300,
  },
];

export const projectStatisticsTicketStatus = [
  { name: 'Completed' },
  { name: 'In Progress' },
  { name: 'Active' },
];

export const PROJECT_STATISTICS_COLORS = ['#112855', '#11886f', '#FC9D23'];

export const projectStatisticsViewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export const projectTaskData = [
  {
    title: 'Understanding the structure of Personal Statement',
  },
  {
    title: 'Working on the first draft of Personal Statement',
  },
  {
    title: 'Editing the first draft of Personal Statement',
  },
];

// project summary table data
export const projectSummaryData = [
  {
    id: createId(),
    project: 'Common App Essay Draft',
    manager: 'Ziyoda Karimova',
    dueData: 'Aug 15, 2024',
    assignedTo: 'Dilnoza Karimova',
    status: 'in progress',
    progress: 60,
  },
  {
    id: createId(),
    project: 'Collect Recommendation Letters',
    manager: 'Mirjalol Ergashev',
    dueData: 'Aug 20, 2024',
    assignedTo: 'Malika Ergasheva',
    status: 'not started',
    progress: 0,
  },
  {
    id: createId(),
    project: 'Submit TOEFL Results',
    manager: 'Ziyoda Karimova',
    dueData: 'Sep 01, 2024',
    assignedTo: 'Javohir Islomov',
    status: 'completed',
    progress: 100,
  },
];

export const projectRecentActivitiesData = [
  {
    id: createId(),
    title: 'Common App Submission',
    activity:
      'Aziza Yuldasheva uploaded recommendation letter to Stanford University',
    date: '1 hour ago',
  },
  {
    id: createId(),
    title: 'Personal Statement Draft',
    activity: 'Jahongir Karimov submitted a new draft to Yale University',
    date: '2 hours ago',
  },
  {
    id: createId(),
    title: 'Transcript Upload',
    activity: 'Dilshodbek Rakhimov uploaded transcript for Harvard University',
    date: '3 hours ago',
  },
  {
    id: createId(),
    title: 'Financial Aid Form',
    activity: 'Aziza Yuldasheva submitted FAFSA details to MIT',
    date: '4 hours ago',
  },
  {
    id: createId(),
    title: 'TOEFL Results',
    activity: 'Jahongir Karimov sent TOEFL scores to Columbia University',
    date: '5 hours ago',
  },
  {
    id: createId(),
    title: 'Transcript Upload',
    activity: 'Dilshodbek Rakhimov uploaded transcript for Harvard University',
    date: '6 hours ago',
  },
  {
    id: createId(),
    title: 'Financial Aid Form',
    activity: 'Aziza Yuldasheva submitted FAFSA details to MIT',
    date: '7 hours ago',
  },
  {
    id: createId(),
    title: 'Common App Submission',
    activity: 'Jahongir Karimov finalized application for Yale University',
    date: '8 hours ago',
  },
  {
    id: createId(),
    title: 'Common App Submission',
    activity:
      'Dilshodbek Rakhimov submitted application to Stanford University',
    date: '9 hours ago',
  },
  {
    id: createId(),
    title: 'Financial Aid Form',
    activity: 'Aziza Yuldasheva uploaded CSS Profile for Columbia University',
    date: '10 hours ago',
  },
  {
    id: createId(),
    title: 'TOEFL Results',
    activity: 'Jahongir Karimov sent TOEFL scores to Columbia University',
    date: '11 hours ago',
  },
  {
    id: createId(),
    title: 'Transcript Upload',
    activity: 'Dilshodbek Rakhimov uploaded transcript for Harvard University',
    date: '12 hours ago',
  },
  {
    id: createId(),
    title: 'Financial Aid Form',
    activity: 'Aziza Yuldasheva submitted FAFSA details to MIT',
    date: '13 hours ago',
  },
  {
    id: createId(),
    title: 'Common App Submission',
    activity: 'Jahongir Karimov submitted application to Yale University',
    date: '14 hours ago',
  },
  {
    id: createId(),
    title: 'Common App Submission',
    activity: 'Dilshodbek Rakhimov applied to Stanford University',
    date: '15 hours ago',
  },
  {
    id: createId(),
    title: 'Financial Aid Form',
    activity: 'Aziza Yuldasheva uploaded CSS Profile for Columbia University',
    date: '16 hours ago',
  },
  {
    id: createId(),
    title: 'TOEFL Results',
    activity: 'Jahongir Karimov sent TOEFL scores to Columbia University',
    date: '17 hours ago',
  },
];


export const activeTasksData = [
  {
    title: 'College List',
    start: 1,
    end: 3,
  },
  {
    title: 'Personal Statement',
    start: 3,
    end: 5,
  },
  {
    title: 'Certificates',
    start: 5,
    end: 7,
  },
  {
    title: 'Portfolio',
    start: 7,
    end: 9,
  },
  {
    title: 'Applying',
    start: 9,
    end: 10,
  },
];

export const activeTaskMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const activeTaskViewOptions = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Month',
    value: 'month',
  },
];
