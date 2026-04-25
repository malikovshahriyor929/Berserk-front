export interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  classId?: string;
  className?: string;
}

export const studentsData: Student[] = [
  {
    id: 's1',
    name: 'John Doe',
    avatar: '/images/avatar/1.png',
    email: 'john.doe@example.com',
    classId: 'c1',
    className: 'Mathematics 101',
  },
  {
    id: 's2',
    name: 'Jane Smith',
    avatar: '/images/avatar/2.png',
    email: 'jane.smith@example.com',
    classId: 'c1',
    className: 'Mathematics 101',
  },
  {
    id: 's3',
    name: 'Mike Johnson',
    avatar: '/images/avatar/3.png',
    email: 'mike.johnson@example.com',
    classId: 'c2',
    className: 'Physics 201',
  },
  {
    id: 's4',
    name: 'Alex Brown',
    avatar: '/images/avatar/4.png',
    email: 'alex.brown@example.com',
    classId: 'c2',
    className: 'Physics 201',
  },
  {
    id: 's5',
    name: 'Sarah Wilson',
    avatar: '/images/avatar/5.png',
    email: 'sarah.wilson@example.com',
    classId: 'c3',
    className: 'Literature 302',
  },
  {
    id: 's6',
    name: 'Emily Davis',
    avatar: '/images/avatar/6.png',
    email: 'emily.davis@example.com',
    classId: 'c3',
    className: 'Literature 302',
  },
  {
    id: 's7',
    name: 'David Garcia',
    avatar: '/images/avatar/7.png',
    email: 'david.garcia@example.com',
    classId: 'c4',
    className: 'Chemistry 201',
  },
  {
    id: 's8',
    name: 'Lisa Martinez',
    avatar: '/images/avatar/8.png',
    email: 'lisa.martinez@example.com',
    classId: 'c4',
    className: 'Chemistry 201',
  },
  {
    id: 's9',
    name: 'Robert Taylor',
    avatar: '/images/avatar/9.png',
    email: 'robert.taylor@example.com',
    classId: 'c5',
    className: 'History 101',
  },
  {
    id: 's10',
    name: 'Thomas Anderson',
    avatar: '/images/avatar/10.png',
    email: 'thomas.anderson@example.com',
    classId: 'c5',
    className: 'History 101',
  },
];

// Group students by class for easier multi-selection
export const classesByIdMap = studentsData.reduce(
  (acc, student) => {
    if (student.classId && !acc[student.classId]) {
      acc[student.classId] = {
        id: student.classId,
        name: student.className || 'Unknown Class',
        students: [],
      };
    }
    if (student.classId) {
      acc[student.classId].students.push(student);
    }
    return acc;
  },
  {} as Record<string, { id: string; name: string; students: Student[] }>
);

// Convert to array for dropdown display
export const classesData = Object.values(classesByIdMap);
