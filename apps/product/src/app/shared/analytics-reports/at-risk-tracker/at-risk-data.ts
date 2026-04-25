export interface AtRiskStudent {
  id: string;
  name: string;
  avatar: string;
  email: string;
  grade: string;
  riskScore: number;
  riskLevel: 'high' | 'medium' | 'low';
  indicators: {
    rubricAverage: number; // 0-100
    taskCompletion: number; // 0-100
    missedSessions: number; // count
  };
  history: Array<{
    date: string;
    riskScore: number;
  }>;
}

export const atRiskStudentData: AtRiskStudent[] = [
  {
    id: 'STD007',
    name: 'Jordan K.',
    avatar: '/images/avatar/11.png',
    email: 'jordan.k@school.edu',
    grade: 'Grade 10',
    riskScore: 87,
    riskLevel: 'high',
    indicators: {
      rubricAverage: 45,
      taskCompletion: 30,
      missedSessions: 3,
    },
    history: [
      { date: '2025-06-01', riskScore: 65 },
      { date: '2025-06-15', riskScore: 70 },
      { date: '2025-07-01', riskScore: 87 },
    ],
  },
  {
    id: 'STD012',
    name: 'Maria D.',
    avatar: '/images/avatar/12.png',
    email: 'maria.d@school.edu',
    grade: 'Grade 9',
    riskScore: 65,
    riskLevel: 'medium',
    indicators: {
      rubricAverage: 55,
      taskCompletion: 40,
      missedSessions: 0,
    },
    history: [
      { date: '2025-06-01', riskScore: 45 },
      { date: '2025-06-15', riskScore: 60 },
      { date: '2025-07-01', riskScore: 65 },
    ],
  },
  {
    id: 'STD008',
    name: 'Sarah Wilson',
    avatar: '/images/avatar/8.png',
    email: 'sarah.w@school.edu',
    grade: 'Grade 10',
    riskScore: 75,
    riskLevel: 'high',
    indicators: {
      rubricAverage: 50,
      taskCompletion: 35,
      missedSessions: 2,
    },
    history: [
      { date: '2025-06-01', riskScore: 55 },
      { date: '2025-06-15', riskScore: 65 },
      { date: '2025-07-01', riskScore: 75 },
    ],
  },
  {
    id: 'STD018',
    name: 'Asha N.',
    avatar: '/images/avatar/13.png',
    email: 'asha.n@school.edu',
    grade: 'Grade 8',
    riskScore: 32,
    riskLevel: 'medium',
    indicators: {
      rubricAverage: 70,
      taskCompletion: 85,
      missedSessions: 1,
    },
    history: [
      { date: '2025-06-01', riskScore: 20 },
      { date: '2025-06-15', riskScore: 25 },
      { date: '2025-07-01', riskScore: 32 },
    ],
  },
  {
    id: 'STD002',
    name: 'John Doe',
    avatar: '/images/avatar/2.png',
    email: 'john.doe@school.edu',
    grade: 'Grade 8',
    riskScore: 55,
    riskLevel: 'medium',
    indicators: {
      rubricAverage: 60,
      taskCompletion: 65,
      missedSessions: 1,
    },
    history: [
      { date: '2025-06-01', riskScore: 60 },
      { date: '2025-06-15', riskScore: 58 },
      { date: '2025-07-01', riskScore: 55 },
    ],
  },
  {
    id: 'STD022',
    name: 'Alex P.',
    avatar: '/images/avatar/14.png',
    email: 'alex.p@school.edu',
    grade: 'Grade 9',
    riskScore: 80,
    riskLevel: 'high',
    indicators: {
      rubricAverage: 48,
      taskCompletion: 32,
      missedSessions: 2,
    },
    history: [
      { date: '2025-06-01', riskScore: 70 },
      { date: '2025-06-15', riskScore: 75 },
      { date: '2025-07-01', riskScore: 80 },
    ],
  },
  {
    id: 'STD025',
    name: 'Emma T.',
    avatar: '/images/avatar/15.png',
    email: 'emma.t@school.edu',
    grade: 'Grade 8',
    riskScore: 25,
    riskLevel: 'low',
    indicators: {
      rubricAverage: 75,
      taskCompletion: 90,
      missedSessions: 0,
    },
    history: [
      { date: '2025-06-01', riskScore: 35 },
      { date: '2025-06-15', riskScore: 30 },
      { date: '2025-07-01', riskScore: 25 },
    ],
  },
  {
    id: 'STD030',
    name: 'Daniel R.',
    avatar: '/images/avatar/16.png',
    email: 'daniel.r@school.edu',
    grade: 'Grade 9',
    riskScore: 45,
    riskLevel: 'medium',
    indicators: {
      rubricAverage: 65,
      taskCompletion: 70,
      missedSessions: 1,
    },
    history: [
      { date: '2025-06-01', riskScore: 50 },
      { date: '2025-06-15', riskScore: 48 },
      { date: '2025-07-01', riskScore: 45 },
    ],
  },
];
