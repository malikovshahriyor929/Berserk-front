import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiChartPieSlice,
  PiFileArrowDown,
  PiFileText,
  PiFiles,
  PiSparkleDuotone,
  PiUploadSimple,
} from 'react-icons/pi';

export type MenuItem = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: { name: string; href: string; badge?: string }[];
};

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItem[] = [
  { name: 'Moliyaviy hisobot' },

  {
    name: 'Overview',
    href: routes.financialReporting.dashboard,
    icon: <PiChartPieSlice />,
  },
  // label start
  // label end
  {
    name: 'Excel yuklash',
    href: routes.financialReporting.upload,
    icon: <PiUploadSimple />,
  },
  {
    name: 'Yuklangan fayllar',
    href: routes.financialReporting.files,
    icon: <PiFiles />,
  },
  {
    name: 'AI tahlillar',
    href: routes.financialReporting.analyses,
    icon: <PiSparkleDuotone />,
  },
  {
    name: 'Shablonlar',
    href: routes.financialReporting.templates,
    icon: <PiFileText />,
  },
  {
    name: 'PDF hisobotlar',
    href: routes.financialReporting.reports,
    icon: <PiFileArrowDown />,
  },
];
