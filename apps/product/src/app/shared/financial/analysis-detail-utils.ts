'use client';

import type { AiAnalysis, FinancialUploadedFile } from './types';

type LooseRecord = Record<string, unknown>;

export type DetailTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type DetailSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface DetailMetric {
  key: string;
  label: string;
  value: string;
  tone: DetailTone;
}

export interface DetailListItem {
  id: string;
  title: string;
  description?: string;
  recommendation?: string;
  severity?: DetailSeverity;
  meta?: string;
}

export interface DetailCategoryItem {
  id: string;
  category: string;
  type: string;
  count: string;
  total: string;
}

export interface DetailAttributeItem {
  id: string;
  attribute: string;
  currentValue: string;
  type: string;
  sheet: string;
  versionCount: string;
}

export interface ParsedAnalysisDetail {
  summary: string;
  metrics: DetailMetric[];
  warnings: DetailListItem[];
  recommendations: DetailListItem[];
  errors: DetailListItem[];
  risks: DetailListItem[];
  anomalies: DetailListItem[];
  categories: DetailCategoryItem[];
  attributes: DetailAttributeItem[];
  period: string;
  language: string;
}

function asRecord(value: unknown): LooseRecord | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as LooseRecord)
    : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function parseResultObject(analysis: AiAnalysis): LooseRecord | null {
  if (asRecord(analysis.resultJson)) {
    return analysis.resultJson as LooseRecord;
  }

  if (typeof analysis.resultText === 'string' && analysis.resultText.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(analysis.resultText) as unknown;
      return asRecord(parsed);
    } catch {
      return null;
    }
  }

  return null;
}

