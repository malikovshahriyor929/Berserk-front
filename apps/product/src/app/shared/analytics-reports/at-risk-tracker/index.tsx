'use client';

import cn from '@core/utils/class-names';
import AtRiskDistribution from './at-risk-distribution';
import AtRiskTable from './at-risk-table';
import StudentRiskDetail from './student-risk-detail';
import { useState, useEffect } from 'react';
import { atRiskStudentData, AtRiskStudent } from './at-risk-data';
import { Select } from 'rizzui';

export default function AtRiskTrackerDashboard({
  className,
}: {
  className?: string;
}) {
  const [selectedStudent, setSelectedStudent] = useState<AtRiskStudent | null>(
    null
  );
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredStudents =
    selectedGrade === 'all'
      ? atRiskStudentData
      : atRiskStudentData.filter((student) => student.grade === selectedGrade);

  // Set the highest risk student as the default selected student when the component mounts
  // or when filtered students change
  useEffect(() => {
    if (filteredStudents.length > 0 && !selectedStudent) {
      // Sort by risk score (descending) and get the first student (highest risk)
      const highestRiskStudent = [...filteredStudents].sort(
        (a, b) => b.riskScore - a.riskScore
      )[0];
      setSelectedStudent(highestRiskStudent);
    }
  }, [filteredStudents, selectedStudent]);

  const handleStudentSelect = (student: AtRiskStudent) => {
    setSelectedStudent(student);
  };

  // Handle grade filter change - preserve selected student if they remain in filtered results


  return (
    <div className={cn('flex flex-col gap-5 @container', className)}>

      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-12">
        <AtRiskDistribution
          className="@4xl:col-span-5"
          students={filteredStudents}
        />
        <AtRiskTable
          className="@4xl:col-span-7"
          students={filteredStudents}
          onSelectStudent={handleStudentSelect}
          selectedStudentId={selectedStudent?.id}
        />
      </div>

      {selectedStudent && (
        <StudentRiskDetail
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
