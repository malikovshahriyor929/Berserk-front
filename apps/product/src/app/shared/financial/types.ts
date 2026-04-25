export type DashboardRange = '1d' | '1w' | '1m' | '1y' | '10y';

export type UploadStatus =
  | 'UPLOADED'
  | 'PARSING'
  | 'PARSED'
  | 'ANALYZING'
  | 'ANALYZED'
  | 'PDF_GENERATED'
  | 'FAILED';

export type AiAnalysisStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';

export interface FinancialSheet {
  id: string;
  userId?: string;
  uploadId?: string;
  sheetName?: string;
  name?: string;
  rowCount?: number;
  columnCount?: number;
  detectedRange?: string;
  headerRowIndex?: number;
  headers?: string[];
  normalizedRows?: Record<string, unknown>[];
  rawRows?: unknown[][];
  createdAt?: string;
}

export interface AnalysisAttributeSnapshot {
  key: string;
  label: string;
  dataType: string;
  rowIndex?: number;
  sheetName?: string;
  currentValueRaw?: string | null;
  currentValueText?: string | null;
  currentValueNumber?: unknown;
  currentValueDate?: string | null;
  versionCount?: number;
}

export interface AnalysisInputSummary {
  sheets?: FinancialSheet[];
  attributes?: AnalysisAttributeSnapshot[];
  [key: string]: unknown;
}

export interface FinancialUploadedFile {
  id: string;
  originalName: string;
  storedName?: string;
  checksum?: string;
  mimeType?: string;
  extension?: string;
  sizeBytes: number;
  status: UploadStatus;
  errorMessage?: string;
  rawFilePath?: string | null;
  rawFileData?: string | null;
  analyzedAt?: string;
  uploadedAt: string;
  parsedAt?: string;
  _count?: {
    analyses?: number;
    reports?: number;
    sheets?: number;
    rows?: number;
    attributes?: number;
  };
  sheets?: FinancialSheet[];
  analyses?: AiAnalysis[];
  reports?: GeneratedReport[];
}

export interface AiAnalysis {
  id: string;
  userId?: string;
  uploadId: string;
  status: AiAnalysisStatus;
  modelName?: string;
  promptVersion?: string;
  inputSummary?: AnalysisInputSummary;
  requestPayload?: Record<string, unknown>;
  resultJson?: Record<string, unknown>;
  resultText?: string;
  tokenUsage?: Record<string, unknown>;
  attributes?: AnalysisAttributeSnapshot[];
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt?: string;
  upload?: FinancialUploadedFile;
}

export interface FinancialAttribute {
  id: string;
  attributeKey: string;
  label: string;
  dataType: string;
  currentValueRaw?: string;
  currentValueText?: string;
  currentValueNumber?: number;
  currentValueDate?: string;
  versionCount: number;
  sheetName?: string;
  rowIndex?: number;
}

export interface AttributeVersion {
  id: string;
  versionNo: number;
  isLatest: boolean;
  valueRaw?: string;
  valueText?: string;
  valueNumber?: number;
  valueDate?: string;
  valueHash: string;
  validFrom: string;
  validTo?: string;
}

export interface DashboardSummary {
  range: DashboardRange;
  totalUploads: number;
  totalReports: number;
  totalAttributes: number;
  totalAnalyses: number;
  latestUpload?: FinancialUploadedFile;
  latestAnalysis?: AiAnalysis;
  totals?: {
    income?: number;
    expense?: number;
    net?: number;
  };
  anomalies?: Array<{ key: string; description: string; severity?: string }>;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface DashboardCharts {
  range: DashboardRange;
  uploadsOverTime: TimeSeriesPoint[];
  reportsOverTime: TimeSeriesPoint[];
  financialTrend: Array<{
    date: string;
    income?: number;
    expense?: number;
    net?: number;
  }>;
  categories: Array<{ name: string; value: number }>;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  templateJson: Record<string, unknown>;
  htmlTemplate?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedReport {
  id: string;
  title: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  range?: DashboardRange;
  generatedAt: string;
  createdAt?: string;
  uploadId?: string;
  analysisId?: string;
  templateId?: string;
}

export interface GenerateReportPayload {
  templateId?: string;
  uploadId?: string;
  analysisId?: string;
  range?: DashboardRange;
  title?: string;
}

export interface CreateReportTemplatePayload {
  name: string;
  description?: string;
  templateJson: Record<string, unknown>;
  htmlTemplate?: string;
  isDefault?: boolean;
}
