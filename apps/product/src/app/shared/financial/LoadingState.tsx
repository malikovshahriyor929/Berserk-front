'use client';

interface LoadingStateProps {
  rows?: number;
  className?: string;
}

export default function LoadingState({ rows = 5, className }: LoadingStateProps) {
  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

export function LoadingCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

export function LoadingChart() {
  return <div className="h-64 animate-pulse rounded-xl bg-gray-100" />;
}
