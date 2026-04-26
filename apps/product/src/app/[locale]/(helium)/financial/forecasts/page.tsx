'use client';

import { useEffect, useState } from 'react';
import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ForecastRunForm from '@/app/shared/financial/forecast/ForecastRunForm';
import ForecastHistoryTable from '@/app/shared/financial/forecast/ForecastHistoryTable';
import { getForecasts } from '@/server/api';
import { ForecastRun } from '@/app/shared/financial/types';
import { PiChartLineUp } from 'react-icons/pi';

export default function ForecastsPage() {
  const [data, setData] = useState<ForecastRun[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const items = await getForecasts();
      setData(items);
    } catch (err) {
      console.error('Failed to fetch forecasts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-8">
      <FinancialPageHeader
        title="Moliyaviy prognoz"
        description="Yuklangan Excel fayllar tarixiy ma’lumotlari asosida kelajakdagi moliyaviy holatni bashorat qiling."
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { name: 'Prognozlar' },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <PiChartLineUp className="h-5 w-5 text-[#112855]" />
            <h2>Yangi prognoz</h2>
          </div>
          <ForecastRunForm />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Prognozlar tarixi</h2>
          </div>
          {loading ? (
            <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
          ) : (
            <ForecastHistoryTable data={data} onRefresh={fetchHistory} />
          )}
        </div>
      </div>
    </div>
  );
}
