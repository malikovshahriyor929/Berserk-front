'use client';

function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-[#E2E8F0] ${className}`} />;
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
        <Block className="mb-4 h-4 w-48" />
        <Block className="mb-3 h-10 w-72" />
        <Block className="h-4 w-full max-w-2xl" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
        <Block className="h-72" />
        <Block className="h-72" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
        <Block className="h-80" />
        <Block className="h-80" />
      </div>

      <Block className="h-64" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Block className="h-64" />
        <Block className="h-64" />
      </div>
      <Block className="h-72" />
      <Block className="h-72" />
    </div>
  );
}
