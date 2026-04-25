'use client';

import type { ReactNode } from 'react';
import type { AiAnalysis } from './types';
import {
  PiChartBar,
  PiCheckCircle,
  PiInfo,
  PiLightbulb,
  PiWarning,
  PiWarningCircle,
} from 'react-icons/pi';

type LooseRecord = Record<string, unknown>;

type MetricItem = {
  label: string;
  value: string;
  tone: string;
  wide?: boolean;
};

function parseResult(analysis: AiAnalysis): LooseRecord | null {
  if (analysis.resultJson && typeof analysis.resultJson === 'object') {
    return analysis.resultJson as LooseRecord;
  }

  if (typeof analysis.resultText === 'string' && analysis.resultText.trim().startsWith('{')) {
    try {
      return JSON.parse(analysis.resultText) as LooseRecord;
    } catch {
      return null;
    }
  }

  return null;
}

function formatNumber(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value.toLocaleString('en-US');
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/,/g, ''));
    if (Number.isFinite(parsed)) {
      return parsed.toLocaleString('en-US');
    }
    return value;
  }

  return 'N/A';
}

function formatCurrency(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/,/g, ''));
    if (Number.isFinite(parsed)) {
      return `$${parsed.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    }
  }

  return 'N/A';
}

function formatLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function readText(value: unknown): string | null {
  if (typeof value === 'string') {
    const text = value.trim();
    return text || null;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    const joined = value.map(readText).filter(Boolean).join(', ');
    return joined || null;
  }

  if (value && typeof value === 'object') {
    const object = value as LooseRecord;
    const preferredKeys = [
      'title',
      'name',
      'label',
      'summary',
      'description',
      'message',
      'text',
      'value',
      'recommendation',
      'risk',
      'issue',
      'category',
      'type',
    ];

    for (const key of preferredKeys) {
      const nested = readText(object[key]);
      if (nested) return nested;
    }
  }

  return null;
}

function cleanParagraph(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return 'Tahlil natijasi mavjud emas.';
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return 'Tahlil yakunlandi, lekin qisqacha xulosa shakllantirilmadi.';
  }
  return trimmed.replace(/\s+/g, ' ');
}

function extractSummary(analysis: AiAnalysis, parsed: LooseRecord | null): string {
  const candidate =
    readText(parsed?.summary) ??
    readText(parsed?.executiveSummary) ??
    readText(parsed?.overview) ??
    readText(parsed?.description) ??
    (analysis.resultText ? cleanParagraph(analysis.resultText) : null);

  return candidate ?? 'Tahlil yakunlandi. Ushbu yuklangan fayl bo‘yicha qisqacha xulosa mavjud emas.';
}

function extractMetrics(parsed: LooseRecord | null): MetricItem[] {
  const metrics = (parsed?.metrics ?? parsed?.financialSummary ?? parsed?.summaryMetrics ?? {}) as LooseRecord;

  return [
    { label: 'Income total', value: formatCurrency(metrics.incomeTotal), tone: 'text-[#112855]' },
    { label: 'Expense total', value: formatCurrency(metrics.expenseTotal), tone: 'text-[#111827]' },
    { label: 'Net total', value: formatCurrency(metrics.netTotal ?? metrics.netProfit), tone: 'text-[#10b981]' },
    { label: 'Transaction count', value: formatNumber(metrics.transactionCount ?? metrics.rowCount), tone: 'text-[#111827]' },
    { label: 'Average transaction', value: formatCurrency(metrics.averageTransaction), tone: 'text-[#111827]', wide: true },
  ];
}

function normalizeItems(value: unknown): LooseRecord[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is LooseRecord => Boolean(item) && typeof item === 'object');
}

function normalizeWarning(item: LooseRecord): string {
  return (
    readText(item.title) ??
    readText(item.description) ??
    readText(item.message) ??
    readText(item.issue) ??
    'Qo‘shimcha izoh mavjud emas.'
  );
}

function normalizeSeverity(severity: unknown): string {
  const value = readText(severity)?.toLowerCase();
  if (!value) return 'medium';
  if (['low', 'medium', 'high', 'critical'].includes(value)) return value;
  return 'medium';
}

function severityClasses(severity: string): string {
  if (severity === 'high' || severity === 'critical') return 'bg-red-50 text-red-700 border-red-200';
  if (severity === 'low') return 'bg-green-50 text-green-700 border-green-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
}

function EmptyBlock({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d9e2f1] bg-[#f8fafc] px-5 py-4 text-sm text-[#64748b]">
      {text}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  children,
  tone = 'default',
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  tone?: 'default' | 'warning';
}) {
  const toneClasses = tone === 'warning' ? 'border-[#f7d8a8] bg-white' : 'border-[#e2e8f0] bg-white';

  return (
    <section className={`rounded-[24px] border ${toneClasses} p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]`}>
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`rounded-2xl border p-3 ${tone === 'warning' ? 'border-[#fde7ba] bg-[#fff7e8] text-[#d97706]' : 'border-[#e2e8f0] bg-[#f8fafc] text-[#112855]'}`}
        >
          {icon}
        </div>
        <h2
          className={`text-[20px] font-semibold tracking-[-0.02em] ${tone === 'warning' ? 'text-[#c25f08]' : 'text-[#0f172a]'}`}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function AnalysisResultView({ analysis }: { analysis: AiAnalysis }) {
  const parsed = parseResult(analysis);
  const summary = extractSummary(analysis, parsed);
  const metrics = extractMetrics(parsed);
  const anomalies = normalizeItems(parsed?.anomalies ?? parsed?.warnings ?? parsed?.dataQualityIssues);
  const risks = normalizeItems(parsed?.risks ?? parsed?.riskFactors);
  const recommendations = normalizeItems(parsed?.recommendations ?? parsed?.actionItems);
  const categories = normalizeItems(parsed?.categories ?? parsed?.breakdown);

  if (analysis.status === 'FAILED') {
    return (
      <SectionCard icon={<PiWarningCircle className="text-[22px]" />} title="Tahlil muvaffaqiyatsiz tugadi" tone="warning">
        <p className="text-sm leading-7 text-[#9a3412]">
          {analysis.errorMessage ?? 'AI tahlil yakunlanmadi. Qayta urinish tavsiya etiladi.'}
        </p>
      </SectionCard>
    );
  }

  if (analysis.status === 'PENDING' || analysis.status === 'RUNNING') {
    return (
      <SectionCard icon={<PiInfo className="text-[22px]" />} title="Tahlil davom etmoqda">
        <p className="text-sm leading-7 text-[#64748b]">
          AI tahlil hali yakunlanmagan. Natijalar tayyor bo‘lgach ushbu bo‘lim avtomatik to‘ldiriladi.
        </p>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard icon={<PiCheckCircle className="text-[22px]" />} title="Qisqacha xulosa">
        <p className="max-w-3xl text-[15px] leading-9 text-[#475569]">{summary}</p>
      </SectionCard>

      <SectionCard icon={<PiChartBar className="text-[22px]" />} title="Asosiy ko‘rsatkichlar">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`rounded-[20px] border border-[#e2e8f0] bg-[#f1f5f9] p-5 shadow-sm ${metric.wide ? 'xl:col-span-2' : ''}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                {metric.label}
              </p>
              <p className={`mt-3 text-[20px] font-bold tracking-[-0.03em] ${metric.tone}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={<PiWarning className="text-[22px]" />} title="Ogohlantirishlar" tone="warning">
        {anomalies.length > 0 ? (
          <div className="space-y-3">
            {anomalies.map((item, index) => {
              const severity = normalizeSeverity(item.severity);
              return (
                <div
                  key={`${index}-${normalizeWarning(item)}`}
                  className="rounded-[18px] border border-[#fde7ba] bg-[#fff7e8] px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <PiWarning className="mt-0.5 shrink-0 text-[18px] text-[#f59e0b]" />
                      <div>
                        <p className="text-sm font-medium leading-7 text-[#c25f08]">{normalizeWarning(item)}</p>
                        {readText(item.rowReference) && (
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#d97706]">
                            Row: {readText(item.rowReference)}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${severityClasses(severity)}`}
                    >
                      {formatLabel(severity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyBlock text="Muhim ogohlantirishlar aniqlanmadi." />
        )}
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard icon={<PiInfo className="text-[22px]" />} title="Risklar">
          {risks.length > 0 ? (
            <div className="space-y-3">
              {risks.map((risk, index) => (
                <div
                  key={`${index}-${readText(risk.title) ?? index}`}
                  className="rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-4"
                >
                  <p className="text-sm font-semibold text-[#0f172a]">{readText(risk.title) ?? `Risk ${index + 1}`}</p>
                  <p className="mt-2 text-sm leading-7 text-[#475569]">
                    {readText(risk.description) ?? readText(risk.risk) ?? 'Izoh mavjud emas.'}
                  </p>
                  {readText(risk.recommendation) && (
                    <p className="mt-2 text-sm font-medium text-[#112855]">
                      Tavsiya: {readText(risk.recommendation)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyBlock text="Muhim risklar aniqlanmadi." />
          )}
        </SectionCard>

        <SectionCard icon={<PiLightbulb className="text-[22px]" />} title="Tavsiyalar">
          {recommendations.length > 0 ? (
            <ol className="space-y-3">
              {recommendations.map((item, index) => (
                <li
                  key={`${index}-${readText(item.title) ?? index}`}
                  className="flex gap-3 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#112855] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-[#334155]">
                    {readText(item.description) ?? readText(item.text) ?? readText(item.action) ?? 'Tavsif mavjud emas.'}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyBlock text="Tavsiyalar mavjud emas." />
          )}
        </SectionCard>
      </div>

      {categories.length > 0 && (
        <SectionCard icon={<PiChartBar className="text-[22px]" />} title="Kategoriya kesimidagi natijalar">
          <div className="overflow-hidden rounded-[18px] border border-[#e2e8f0]">
            <div className="grid grid-cols-[1.5fr_0.9fr_0.7fr_1fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              <span>Category</span>
              <span>Type</span>
              <span>Count</span>
              <span className="text-right">Total</span>
            </div>
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={`${index}-${readText(category.name) ?? index}`}
                className="grid grid-cols-[1.5fr_0.9fr_0.7fr_1fr] border-t border-[#e2e8f0] px-4 py-3 text-sm text-[#334155]"
              >
                <span>{readText(category.name) ?? `Category ${index + 1}`}</span>
                <span>{formatLabel(readText(category.type) ?? 'unknown')}</span>
                <span>{formatNumber(category.count)}</span>
                <span className="text-right font-semibold text-[#112855]">
                  {formatCurrency(category.total ?? category.amount ?? category.value)}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
