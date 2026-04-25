'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@core/components/charts/custom-yaxis-tick';
import { Title } from 'rizzui';

const data = [
    { domain: 'IELTS/SAT Readiness', score: 78, color: '#F59E0B' },
    { domain: 'Academic Records', score: 84, color: '#10B981' },
    { domain: 'Portfolio Quality', score: 69, color: '#3872FA' },
    { domain: 'Motivation & Essays', score: 72, color: '#8B5CF6' },
    { domain: 'University Planning', score: 64, color: '#6366F1' },
];


export default function DomainPerformanceChart({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Readiness by Domain"
      titleClassName="font-semibold text-gray-700 mb-2"
      className={className}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="text-sm font-normal text-gray-500">
            Average rubric scores by domain across all students
          </Title>
        </div>
      }
    >
      <div className="h-80 w-full pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
            barSize={30}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis type="number" domain={[0, 100]} tickCount={6} />
            <YAxis
              dataKey="domain"
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{
                fill: '#6B7280',
                fontSize: 12,
              }}
            />
            <Tooltip
              cursor={false}
              content={(props) => {
                const { active, payload } = props;
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md">
                      <div className="text-sm text-gray-900">{data.domain}</div>
                      <div className="font-semibold text-gray-900">
                        Score: {data.score}%
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
