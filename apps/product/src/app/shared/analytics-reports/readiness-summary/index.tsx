'use client';

import cn from '@core/utils/class-names';
import ReadinessStatsCards from './readiness-stat-cards';
import DomainPerformanceChart from './domain-performance-chart';
import ReadinessTrendChart from './readiness-trend-chart';
import StudentReadinessTable from './student-readiness-table';
import { useState } from 'react';
import { Radio, RadioGroup, Select } from 'rizzui';

export default function ReadinessSummaryDashboard({
  className,
}: {
  className?: string;
}) {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [timeframe, setTimeframe] = useState('term');

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
  };

  const handleDomainChange = (value: string) => {
    setSelectedDomain(value);
  };

  return (
    <div className={cn('flex flex-col gap-5 @container', className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex flex-wrap items-center gap-4">
          <Select
            size="sm"
            placeholder="All Grades"
            value={selectedGrade}
            onChange={(value: string) => handleGradeChange(value)}
            options={[
              { value: 'all', label: 'All Grades' },
              { value: 'grade7', label: 'Grade 7' },
              { value: 'grade8', label: 'Grade 8' },
              { value: 'grade9', label: 'Grade 9' },
              { value: 'grade10', label: 'Grade 10' },
              { value: 'grade11', label: 'Grade 11' },
              { value: 'grade12', label: 'Grade 12' },
            ]}
            className="w-40"
          />
          <Select
            size="sm"
            placeholder="All Domains"
            value={selectedDomain}
            onChange={(value: string) => handleDomainChange(value)}
            options={[
              { value: 'all', label: 'All Domains' },
              { value: 'academic', label: 'Academic' },
              { value: 'career', label: 'Career' },
              { value: 'social', label: 'Social-Emotional' },
              { value: 'leadership', label: 'Leadership' },
              { value: 'technology', label: 'Technology' },
            ]}
            className="w-44"
          />
          <RadioGroup
            value={timeframe}
            setValue={setTimeframe}
            className="flex flex-wrap items-center gap-4"
          >
            <Radio label="Term" value="term" />
            <Radio label="Year" value="year" />
          </RadioGroup>
        </div>
      </div>

      <ReadinessStatsCards />

      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2">
        <DomainPerformanceChart />
        <ReadinessTrendChart />
      </div>

      <StudentReadinessTable />
    </div>
  );
}
