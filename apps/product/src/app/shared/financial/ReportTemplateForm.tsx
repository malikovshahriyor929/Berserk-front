'use client';

import { useState } from 'react';
import { PiFloppyDisk, PiX } from 'react-icons/pi';
import AttributePalette from './AttributePalette';
import type { ReportTemplate, CreateReportTemplatePayload } from './types';

const SECTIONS = [
  { key: 'title', label: 'Sarlavha' },
  { key: 'period', label: 'Davr' },
  { key: 'metrics', label: 'Metrikalar' },
  { key: 'tables', label: 'Jadvallar' },
  { key: 'aiSummary', label: 'AI xulosasi' },
  { key: 'anomalies', label: 'Anomaliyalar' },
  { key: 'risks', label: 'Risklar' },
  { key: 'recommendations', label: 'Tavsiyalar' },
];

interface ReportTemplateFormProps {
  initial?: ReportTemplate;
  onSave: (payload: CreateReportTemplatePayload) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function ReportTemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: ReportTemplateFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [isDefault, setIsDefault] = useState(initial?.isDefault ?? false);
  const [selectedSections, setSelectedSections] = useState<string[]>(
    initial?.templateJson?.sections
      ? (initial.templateJson.sections as string[])
      : SECTIONS.map((s) => s.key)
  );
  const [jsonText, setJsonText] = useState(
    initial?.templateJson
      ? JSON.stringify(initial.templateJson, null, 2)
      : JSON.stringify({ sections: SECTIONS.map((s) => s.key) }, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setSelectedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    try {
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      parsed['sections'] = selectedSections.includes(key)
        ? selectedSections.filter((k) => k !== key)
        : [...selectedSections, key];
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch {
      // json text stays as-is
    }
  };

  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val) as Record<string, unknown>;
      if (parsed['sections'] && Array.isArray(parsed['sections'])) {
        setSelectedSections(parsed['sections'] as string[]);
      }
      setJsonError(null);
    } catch {
      setJsonError('JSON noto\'g\'ri formatda');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    let templateJson: Record<string, unknown>;
    try {
      templateJson = JSON.parse(jsonText) as Record<string, unknown>;
    } catch {
      setJsonError('JSON noto\'g\'ri formatda — avval tuzating');
      return;
    }
    await onSave({ name: name.trim(), description: description.trim() || undefined, templateJson, isDefault });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Left: form fields */}
      <div className="space-y-5 xl:col-span-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Shablon nomi <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Moliyaviy hisobot shabloni"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#112855] focus:ring-1 focus:ring-[#112855]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tavsif
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Ixtiyoriy tavsif..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#112855] focus:ring-1 focus:ring-[#112855]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bo&apos;limlar
          </label>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSection(s.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedSections.includes(s.key)
                    ? 'bg-[#112855] text-white'
                    : 'border border-gray-200 text-gray-600 hover:border-[#112855] hover:text-[#112855]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Shablon JSON
          </label>
          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={10}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-xs outline-none focus:border-[#112855] focus:ring-1 focus:ring-[#112855]"
          />
          {jsonError && <p className="mt-1 text-xs text-red-500">{jsonError}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isDefault"
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#112855] focus:ring-[#112855]"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Standart shablon sifatida belgilash
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-[#112855] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0B1E40] transition-colors disabled:opacity-60"
          >
            <PiFloppyDisk />
            {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <PiX />
            Bekor qilish
          </button>
        </div>
      </div>

      {/* Right: Attribute Palette */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Atributlar</p>
        <p className="mb-3 text-xs text-gray-400">
          Placeholder nusxalash uchun ikonkani bosing va JSON yoki HTML shablonga joylashtiring.
        </p>
        <AttributePalette />
      </div>
    </form>
  );
}
