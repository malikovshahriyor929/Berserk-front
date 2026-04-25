'use client';

import { PiArticle } from 'react-icons/pi';
import DetailCard from './DetailCard';

function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const isBold = /^\*\*.*\*\*$/.test(part);
    const content = isBold ? part.slice(2, -2) : part;

    return isBold ? (
      <strong key={`${content}-${index}`} className="font-semibold text-[#0F172A]">
        {content}
      </strong>
    ) : (
      <span key={`${content}-${index}`}>{content}</span>
    );
  });
}

function parseParagraphs(summary: string) {
  return summary
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AnalysisSummaryCard({
  summary,
  title = 'AI tahlil matni',
}: {
  summary: string;
  title?: string;
}) {
  const paragraphs = parseParagraphs(summary);

  return (
    <DetailCard title={title} icon={<PiArticle className="text-lg" />}>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => {
          const headingOnly = /^\*\*.*\*\*$/.test(paragraph);

          return headingOnly ? (
            <p
              key={`${paragraph}-${index}`}
              className="text-lg font-semibold leading-7 text-[#112855]"
            >
              {renderInlineBold(paragraph)}
            </p>
          ) : (
            <p
              key={`${paragraph}-${index}`}
              className="text-[15px] leading-8 text-[#334155]"
            >
              {renderInlineBold(paragraph)}
            </p>
          );
        })}
      </div>
    </DetailCard>
  );
}
