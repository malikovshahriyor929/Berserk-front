'use client';

import MetricCard from '@core/components/cards/metric-card';
import TrendingDownIcon from '@core/components/icons/trending-down';
import TrendingUpIcon from '@core/components/icons/trending-up';
// import { getChartColorByValue } from '@core/components/table-utils/get-chart-color-by-engagement-rate';
import cn from '@core/utils/class-names';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Text } from 'rizzui';

interface ReadinessStatsCardsProps {
  className?: string;
}

const readinessStatData = [
  {
    id: 1,
    title: 'IELTS Readiness',
    metric: '74%',
    fill: '#3872FA',
    percentage: 6.5,
    increased: true,
    decreased: false,
    value: '+6.5',
    chart: generateChartData(68, 78),
  },
  {
    id: 2,
    title: 'SAT Readiness',
    metric: '69%',
    fill: '#10B981',
    percentage: 4.2,
    increased: true,
    decreased: false,
    value: '+4.2',
    chart: generateChartData(62, 72),
  },
  {
    id: 3,
    title: 'Portfolio Completion',
    metric: '83%',
    fill: '#F59E0B',
    percentage: 7.9,
    increased: true,
    decreased: false,
    value: '+7.9',
    chart: generateChartData(75, 88),
  },
  {
    id: 4,
    title: 'Application Readiness',
    metric: '66%',
    fill: '#6366F1',
    percentage: 2.2,
    increased: true,
    decreased: false,
    value: '+2.2',
    chart: generateChartData(62, 68),
  },
];

// Helper function to generate chart data with a trend
function generateChartData(start: number, end: number) {
  const data = [];
  const points = 20;
  const step = (end - start) / points;

  for (let i = 0; i < points; i++) {
    data.push({
      label: (i + 1).toString(),
      count: Math.round(start + step * i + (Math.random() * 10 - 5)),
    });
  }

  return data;
}

export default function ReadinessStatsCards({
  className,
}: ReadinessStatsCardsProps) {
  return (
    <div className="custom-scrollbar overflow-x-auto">
      <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @4xl:grid-cols-4 @7xl:col-span-12">
        {readinessStatData.map((stat) => {
          return (
            <MetricCard
              key={stat.id}
              title={stat.title}
              metric={stat.metric}
              chartClassName="w-44"
              metricClassName="3xl:text-[22px]"
              className={cn('w-full max-w-full justify-between', className)}
              chart={
                <div className="ms-auto h-12 w-full 4xl:h-9">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stat.chart}
                      margin={{
                        left: -30,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={`readinessDomain-${stat.id}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={stat.fill}
                            className="[stop-opacity:0.25] dark:[stop-opacity:0.2]"
                          />
                          <stop
                            offset="95%"
                            stopColor={stat.fill}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="bump"
                        dataKey="count"
                        stroke={stat.fill}
                        strokeWidth={1.8}
                        fillOpacity={1}
                        fill={`url(#readinessDomain-${stat.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              }
            >
              <Text className="mt-5 flex items-center leading-none text-gray-500">
                <Text
                  as="span"
                  className={cn(
                    'me-2 inline-flex items-center font-medium',
                    stat.increased ? 'text-green' : 'text-red'
                  )}
                >
                  {stat.increased ? (
                    <TrendingUpIcon className="me-1 h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="me-1 h-4 w-4" />
                  )}
                  {stat.value}%
                </Text>
                {stat.increased ? 'Improved' : 'Decreased'} this term
              </Text>
            </MetricCard>
          );
        })}
      </div>
    </div>
  );
}
