import { ReactNode } from 'react';

interface DashboardCardProps {
  colSpan: number;
  rowSpan: number;
  colStart?: number;
  rowStart?: number;
  gradientFrom?: string;
  gradientTo?: string;
  children: ReactNode;
}

export function DashboardCard({
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  gradientFrom,
  gradientTo,
  children
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-md ${
        gradientFrom && gradientTo
          ? `bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}]`
          : 'bg-card'
      } ${colStart ? `col-start-${colStart}` : ''} ${rowStart ? `row-start-${rowStart}` : ''} col-span-${colSpan} row-span-${rowSpan} dark:${gradientFrom && gradientTo ? 'bg-gradient-to-tr' : ''} dark:from-[#92FFC0] dark:to-[#0064FF]`}
    >
      {children}
    </div>
  );
}
