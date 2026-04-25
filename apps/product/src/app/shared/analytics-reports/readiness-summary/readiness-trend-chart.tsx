'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { formatNumber } from '@core/utils/format-number';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', grade8: 60, grade10: 40, grade11: 58, grade12: 72 },
  { month: 'Feb', grade8: 63, grade10: 45, grade11: 61, grade12: 75 },
  { month: 'Mar', grade8: 66, grade10: 48, grade11: 64, grade12: 78 },
  { month: 'Apr', grade8: 68, grade10: 52, grade11: 66, grade12: 80 },
  { month: 'May', grade8: 70, grade10: 55, grade11: 69, grade12: 82 },
  { month: 'Jun', grade8: 72, grade10: 58, grade11: 71, grade12: 84 },
  { month: 'Jul', grade8: 73, grade10: 61, grade11: 73, grade12: 86 },
  { month: 'Aug', grade8: 74, grade10: 64, grade11: 75, grade12: 88 },
];



export default function ReadinessTrendChart({
  className,
}: {
  className?: string;
}) {
  return (
      <WidgetCard
          title="Readiness Trends by Grade"
          titleClassName="font-semibold text-gray-700 mb-2"
          className={className}
          description={
            <p className="text-sm text-gray-500">
              Average readiness progression over time by grade
            </p>
          }
      >
        <div className="h-80 w-full pt-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
              <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[40, 100]}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      return (
                          <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md">
                            <div className="mb-1 text-sm font-medium text-gray-900">{label}</div>
                            {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-1" style={{ color: entry.color }}>
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>
                          {{
                            grade8: 'Grade 8',
                            grade10: 'Grade 10',
                            grade11: 'Grade 11',
                            grade12: 'Grade 12'
                          }[entry.dataKey || "grade8"] ?? entry.dataKey}
                        </span>
                      </span>
                                  <span className="font-medium" style={{ color: entry.color }}>
                        {entry.value}%
                      </span>
                                </div>
                            ))}
                          </div>
                      );
                    }
                    return null;
                  }}
              />


              <Line
                  type="monotone"
                  dataKey="grade8"
                  stroke="#3872FA"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
              />
              <Line
                  type="monotone"
                  dataKey="grade10"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
              />
              <Line
                  type="monotone"
                  dataKey="grade11"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
              />
              <Line
                  type="monotone"
                  dataKey="grade12"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

  );
}
