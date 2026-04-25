import {
  Text,
  Badge,
  Avatar,
  Checkbox,
  Switch,
  Button,
  ActionIcon,
  Title,
} from 'rizzui';
import {
  PiBookBookmark,
  PiCheckBold,
  PiCheckCircleBold,
  PiStudent,
  PiUsersBold,
  PiXBold,
} from 'react-icons/pi';
import { studentsData, classesData } from '@/data/students-data';
import cn from '@core/utils/class-names';
interface StudentSelectorProps {
  selectedStudentIds: string[];
  selectedClassIds: string[];
  showByClass: boolean;
  setShowByClass: (value: boolean) => void;
  handleToggleStudent: (studentId: string) => void;
  handleSelectAllStudents: () => void;
  handleToggleClass: (classId: string) => void;
  clearSelections: () => void;
  errors?: { message?: string };
}

export default function StudentSelector({
  selectedStudentIds,
  selectedClassIds,
  showByClass,
  setShowByClass,
  handleToggleStudent,
  handleSelectAllStudents,
  handleToggleClass,
  clearSelections,
  errors,
}: StudentSelectorProps) {
  return (
    <div className="rounded-lg border border-gray-300 p-5 shadow-sm">
      <Title
        as="h4"
        className="mb-5 flex items-center gap-2 border-b border-dashed pb-3"
      >
        <span className="rounded-md bg-blue-50 p-2 text-mainBlue dark:text-blue-600">
          <PiUsersBold className="h-5 w-5" />
        </span>
        Assign To
      </Title>

      {errors?.message && (
        <div className="mb-2 text-sm text-red-500">{errors.message}</div>
      )}

      {/* Selection mode switch */}
      <div className="mb-4 flex items-center justify-end">
        <Text className="mr-2 text-sm">By Class</Text>
        <Switch
          variant="outline"
          rounded="lg"
          checked={showByClass}
          onChange={() => setShowByClass(!showByClass)}
        />
      </div>

      {/* Selected students display */}
      {selectedStudentIds.length > 0 && (
        <div className="mb-4">
          <Text className="mb-2 block font-medium">
            Selected Students ({selectedStudentIds.length})
          </Text>
          <div className="flex flex-wrap gap-1.5">
            {selectedStudentIds.slice(0, 5).map((studentId) => {
              const student = studentsData.find((s) => s.id === studentId);
              if (!student) return null;

              return (
                <Badge
                  key={student.id}
                  className="flex items-center gap-1 py-1 pl-1 pr-1"
                >
                  <Avatar
                    src={student.avatar}
                    name={student.name}
                    size="sm"
                    className="rounded-full"
                  />
                  <span className="ml-1 mr-1">{student.name}</span>
                  <ActionIcon
                    size="sm"
                    variant="text"
                    className="h-5 w-5 rounded-full hover:bg-gray-100/30 hover:text-white"
                    onClick={() => handleToggleStudent(student.id)}
                  >
                    <PiXBold className="h-3 w-3" />
                  </ActionIcon>
                </Badge>
              );
            })}
            {selectedStudentIds.length > 5 && (
              <Badge variant="outline">
                +{selectedStudentIds.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <Text className="font-medium text-gray-600">
          {showByClass ? 'Classes' : 'Students'}
        </Text>
        <div className="flex items-center gap-2">
          {!showByClass && (
            <Button
              type="button"
              color="primary"
              size="sm"
              variant="text"
              onClick={handleSelectAllStudents}
            >
              Select All  
            </Button>
          )}
          <Button
            type="button"
            color="primary"
            size="sm"
            variant="text"
            onClick={clearSelections}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Student/Class Selection */}
      <div className="mb-6 max-h-[400px] overflow-y-auto rounded-md border">
        {showByClass ? (
          // Show by class
          <div className="grid grid-cols-2 gap-2 p-2">
            {classesData.map((classGroup) => (
              <div
                key={classGroup.id}
                className={cn(
                  'relative overflow-clip rounded-md border border-mainBlue/20 transition-all duration-200 hover:shadow-sm dark:border-gray-600'
                )}
              >
                <div
                  className="flex cursor-pointer items-center gap-2 p-3 hover:bg-gray-50"
                  onClick={() => handleToggleClass(classGroup.id)}
                >
                  <PiCheckCircleBold
                    className={cn(
                      selectedClassIds.includes(classGroup.id)
                        ? 'text-green-600'
                        : 'text-gray-300',
                      'h-6 w-6'
                    )}
                  ></PiCheckCircleBold>
                  <div className="flex-1">
                    <Text className="font-medium text-mainBlue dark:text-gray-600">
                      {classGroup.name}
                    </Text>
                    <Text className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                      <PiStudent className="inline-block h-3 w-3" />{' '}
                      {classGroup.students.length} students
                    </Text>
                  </div>
                </div>
                {/* Decorative book icon */}
                <div className="absolute -right-2 -top-2 rotate-12 opacity-10 transition-all duration-300 group-hover:rotate-6 group-hover:opacity-20">
                  <PiBookBookmark className={cn('h-12 w-12')} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show individual students
          <div>
            {studentsData.map((student) => (
              <div
                key={student.id}
                className="flex cursor-pointer items-center border-b p-2 last:border-b-0 hover:bg-gray-50"
                onClick={() => handleToggleStudent(student.id)}
              >
                <Checkbox
                  checked={selectedStudentIds.includes(student.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleStudent(student.id);
                  }}
                  className="mr-2"
                />
                <Avatar
                  src={student.avatar}
                  name={student.name}
                  size="sm"
                  className="mr-3 rounded-full"
                />
                <div>
                  <Text className="font-medium">{student.name}</Text>
                  <Text className="text-xs text-gray-500">
                    {student.className || 'No class'}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