function readText(value: unknown): string | null {
  if (typeof value === 'string') {
    const normalized = value.replace(/\s+/g, ' ').trim();
    return normalized || null;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    const parts = value.map(readText).filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : null;
  }

  const record = asRecord(value);
  if (!record) return null;

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
    'issue',
    'risk',
    'category',
    'attribute',
    'attributeKey',
    'currentValueText',
    'currentValueRaw',
  ];

  for (const key of preferredKeys) {
    const nested = readText(record[key]);
    if (nested) return nested;
  }

  return null;
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string') {
    const sanitized = value.replace(/[^\d.-]/g, '');
    if (!sanitized) return null;
    const parsed = Number(sanitized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

export function formatDateTime(value?: string): string {
  if (!value) return '—';

  return new Date(value).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatBytes(size?: number): string {
  if (typeof size !== 'number' || !Number.isFinite(size)) return 'N/A';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function normalizeSeverity(value: unknown): DetailSeverity {
  const severity = readText(value)?.toLowerCase();

  if (severity === 'high' || severity === 'critical') return severity;
  if (severity === 'low') return 'low';
  return 'medium';
}

function formatNumber(value: unknown): string {
  const number = readNumber(value);
  if (number === null) return 'N/A';

  return new Intl.NumberFormat('uz-UZ', {
    maximumFractionDigits: 2,
  }).format(number);
}

function formatCurrency(value: unknown, currency?: string | null): string {
  const number = readNumber(value);
  if (number === null) return 'N/A';

  const formatted = new Intl.NumberFormat('uz-UZ', {
    maximumFractionDigits: 2,
  }).format(number);

  return currency ? `${formatted} ${currency}` : formatted;
}

function buildMetricItems(parsed: LooseRecord | null): DetailMetric[] {
  const metrics = asRecord(
    parsed?.metrics ?? parsed?.financialSummary ?? parsed?.summaryMetrics ?? parsed?.totals
  );
  const currency = readText(metrics?.currency ?? parsed?.currency ?? parsed?.currencyCode);

  const metricMap = [
    {
      key: 'income',
      label: 'Income total',
      value: formatCurrency(metrics?.incomeTotal ?? metrics?.income ?? metrics?.totalIncome, currency),
      tone: 'success' as DetailTone,
    },
    {
      key: 'expense',
      label: 'Expense total',
      value: formatCurrency(
        metrics?.expenseTotal ?? metrics?.expenses ?? metrics?.totalExpense,
        currency
      ),
      tone: 'neutral' as DetailTone,
    },
    {
      key: 'net',
      label: 'Net total',
      value: formatCurrency(metrics?.netTotal ?? metrics?.net ?? metrics?.netProfit, currency),
      tone:
        (readNumber(metrics?.netTotal ?? metrics?.net ?? metrics?.netProfit) ?? 0) < 0
          ? ('danger' as DetailTone)
          : ('success' as DetailTone),
    },
    {
      key: 'transactions',
      label: 'Transaction count',
      value: formatNumber(metrics?.transactionCount ?? metrics?.rowCount ?? metrics?.count),
      tone: 'info' as DetailTone,
    },
    {
      key: 'average',
      label: 'Average transaction',
      value: formatCurrency(
        metrics?.averageTransaction ?? metrics?.avgTransaction ?? metrics?.average,
        currency
      ),
      tone: 'neutral' as DetailTone,
    },
  ];

  return metricMap;
}

function cleanSummaryText(text: string | null | undefined): string | null {
  if (!text) return null;
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return null;
  if (normalized.startsWith('{') || normalized.startsWith('[')) return null;
  return normalized;
}

function extractSummary(analysis: AiAnalysis, parsed: LooseRecord | null): string {
  const summary =
    cleanSummaryText(readText(parsed?.summary)) ??
    cleanSummaryText(readText(parsed?.executiveSummary)) ??
    cleanSummaryText(readText(parsed?.overview)) ??
    cleanSummaryText(readText(parsed?.description)) ??
    cleanSummaryText(analysis.resultText);

  return (
    summary ??
    'Tahlil yakunlandi. Yuklangan moliyaviy fayl bo‘yicha qisqacha xulosa hali shakllantirilmagan.'
  );
}

function normalizeListItems(
  value: unknown,
  fallbackTitle: string,
  severity?: DetailSeverity
): DetailListItem[] {
  const items: DetailListItem[] = [];
  const source = asArray(value);

  for (let index = 0; index < source.length; index += 1) {
    const item = source[index];
    const record = asRecord(item);
    if (!record) {
      const text = readText(item);
      if (text) {
        items.push({
          id: `${fallbackTitle}-${index}`,
          title: text,
          severity,
        });
      }
      continue;
    }

    const title =
      readText(record.title) ??
      readText(record.name) ??
      readText(record.message) ??
      readText(record.issue) ??
      readText(record.category) ??
      `${fallbackTitle} ${index + 1}`;

    const description =
      readText(record.description) ??
      readText(record.summary) ??
      readText(record.details) ??
      readText(record.reason);

    const recommendation =
      readText(record.recommendation) ??
      readText(record.action) ??
      readText(record.nextStep);

    const metaParts = [
      readText(record.rowReference) ? `Qator: ${readText(record.rowReference)}` : null,
      readText(record.sheet) ? `Sheet: ${readText(record.sheet)}` : null,
      readText(record.code),
    ].filter(Boolean) as string[];

    items.push({
      id: `${fallbackTitle}-${index}-${title}`,
      title,
      description: description && description !== title ? description : undefined,
      recommendation: recommendation ?? undefined,
      severity: normalizeSeverity(record.severity ?? severity),
      meta: metaParts.length > 0 ? metaParts.join(' • ') : undefined,
    });
  }

  return items;
}

function normalizeRisks(value: unknown): DetailListItem[] {
  return normalizeListItems(value, 'Risk').map((item) => ({
    ...item,
    severity: item.severity ?? 'medium',
  }));
}

function normalizeAnomalies(value: unknown): DetailListItem[] {
  return normalizeListItems(value, 'Anomaliya').map((item) => ({
    ...item,
    severity: item.severity ?? 'medium',
  }));
}

function normalizeCategories(value: unknown): DetailCategoryItem[] {
  return asArray(value)
    .map((item, index) => {
      const record = asRecord(item);
      if (!record) return null;

      return {
        id: `category-${index}`,
        category: readText(record.category ?? record.name ?? record.label) ?? `Category ${index + 1}`,
        type: readText(record.type ?? record.kind) ?? 'unknown',
        count: formatNumber(record.count ?? record.transactionCount ?? record.itemsCount),
        total: formatNumber(record.total ?? record.amount ?? record.value),
      } satisfies DetailCategoryItem;
    })
    .filter((item): item is DetailCategoryItem => Boolean(item));
}

function normalizeAttributes(value: unknown): DetailAttributeItem[] {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        const record = asRecord(item);
        if (!record) return null;

        return {
          id: `attribute-${index}`,
          attribute:
            readText(record.attribute ?? record.label ?? record.attributeKey ?? record.name) ??
            `Attribute ${index + 1}`,
          currentValue:
            readText(
              record.currentValue ??
                record.currentValueText ??
                record.currentValueRaw ??
                record.value
            ) ?? 'N/A',
          type: readText(record.type ?? record.dataType) ?? 'unknown',
          sheet: readText(record.sheet ?? record.sheetName) ?? '—',
          versionCount: formatNumber(record.versionCount ?? record.versions),
        } satisfies DetailAttributeItem;
      })
      .filter((item): item is DetailAttributeItem => Boolean(item));
  }

  const record = asRecord(value);
  if (!record) return [];

  return Object.entries(record).map(([key, item], index) => {
    const nested = asRecord(item);

    return {
      id: `attribute-map-${index}`,
      attribute: formatLabel(key),
      currentValue: readText(nested?.currentValue ?? nested?.value ?? item) ?? 'N/A',
      type: readText(nested?.type ?? nested?.dataType) ?? 'unknown',
      sheet: readText(nested?.sheet ?? nested?.sheetName) ?? '—',
      versionCount: formatNumber(nested?.versionCount ?? nested?.versions ?? 1),
    } satisfies DetailAttributeItem;
  });
}

