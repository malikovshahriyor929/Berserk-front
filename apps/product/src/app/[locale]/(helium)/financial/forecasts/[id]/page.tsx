'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PiArrowLeft, PiFilePdf, PiTrash } from 'react-icons/pi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button, ActionIcon, Title, Text } from 'rizzui';

import FinancialPageHeader from '@/app/shared/financial/FinancialPageHeader';
import ForecastTrendChart from '@/app/shared/financial/forecast/ForecastTrendChart';
import ForecastSummaryCard from '@/app/shared/financial/forecast/ForecastSummaryCard';
import ForecastMetricCards from '@/app/shared/financial/forecast/ForecastMetricCards';
import ForecastIssuesSection from '@/app/shared/financial/forecast/ForecastIssuesSection';
import LoadingState from '@/app/shared/financial/LoadingState';
import ErrorState from '@/app/shared/financial/ErrorState';

import { getForecast, deleteForecast, getApiErrorMessage } from '@/server/api';
import { ForecastRun } from '@/app/shared/financial/types';

export default function ForecastDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [forecast, setForecast] = useState<ForecastRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getForecast(id);
        setForecast(data);
        
        // If still running, poll
        if (data.status === 'RUNNING') {
          setTimeout(fetchData, 3000);
        }
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Ushbu prognozni o‘chirib tashlamoqchimisiz?')) return;
    setDeleting(true);
    try {
      await deleteForecast(id);
      toast.success('Prognoz o‘chirildi');
      router.push('/financial/forecasts');
    } catch (err) {
      toast.error('O‘chirishda xatolik');
      setDeleting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error || !forecast) return <ErrorState message={error || 'Prognoz topilmadi'} />;

  return (
    <div className="space-y-6 pb-10">
      <FinancialPageHeader
        title="Prognoz tafsilotlari"
        description={`${forecast.upload?.originalName || 'Fayl'} tahlili va kelajakdagi bashoratlar.`}
        breadcrumb={[
          { href: '/', name: 'Bosh sahifa' },
          { name: 'Moliyaviy hisobot' },
          { href: '/financial/forecasts', name: 'Prognozlar' },
          { name: 'Tafsilotlar' },
        ]}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/financial/forecasts"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#112855] transition-colors"
          >
            <PiArrowLeft />
            Orqaga
          </Link>
          <Button
            size="sm"
            variant="outline"
            color="danger"
            onClick={handleDelete}
            isLoading={deleting}
          >
            <PiTrash className="mr-1.5 h-4 w-4" />
            O&apos;chirish
          </Button>
        </div>
      </FinancialPageHeader>

      {forecast.status === 'RUNNING' ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-20 shadow-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#112855] border-t-transparent" />
          <Title as="h3" className="mt-6 text-lg font-semibold">AI prognoz tayyorlamoqda...</Title>
          <Text className="mt-2 text-gray-500 text-center max-w-sm">
            Ma’lumotlar tahlil qilinmoqda va Gemini 2.5 Pro yordamida moliyaviy bashoratlar shakllantirilmoqda. Iltimos kuting.
          </Text>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Metrics */}
          <ForecastMetricCards forecast={forecast} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Chart */}
            <div className="lg:col-span-2">
              <ForecastTrendChart forecast={forecast} />
            </div>

            {/* Summary */}
            <div>
              <ForecastSummaryCard forecast={forecast} />
            </div>
          </div>

          {/* Issues / Recommendations */}
          <ForecastIssuesSection forecast={forecast} />
        </div>
      )}
    </div>
  );
}
