'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import { IconType } from 'react-icons/lib';
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
  PiArrowDownRight,
  PiArrowUpRight,
  PiCrossFill,
  PiXFill,
  PiXBold,
} from 'react-icons/pi';

type AppointmentStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    title: 'Assigned Students',
    amount: '15',
    increased: true,
    percentage: '25.0',
    icon: PiCalendarCheck,
    iconWrapperFill: '#11886f',
  },
  {
    title: 'Completed Portfolio',
    amount: '11',
    increased: true,
    percentage: '37.5',
    icon: PiCheckCircle,
    iconWrapperFill: '#64CCC5',
  },
  {
    title: 'Ready to Apply',
    amount: '7',
    increased: true,
    percentage: '20.0',
    icon: PiClock,
    iconWrapperFill: '#FFD66B',
  },
  {
    title: 'Pending Documents',
    amount: '4',
    increased: false,
    percentage: '13.3',
    icon: PiXBold,
    iconWrapperFill: '#C50000',
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

export default function AppointmentStats({ className }: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8 [&::-webkit-scrollbar]:h-0"
        >
          <StatGrid />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function StatGrid() {
  return (
    <>
      {statData.map((stat: StatType, index: number) => {
        return (
          <StatCard
            key={'stat-card-' + index}
            transaction={stat}
            className="min-w-[300px]"
          />
        );
      })}
    </>
  );
}

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill } =
    transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-mainBlue/20 px-6 py-7 @container first:border-primary first:bg-primary dark:border-gray-200 dark:first:border-gray-200 dark:first:bg-gray-100',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <div
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 group-first:!bg-gray-0 group-first:text-primary dark:text-gray-900 dark:group-first:bg-gray-900')}
          style={{ backgroundColor: iconWrapperFill }}
        >
          <Icon className="h-auto w-[30px]" />
        </div>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-600 group-first:text-gray-100 dark:group-first:text-gray-800">
            {title}
          </p>
          <p className="text-lg font-bold text-mainBlue group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            increased ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 group-first:text-primary dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              increased
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {increased ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
          {increased ? 'Increased' : 'Decreased'}&nbsp;last year
        </span>
      </div>
    </div>
  );
}
