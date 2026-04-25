// attendance-data.ts
export const attendanceData = [
  {
    id: 'SES001',
    sessionName: 'Introduction to Economics',
    sessionImage:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    room: 'Room A-101',
    totalStudents: 25,
    attendedStudents: 22,
    absentStudents: 2,
    excusedStudents: 1,
    sessionDate: '2023-08-15T09:00:00.000Z',
    status: 'completed',
    progress: 88,
    students: [
      {
        id: 'STU001',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        group: 'Stanford',
        attendanceStatus: 'present',
        rating: 4,
      },
      {
        id: 'STU002',
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
        group: 'Yale',
        attendanceStatus: 'absent',
        rating: 3,
      },
      {
        id: 'STU003',
        name: 'Charlie Brown',
        email: 'charlie.brown@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-03.webp',
        group: 'Harvard',
        attendanceStatus: 'excused',
        rating: 5,
      },
    ],
  },
  {
    id: 'SES002',
    sessionName: 'Advanced Mathematics',
    sessionImage:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-16.webp',
    room: 'Room B-205',
    totalStudents: 18,
    attendedStudents: 15,
    absentStudents: 3,
    excusedStudents: 0,
    sessionDate: '2023-08-20T14:00:00.000Z',
    status: 'completed',
    progress: 83,
    students: [
      {
        id: 'STU004',
        name: 'Diana Prince',
        email: 'diana.prince@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp',
        group: 'MIT',
        attendanceStatus: 'present',
        rating: 5,
      },
      {
        id: 'STU005',
        name: 'Edward Norton',
        email: 'edward.norton@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
        group: 'Stanford',
        attendanceStatus: 'present',
        rating: 4,
      },
    ],
  },
  {
    id: 'SES003',
    sessionName: 'Physics Laboratory',
    sessionImage:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-17.webp',
    room: 'Lab C-301',
    totalStudents: 20,
    attendedStudents: 0,
    absentStudents: 0,
    excusedStudents: 0,
    sessionDate: '2023-08-25T10:00:00.000Z',
    status: 'delayed',
    progress: 0,
    students: [
      {
        id: 'STU006',
        name: 'Fiona Green',
        email: 'fiona.green@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-06.webp',
        group: 'Yale',
        attendanceStatus: 'pending',
        rating: 0,
      },
      {
        id: 'STU007',
        name: 'George Wilson',
        email: 'george.wilson@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
        group: 'Harvard',
        attendanceStatus: 'pending',
        rating: 0,
      },
    ],
  },
  {
    id: 'SES004',
    sessionName: 'Literature Analysis',
    sessionImage:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp',
    room: 'Room D-102',
    totalStudents: 15,
    attendedStudents: 0,
    absentStudents: 0,
    excusedStudents: 0,
    sessionDate: '2023-08-18T11:00:00.000Z',
    status: 'cancelled',
    progress: 0,
    students: [
      {
        id: 'STU008',
        name: 'Helen Davis',
        email: 'helen.davis@email.com',
        avatar:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-08.webp',
        group: 'MIT',
        attendanceStatus: 'cancelled',
        rating: 0,
      },
    ],
  },
];
