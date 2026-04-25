export type Student = {
  id: string;
  name: string;
  studentId: string;
  avatar: string;

  ielts?: {
    score?: number;
    preparationPercent: number;
  };

  sat?: {
    math?: number;
    english?: number;
    preparationPercent: number;
  };

  portfolioPercent: number;

  totalPoints: number;
};

export const allStudentsData: Student[] = [
  {
    id: '60000',
    name: 'Diyorbek Karimov',
    studentId: '422342',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
    ielts: { score: 7.0, preparationPercent: 100 },
    sat: { math: 650, english: 630, preparationPercent: 100 },
    portfolioPercent: 85,
    totalPoints: 1985,
  },
  {
    id: '60001',
    name: 'Malika Tursunova',
    studentId: '432432',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    ielts: { preparationPercent: 60 },
    sat: { preparationPercent: 55 },
    portfolioPercent: 70,
    totalPoints: 60 * 10 + 55 + 55 + 70, // = 785
  },
  {
    id: '60002',
    name: 'Sardorbek Usmonov',
    studentId: '321322',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-03.webp',
    ielts: { score: 6.5, preparationPercent: 100 },
    sat: { math: 600, preparationPercent: 100 },
    portfolioPercent: 88,
    totalPoints: 6.5 * 10 + 600 + 100 + 88, // = 853
  },
  {
    id: '60003',
    name: 'Dilnoza Ermatova',
    studentId: '43243',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp',
    ielts: { preparationPercent: 40 },
    sat: { math: 580, english: 590, preparationPercent: 100 },
    portfolioPercent: 60,
    totalPoints: 40 * 10 + 580 + 590 + 60, // = 1230
  },
  {
    id: '60004',
    name: 'Jasurbek Rahmonov',
    studentId: '34243',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
    ielts: { score: 6.0, preparationPercent: 100 },
    sat: { preparationPercent: 80 },
    portfolioPercent: 72,
    totalPoints: 6.0 * 10 + 80 + 80 + 72, // = 712
  },
  {
    id: '60005',
    name: 'Shahzoda Abdullayeva',
    studentId: '55521',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-06.webp',
    ielts: { preparationPercent: 90 },
    sat: { math: 620, preparationPercent: 90 },
    portfolioPercent: 78,
    totalPoints: 90 * 10 + 620 + 90 + 78, // = 1688
  },
  {
    id: '60006',
    name: 'Oybek Rustamov',
    studentId: '673452',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    ielts: { score: 5.5, preparationPercent: 100 },
    sat: { english: 610, preparationPercent: 100 },
    portfolioPercent: 65,
    totalPoints: 5.5 * 10 + 610 + 100 + 65, // = 830
  },
  {
    id: '60007',
    name: 'Gulrux Ashurova',
    studentId: '998812',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-08.webp',
    ielts: { score: 7.5, preparationPercent: 100 },
    sat: { math: 700, english: 690, preparationPercent: 100 },
    portfolioPercent: 92,
    totalPoints: 7.5 * 10 + 700 + 690 + 92, // = 1557
  },
];
