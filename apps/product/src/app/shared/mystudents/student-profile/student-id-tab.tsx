import React from 'react';
import { Badge, Title, Text, Avatar } from 'rizzui';
import Card from '../../card';
import InfoRow2 from '../shared/info-row2';

interface StudentIDTabProps {
  student: any; // Replace with proper type
}

const StudentIDTab: React.FC<StudentIDTabProps> = ({ student }) => {
  return (
    <Card className="mx-auto max-w-lg overflow-hidden">
      <div className="bg-blue-900 dark:bg-blue-700/70 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Student ID Card</h3>
          <div className="text-sm font-medium">2023-2024</div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <Avatar size="lg" src={student.avatar} name={student.name} />
          <div>
            <Title as="h3" className="text-lg font-semibold">
              {student.name}
            </Title>
            <Text className="text-gray-500 dark:text-gray-400">
              Faculty of {student.faculty}
            </Text>
            <Badge variant="outline" size="sm" className="mt-1">
              {student.yearOfStudy}
            </Badge>
          </div>
        </div>
        <div className="flex items-start justify-between space-x-4">
          <div className="space-y-1">
            <InfoRow2 label="Student ID" value={`PU-${student.id}`} />
            <InfoRow2 label="Faculty" value={student.faculty} />
            <InfoRow2 label="Valid Until" value="July 31, 2024" />
          </div>
          <div className="h-24 w-24 p-2">
            {/* QR Code placeholder */}
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <path
                d="M0,0 h100v100h-100z"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <rect x="80" y="60" width="10" height="10" fill="#6B7280" />
              <rect x="10" y="10" width="30" height="30" fill="#6B7280" />
              <rect x="80" y="80" width="10" height="10" fill="#6B7280" />
              <rect x="60" y="10" width="30" height="30" fill="#6B7280" />
              <rect x="10" y="60" width="30" height="30" fill="#6B7280" />
              <rect x="60" y="60" width="10" height="10" fill="#6B7280" />
              <rect x="60" y="80" width="10" height="10" fill="#6B7280" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentIDTab;
