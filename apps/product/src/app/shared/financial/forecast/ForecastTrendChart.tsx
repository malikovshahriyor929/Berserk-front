'use client';

import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from 'recharts';
import { ForecastRun } from '@/app/shared/financial/types';

interface ForecastTrendChartProps {
  forecast: ForecastRun;
}

function numFmt(v: number) {
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

export default function ForecastTrendChart({ forecast }: ForecastTrendChartProps) {
  const historical = forecast.inputSummary?.detectedMetrics || [];
  const predicted = forecast.points || [];

  // Flatten and merge data for chart
  // This is a simplified version. Ideal would be a unified timeline.
  const chartData: any[] = [];

  // Add historical data (only from the first metric for now as an example, e.g., income)
  if (historical[0]?.series) {
    historical[0].series.forEach((s: any) => {
      chartData.push({
        period: s.period,
        value: s.value,
        type: 'Historical',
      });
    });
  }

  // Add predicted data
  predicted.forEach((p) => {
    chartData.push({
      period: p.period,
      predicted: p.predictedValue,
      lower: p.lowerBound,
      upper: p.upperBound,
      type: 'Forecast',
    });
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Trend va Prognoz</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#112855]" /> Tarixiy</div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2563EB]" /> Prognoz</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 11, fill: '#9CA3AF' }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#9CA3AF' }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={numFmt} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="value" name="Tarixiy" fill="#112855" radius={[4, 4, 0, 0]} maxBarSize={30} />
          <Line type="monotone" dataKey="predicted" name="Prognoz" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} />
          <Area type="monotone" dataKey="upper" fill="#2563EB" stroke="none" fillOpacity={0.1} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
