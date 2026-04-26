'use client';

import { useState, useEffect } from 'react';
import { Select, Button, Input, ActionIcon, Badge } from 'rizzui';
import { PiChartLineUp, PiSpinnerGap, PiWarning, PiCheckCircle } from 'react-icons/pi';
import { 
  ForecastHorizon, 
  ForecastScenario, 
  FinancialUploadedFile, 
  ForecastReadiness 
} from '@/app/shared/financial/types';
import { getFinancialFiles, runForecast, getForecastReadiness } from '@/server/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const HORIZON_OPTIONS = [
  { label: 'Keyingi oy', value: 'NEXT_MONTH' },
  { label: 'Keyingi chorak', value: 'NEXT_QUARTER' },
  { label: 'Keyingi yil', value: 'NEXT_YEAR' },
  { label: 'Custom', value: 'CUSTOM' },
];

const SCENARIO_OPTIONS = [
  { label: 'Base (Odatdagidek)', value: 'BASE' },
  { label: 'Conservative (Ehtiyotkor)', value: 'CONSERVATIVE' },
  { label: 'Optimistic (Ijobiy)', value: 'OPTIMISTIC' },
];

export default function ForecastRunForm() {
  const router = useRouter();
  const [files, setFiles] = useState<FinancialUploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [horizon, setHorizon] = useState<string>('NEXT_MONTH');
  const [scenario, setScenario] = useState<string>('BASE');
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [running, setRunning] = useState(false);
  const [readiness, setReadiness] = useState<ForecastReadiness | null>(null);
  const [checkingReadiness, setCheckingReadiness] = useState(false);

  useEffect(() => {
    getFinancialFiles({ status: 'PARSED' })
      .then(setFiles)
      .finally(() => setLoadingFiles(false));
  }, []);

  useEffect(() => {
    if (selectedFile) {
      setCheckingReadiness(true);
      getForecastReadiness(selectedFile)
        .then(setReadiness)
        .catch(() => setReadiness(null))
        .finally(() => setCheckingReadiness(false));
    } else {
      setReadiness(null);
    }
  }, [selectedFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setRunning(true);
    try {
      const res = await runForecast({
        uploadId: selectedFile,
        horizon: horizon as ForecastHorizon,
        scenario: scenario as ForecastScenario,
      });
      toast.success('Prognoz muvaffaqiyatli yaratildi!');
      router.push(`/financial/forecasts/${res.id}`);
    } catch (err: any) {
      toast.error('Xatolik: ' + (err.response?.data?.message || err.message));
    } finally {
      setRunning(false);
    }
  };

  const fileOptions = files.map((f) => ({
    label: `${f.originalName} (${new Date(f.uploadedAt).toLocaleDateString()})`,
    value: f.id,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              label="Excel faylni tanlang"
              options={fileOptions}
              value={selectedFile}
              onChange={(val: any) => setSelectedFile(val)}
              placeholder={loadingFiles ? 'Yuklanmoqda...' : 'Fayl tanlang'}
              disabled={loadingFiles || running}
              className="md:col-span-2"
            />

            <Select
              label="Prognoz davri (Horizon)"
              options={HORIZON_OPTIONS}
              value={horizon}
              onChange={(val: any) => setHorizon(val)}
              disabled={running}
            />

            <Select
              label="Ssenariy"
              options={SCENARIO_OPTIONS}
              value={scenario}
              onChange={(val: any) => setScenario(val)}
              disabled={running}
            />
          </div>

          {readiness && (
            <div className={`rounded-xl border p-4 ${readiness.canForecast ? 'border-green-100 bg-green-50' : 'border-amber-100 bg-amber-50'}`}>
              <div className="flex items-start gap-3">
                {readiness.canForecast ? (
                  <PiCheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                ) : (
                  <PiWarning className="mt-0.5 h-5 w-5 text-amber-600" />
                )}
                <div className="space-y-1">
                  <p className={`text-sm font-semibold ${readiness.canForecast ? 'text-green-800' : 'text-amber-800'}`}>
                    {readiness.canForecast ? 'Prognoz uchun tayyor' : 'Ma’lumot yetarli emas'}
                  </p>
                  <p className={`text-xs ${readiness.canForecast ? 'text-green-700' : 'text-amber-700'}`}>
                    {readiness.canForecast 
                      ? `${readiness.historyPeriods} ta tarixiy davr aniqlandi (${readiness.dateCoverage.start} - ${readiness.dateCoverage.end})`
                      : readiness.reason || 'Kamida 3 ta davrga oid ma’lumotlar bo‘lishi kerak.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#112855] hover:bg-[#0B1E40]"
            disabled={!selectedFile || (readiness && !readiness.canForecast) || running || checkingReadiness}
          >
            {running ? (
              <span className="flex items-center gap-2">
                <PiSpinnerGap className="animate-spin" />
                Prognoz qilinmoqda...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PiChartLineUp className="h-4 w-4" />
                Prognoz yaratish
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
