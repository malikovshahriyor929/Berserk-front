import { ApiOption, StudentLookup, UploadResult } from '@core/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import type {
  DashboardRange,
  DashboardSummary,
  DashboardCharts,
  FinancialUploadedFile,
  AiAnalysis,
  FinancialAttribute,
  AttributeVersion,
  ReportTemplate,
  GeneratedReport,
  GenerateReportPayload,
  CreateReportTemplatePayload,
} from '@/app/shared/financial/types';

// ===== Existing API (old backend) =====

export const baseURL =
  (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '') + '/en';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  timeout: 300_000,
});

export const axiosPublic = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 300_000,
});

export interface RetryableRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const session = await getSession();
      const token = (session?.user as any)?.accessToken;
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableRequest | undefined;
    const status = error.response?.status;

    if (
      status === 401 &&
      original &&
      !original._retry &&
      typeof window !== 'undefined'
    ) {
      original._retry = true;
      const newSession = await getSession();
      if ((newSession as any)?.error === 'RefreshAccessTokenError') {
        await signOut({ callbackUrl: '/auth/sign-in-1' });
        return Promise.reject(error);
      }
      const newToken = (newSession?.user as any)?.accessToken;
      if (newToken) {
        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      }
    }

    if (status === 401 && typeof window !== 'undefined') {
      await signOut({ callbackUrl: '/auth/sign-in-1' });
    }
    return Promise.reject(error);
  }
);

// ===== Berserk Financial API =====

const berserkBaseURL = (
  process.env.NEXT_PUBLIC_BERSERK_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ''
).replace(/\/+$/, '');

export const berserkApi = axios.create({
  baseURL: berserkBaseURL,
  withCredentials: false,
  timeout: 30_000,
});

export const berserkUploadApi = axios.create({
  baseURL: berserkBaseURL,
  withCredentials: false,
  timeout: 300_000,
});

export const berserkLongRunningApi = axios.create({
  baseURL: berserkBaseURL,
  withCredentials: false,
  timeout: 0,
});

function setupBerserkInterceptors(
  instance: ReturnType<typeof axios.create>
): void {
  instance.interceptors.request.use(
    async (config) => {
      if (typeof window !== 'undefined') {
        const session = await getSession();
        const token = (session?.user as any)?.accessToken;
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401 && typeof window !== 'undefined') {
        await signOut({ callbackUrl: '/auth/sign-in-1' });
      }
      return Promise.reject(error);
    }
  );
}

setupBerserkInterceptors(berserkApi);
setupBerserkInterceptors(berserkUploadApi);
setupBerserkInterceptors(berserkLongRunningApi);

// ---- response unwrap helper ----
function unwrapData<T>(res: { data: unknown }): T {
  const d = res.data as any;
  return (d?.data ?? d) as T;
}

// ---- error message helper ----
export function getApiErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const axErr = error as AxiosError<{ message?: string; error?: string }>;
    return (
      axErr.response?.data?.message ||
      axErr.response?.data?.error ||
      axErr.message ||
      'Xatolik yuz berdi'
    );
  }
  return 'Xatolik yuz berdi';
}

// ===== Files =====

export async function uploadFinancialFile(
  file: File
): Promise<FinancialUploadedFile> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await berserkUploadApi.post('/api/files/upload', fd);
  const d = res.data as any;
  // Backend returns { upload, stats } or { data: { upload, stats } }
  const inner = d?.data ?? d;
  return (inner?.upload ?? inner) as FinancialUploadedFile;
}

export async function getFinancialFiles(params?: {
  status?: string;
  search?: string;
}): Promise<FinancialUploadedFile[]> {
  const res = await berserkApi.get('/api/files', { params });
  return unwrapData<FinancialUploadedFile[]>(res);
}

export async function getFinancialFile(id: string): Promise<FinancialUploadedFile> {
  const res = await berserkApi.get(`/api/files/${id}`);
  return unwrapData<FinancialUploadedFile>(res);
}

export async function deleteFinancialFile(id: string): Promise<void> {
  await berserkApi.delete(`/api/files/${id}`);
}

// ===== Analyses =====

export async function runAnalysis(uploadId: string): Promise<AiAnalysis> {
  const res = await berserkLongRunningApi.post(`/api/analyses/${uploadId}/run`);
  return unwrapData<AiAnalysis>(res);
}

export async function getAnalyses(): Promise<AiAnalysis[]> {
  const res = await berserkApi.get('/api/analyses');
  return unwrapData<AiAnalysis[]>(res);
}

export async function getAnalysis(id: string): Promise<AiAnalysis> {
  const res = await berserkApi.get(`/api/analyses/${id}`);
  return unwrapData<AiAnalysis>(res);
}

// ===== Attributes =====

export async function getAttributesPalette(): Promise<FinancialAttribute[]> {
  const res = await berserkApi.get('/api/attributes/palette');
  return unwrapData<FinancialAttribute[]>(res);
}

export async function getAttributes(): Promise<FinancialAttribute[]> {
  const res = await berserkApi.get('/api/attributes');
  return unwrapData<FinancialAttribute[]>(res);
}

