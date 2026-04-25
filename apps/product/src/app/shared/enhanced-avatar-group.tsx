'use client';

import { Text, Avatar, Popover } from 'rizzui';
import StudentPopover from './student-popover';

// Current system timestamp and user
const CURRENT_DATE = new Date('2025-07-14 11:41:15');
const CURRENT_USER = 'abduraufdev77';

interface EnhancedAvatarGroupProps {
  students: any[];
  maxDisplay?: number;
  className?: string;
}

export default function EnhancedAvatarGroup({
  students,
  maxDisplay = 6,
  className,
}: EnhancedAvatarGroupProps) {
  // Limit displayed avatars and calculate remaining count
  const displayedStudents = students.slice(0, maxDisplay);
  const remaining = students.length - maxDisplay;

  return (
    <div className={`flex items-center ${className || ''}`}>
      {/* Stacked avatar group */}
      <div className="flex -space-x-3">
        {displayedStudents.map((student, index) => (
          <div className="relative" key={student.id || index}>
            <Popover
              key={student.id || index}
              enableOverlay={false}
              placement="bottom-start"
            >
              <Popover.Trigger>
                <div className="relative cursor-pointer">
                  <Avatar
                    src={student.avatar}
                    name={student.name || `Student ${index + 1}`}
                    className="border-2 border-white ring-1 ring-transparent transition hover:z-10 hover:ring-mainBlue"
                  />
                </div>
              </Popover.Trigger>
              <Popover.Content className="z-[999]">
                {({ setOpen }) => (
                  <StudentPopover
                    student={student}
                    onClose={() => setOpen(false)}
                  />
                )}
              </Popover.Content>
            </Popover>
          </div>
        ))}
        {remaining > 0 && (
          <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-semibold text-gray-600">
            +{remaining}
          </div>
        )}
      </div>
      {/* Total students count */}
      <Text className="ml-3">
        {students.length} {students.length === 1 ? 'student' : 'students'}
      </Text>
    </div>
  );
}