export function parseAnalysisDetail(analysis: AiAnalysis): ParsedAnalysisDetail {
  const parsed = parseResultObject(analysis);
  const anomalies = normalizeAnomalies(parsed?.anomalies ?? parsed?.dataQualityIssues);
  const explicitWarnings = normalizeListItems(parsed?.warnings, 'Ogohlantirish', 'medium');
  const explicitErrors = normalizeListItems(parsed?.errors, 'Xatolik', 'high');

  const derivedWarnings =
    explicitWarnings.length > 0
      ? explicitWarnings
      : anomalies.filter((item) => item.severity === 'medium');
  const derivedErrors =
    explicitErrors.length > 0
      ? explicitErrors
      : anomalies.filter((item) => item.severity === 'high' || item.severity === 'critical');

  return {
    summary: extractSummary(analysis, parsed),
    metrics: buildMetricItems(parsed),
    warnings: derivedWarnings,
    recommendations: normalizeListItems(
      parsed?.recommendations ?? parsed?.actionItems,
      'Tavsiya',
      'low'
    ),
    errors: derivedErrors,
    risks: normalizeRisks(parsed?.risks ?? parsed?.riskFactors),
    anomalies,
    categories: normalizeCategories(parsed?.categories ?? parsed?.breakdown),
    attributes: normalizeAttributes(
      parsed?.attributes ?? parsed?.attributeSummary ?? parsed?.detectedAttributes
    ),
    period: readText(parsed?.period ?? parsed?.reportingPeriod) ?? 'N/A',
    language: readText(parsed?.language ?? parsed?.locale) ?? 'N/A',
  };
}

export function getFileChips(file: FinancialUploadedFile | null, detail: ParsedAnalysisDetail) {
  return [
    {
      label: 'Original file',
      value: file?.originalName ?? 'N/A',
    },
    {
      label: 'Size',
      value: formatBytes(file?.sizeBytes),
    },
    {
      label: 'Period',
      value: detail.period,
    },
    {
      label: 'Language',
      value: detail.language,
    },
  ];
}