export async function getAttribute(id: string): Promise<FinancialAttribute> {
  const res = await berserkApi.get(`/api/attributes/${id}`);
  return unwrapData<FinancialAttribute>(res);
}

export async function getAttributeVersions(
  id: string
): Promise<AttributeVersion[]> {
  const res = await berserkApi.get(`/api/attributes/${id}/versions`);
  return unwrapData<AttributeVersion[]>(res);
}

// ===== Dashboard =====

export async function getDashboardSummary(
  range: DashboardRange = '1m'
): Promise<DashboardSummary> {
  const res = await berserkApi.get('/api/dashboard/summary', {
    params: { range },
  });
  return unwrapData<DashboardSummary>(res);
}

export async function getDashboardCharts(
  range: DashboardRange = '1m'
): Promise<DashboardCharts> {
  const res = await berserkApi.get('/api/dashboard/charts', {
    params: { range },
  });
  return unwrapData<DashboardCharts>(res);
}

// ===== Report Templates =====

export async function createReportTemplate(
  payload: CreateReportTemplatePayload
): Promise<ReportTemplate> {
  const res = await berserkApi.post('/api/report-templates', payload);
  return unwrapData<ReportTemplate>(res);
}

export async function getReportTemplates(): Promise<ReportTemplate[]> {
  const res = await berserkApi.get('/api/report-templates');
  return unwrapData<ReportTemplate[]>(res);
}

export async function getReportTemplate(id: string): Promise<ReportTemplate> {
  const res = await berserkApi.get(`/api/report-templates/${id}`);
  return unwrapData<ReportTemplate>(res);
}

export async function updateReportTemplate(
  id: string,
  payload: Partial<CreateReportTemplatePayload>
): Promise<ReportTemplate> {
  const res = await berserkApi.patch(`/api/report-templates/${id}`, payload);
  return unwrapData<ReportTemplate>(res);
}

export async function deleteReportTemplate(id: string): Promise<void> {
  await berserkApi.delete(`/api/report-templates/${id}`);
}

// ===== Reports =====

export async function generateReport(
  payload: GenerateReportPayload
): Promise<GeneratedReport> {
  const res = await berserkApi.post('/api/reports/generate', payload);
  return unwrapData<GeneratedReport>(res);
}

export async function getReports(): Promise<GeneratedReport[]> {
  const res = await berserkApi.get('/api/reports');
  return unwrapData<GeneratedReport[]>(res);
}

export async function getReport(id: string): Promise<GeneratedReport> {
  const res = await berserkApi.get(`/api/reports/${id}`);
  return unwrapData<GeneratedReport>(res);
}

export async function downloadReport(
  id: string,
  fileName: string
): Promise<void> {
  const res = await berserkApi.get(`/api/reports/${id}/download`, {
    responseType: 'blob',
  });
  const url = URL.createObjectURL(new Blob([res.data as BlobPart]));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || `report-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===== Existing helpers (unchanged) =====

function normalizeUploadResponse(data: unknown): UploadResult[] {
  const d = (data as any)?.data;
  if (!d) return [];
  return Array.isArray(d) ? (d as UploadResult[]) : [d as UploadResult];
}

export async function uploadOneAttachment(
  file: File,
  fieldName = 'files'
): Promise<string> {
  const fd = new FormData();
  fd.append(fieldName, file);
  const res = await axiosInstance.post('/v1/attachments/upload', fd);
  const [first] = normalizeUploadResponse(res.data);
  return first?.public_id ?? '';
}

export async function uploadManyAttachments(
  files: File[],
  fieldName = 'files[]'
): Promise<string[]> {
  const fd = new FormData();
  files.forEach((f) => fd.append(fieldName, f));
  const res = await axiosInstance.post('/v1/attachments/upload', fd);
  return normalizeUploadResponse(res.data).map((x) => x.public_id);
}

export async function getStudentLookup(): Promise<StudentLookup> {
  const { data } = await axiosInstance.get('/v1/lookup/student');
  return data?.data as StudentLookup;
}

function toOption(x: unknown): ApiOption {
  const item = x as any;
  if (!item) return { value: 0, label: '' };
  if ('value' in item && 'label' in item) return item as ApiOption;
  if ('id' in item && 'name' in item)
    return { value: Number(item.id), label: String(item.name) };
  return {
    value: Number(item.value ?? item.id ?? 0),
    label: String(item.label ?? item.name ?? ''),
  };
}

function unwrapList<T = unknown>(res: unknown): T {
  const r = res as any;
  return (r?.data?.data ?? r?.data ?? []) as T;
}

export async function getDistricts(regionId: number): Promise<ApiOption[]> {
  try {
    const r = await axiosInstance.get('/v1/districts', {
      params: { region_id: regionId },
    });
    return unwrapList<unknown[]>(r).map(toOption);
  } catch {
    const r = await axiosInstance.post('/v1/districts', {
      region_id: regionId,
    });
    return unwrapList<unknown[]>(r).map(toOption);
  }
}
