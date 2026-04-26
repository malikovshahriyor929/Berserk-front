'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DashboardCharts as DashboardChartsType } from './types';

const PALETTE = ['#112855', '#2563EB', '#16A34A', '#D97706', '#DC2626', '#7C3AED'];

function numFmt(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg text-xs">
      <p className="mb-1 font-semibold text-gray-600">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-1.5" style={{ color: p.color }}>
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold">{numFmt(p.value)}</span>
        </p>
      ))}
    </div>
  );
};

function EmptyChart({ height = 220 }: { height?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400"
      style={{ height }}
    >
      Ma&apos;lumot mavjud emas
    </div>
  );
}

export default function DashboardCharts({ data }: { data: DashboardChartsType }) {
  const uploadsData = (data.uploadsOverTime ?? []).map((pt, i) => ({
    date: pt.date?.slice(0, 7) ?? '',
    Yuklamalar: pt.value,
    Hisobotlar: data.reportsOverTime?.[i]?.value ?? 0,
  }));

  const trendData = (data.financialTrend ?? []).filter(
    (pt) => pt.income || pt.expense || pt.net
  );

  const catData = (data.categories ?? []).filter((c) => c.value > 0);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Uploads & Reports */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-gray-800">Yuklamalar va hisobotlar</p>
        {uploadsData.length === 0 ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={uploadsData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradUpl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#112855" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#112855" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={numFmt} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Area type="monotone" dataKey="Yuklamalar" stroke="#112855" strokeWidth={2.5} fill="url(#gradUpl)" dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="Hisobotlar" stroke="#2563EB" strokeWidth={2.5} fill="url(#gradRep)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Financial trend */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-gray-800">Moliyaviy trend</p>
        {trendData.length === 0 ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height={220} >
            <BarChart data={trendData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={numFmt} className='pl-4' />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Bar dataKey="income" name="Kirim" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expense" name="Chiqim" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="net" name="Sof" fill="#112855" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Categories donut */}
      {catData.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <p className="mb-4 text-sm font-semibold text-gray-800">Daromad kategoriyalari</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={catData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {catData.map((_, index) => (
                  <Cell key={index} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}
