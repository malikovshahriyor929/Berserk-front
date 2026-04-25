export const portfolioData = {
  id: '2023001',
  name: 'Alex Johnson',
  avatar:
    'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
  email: 'alex.johnson@newuu.uz',
  phone: '+998 90 123 4567',
  status: 'On-Track',
  groupName: 'Grade 11-A',
  nationality: 'Uzbekistan',
  gpa: '4.2',
  ielts: 'B2',
  readinessScore: 4,

  // Address Information
  birthplace: 'Tashkent, Uzbekistan',
  address: '45 Independence Street, Tashkent',
  residentialAddress: 'Student Dormitory #3, Room 215',
  dateOfBirth: 'April 15, 2007',

  // Education Information
  faculty: 'Science',
  department: 'Natural Sciences',
  major: 'Physics',
  yearOfStudy: '11th Grade (Senior Year)',
  enrollmentDate: 'September 1, 2022',
  graduationDate: 'June 15, 2024 (Expected)',
  previousEducation: [
    {
      institution: 'International School of Tashkent',
      degree: 'Secondary Education (Grades 5-9)',
      years: '2017-2022',
    },
    {
      institution: 'Primary School #17',
      degree: 'Primary Education',
      years: '2013-2017',
    },
  ],

  // Academic Advisor
  advisor: 'Dr. Sarah Williams',
  advisorPhone: '+998 90 987 6543',

  // Overall Rating (100-point scale)
  ratings: {
    total: 74,
    sat: 21,
    ielts: 10,
    socialProjects: 4,
    additionalCourses: 5,
    olympiads: 8,
    projects: 9,
    sports: 3,
    creative: 4,
    competitions: 4,
    exchanges: 6,
  },

  // Test Scores
  testScores: [
    {
      name: 'SAT',
      date: 'May 20, 2024',
      score: '1420',
      pointsEarned: 21,
      maxPoints: 30,
      breakdown: {
        Math: '720',
        'Evidence-Based Reading': '700',
      },
    },
    {
      name: 'IELTS',
      date: 'June 5, 2024',
      score: '7.5',
      pointsEarned: 10,
      maxPoints: 15,
      breakdown: {
        Reading: '7.5',
        Listening: '8.0',
        Writing: '7.0',
        Speaking: '7.5',
      },
    },
    {
      name: 'TOEFL',
      date: 'February 12, 2024',
      score: '102',
      breakdown: {
        Reading: '26',
        Listening: '28',
        Speaking: '24',
        Writing: '24',
      },
    },
    {
      name: 'CEFR Assessment',
      date: 'December 8, 2023',
      score: 'B2',
      breakdown: {
        Reading: 'B2',
        Listening: 'B2+',
        Writing: 'B2',
        Speaking: 'B2',
      },
    },
  ],

  // Courses
  courses: [
    {
      code: 'PHYS-301',
      name: 'Advanced Physics',
      credits: 5,
      grade: 'A',
    },
    {
      code: 'MATH-221',
      name: 'Calculus II',
      credits: 4,
      grade: 'A-',
    },
    {
      code: 'ENG-202',
      name: 'Advanced Academic English',
      credits: 3,
      grade: 'B+',
    },
    {
      code: 'CHEM-101',
      name: 'General Chemistry',
      credits: 4,
      grade: 'B',
    },
    {
      code: 'COMP-110',
      name: 'Introduction to Programming',
      credits: 3,
      grade: 'A',
    },
    {
      code: 'HIST-102',
      name: 'World History',
      credits: 2,
      grade: 'B+',
    },
  ],

  // Certificates
  certificates: [
    {
      name: 'Cambridge English: Advanced (CAE)',
      date: 'August 2023',
      expiry: 'No Expiration',
      issuer: 'Cambridge Assessment English',
    },
    {
      name: 'Microsoft Office Specialist',
      date: 'March 2023',
      expiry: 'March 2026',
      issuer: 'Microsoft',
    },
    {
      name: 'Web Development Fundamentals',
      date: 'January 2024',
      expiry: 'No Expiration',
      issuer: 'freeCodeCamp',
    },
  ],

  // Social Projects (up to 5 points)
  socialProjects: [
    {
      id: 'sp1',
      name: 'Digital Literacy for Seniors',
      organization: 'Community Tech Center',
      role: 'Project Leader',
      description:
        'Led a team of 5 volunteers to teach basic computer skills to elderly community members. Organized weekly sessions and created custom learning materials.',
      startDate: 'September 2023',
      endDate: 'December 2023',
      hours: 60,
      impact:
        'Successfully trained 25 seniors to use computers for daily tasks including email, video calls with family, and finding information online.',
      points: 3,
      participants: 30,
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
    {
      id: 'sp2',
      name: 'School Library Renovation',
      organization: 'Student Council',
      role: 'Volunteer',
      description:
        'Participated in renovating the school library, including book cataloging, space reorganization, and creating a comfortable reading area.',
      startDate: 'January 2024',
      endDate: 'February 2024',
      hours: 25,
      impact:
        'Transformed an underutilized library into a popular student hub, increasing library usage by 40%.',
      points: 1,
      participants: 15,
    },
  ],

  // Olympiads (up to 10 points)
  olympiads: [
    {
      id: 'ol1',
      name: 'National Physics Olympiad',
      subject: 'Physics',
      organization: 'Ministry of Education',
      level: 'National',
      place: '2nd Place',
      date: 'November 2023',
      location: 'Tashkent, Uzbekistan',
      description:
        'Competed against 200+ students from across Uzbekistan. Solved complex physics problems and conducted a lab experiment.',
      points: 6,
      certificate: '/certificates/physics-olympiad.pdf',
    },
    {
      id: 'ol2',
      name: 'International Mathematics Competition',
      subject: 'Mathematics',
      organization: 'International Mathematical Union',
      level: 'International',
      place: 'Honorable Mention',
      date: 'July 2023',
      location: 'Astana, Kazakhstan',
      description:
        'Represented Uzbekistan in this prestigious competition with participants from 30 countries. Solved advanced mathematical problems.',
      points: 2,
      certificate: '/certificates/math-olympiad.pdf',
    },
  ],

  // Projects (up to 10 points)
  projects: [
    {
      id: 'pr1',
      name: 'Smart Water Conservation System',
      type: 'Research',
      status: 'Completed',
      description:
        'Developed a low-cost IoT-based system to monitor and optimize water usage in agricultural settings. The system uses soil moisture sensors and weather data to provide smart irrigation scheduling.',
      startDate: 'May 2023',
      endDate: 'November 2023',
      teamSize: 3,
      role: 'Lead Developer',
      achievements: [
        'Won 2nd place in the National Young Innovators Competition',
        'Publication in the Young Scientists Journal',
        'System being tested in a local farm with 20% water savings reported',
      ],
      url: 'https://github.com/alexj/smart-water',
      points: 6,
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
    {
      id: 'pr2',
      name: 'Mobile App for Language Exchange',
      type: 'Development',
      status: 'In Progress',
      description:
        'Creating a mobile application to connect language learners in Uzbekistan for practice and cultural exchange. Features include chat, audio calls, and learning resources.',
      startDate: 'January 2024',
      teamSize: 2,
      role: 'Co-founder & UX Designer',
      achievements: [
        'Selected for the Youth Innovation Incubator Program',
        '500+ beta testers registered',
        'Featured in local tech magazine',
      ],
      points: 3,
    },
  ],

  // Sports Achievements (up to 5 points)
  sportsAchievements: [
    {
      id: 'sa1',
      sport: 'Swimming',
      competition: 'Central Asian Youth Swimming Championship',
      level: 'Regional',
      place: '3rd Place (100m Freestyle)',
      date: 'August 2023',
      location: 'Bishkek, Kyrgyzstan',
      description:
        'Represented the school team in this regional competition. Achieved personal best time of 54.32 seconds.',
      points: 2,
      certificate: '/certificates/swimming-championship.pdf',
    },
    {
      id: 'sa2',
      sport: 'Chess',
      competition: 'District School Chess Tournament',
      level: 'District',
      place: '1st Place',
      date: 'March 2024',
      location: 'Tashkent, Uzbekistan',
      description:
        'Won the district chess championship, qualifying for the city-wide competition.',
      points: 1,
      certificate: '/certificates/chess-tournament.pdf',
    },
  ],

  // Creative Achievements (up to 5 points)
  creativeAchievements: [
    {
      id: 'ca1',
      title: 'Youth Photography Exhibition',
      type: 'Art',
      level: 'Regional',
      place: 'Selected Exhibitor',
      date: 'April 2024',
      location: 'Samarkand, Uzbekistan',
      description:
        'Series of photographs documenting traditional Uzbek craftsmanship was selected among 200+ submissions for this prestigious youth exhibition.',
      points: 2,
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
    {
      id: 'ca2',
      title: 'School Music Festival',
      type: 'Music',
      level: 'School',
      place: '1st Place (Instrumental Category)',
      date: 'December 2023',
      location: 'Tashkent, Uzbekistan',
      description:
        'Performed an original piano composition inspired by traditional Uzbek melodies.',
      points: 2,
      certificate: '/certificates/music-festival.pdf',
    },
  ],

  // Competitions (up to 5 points)
  competitions: [
    {
      id: 'co1',
      name: 'Youth Innovation Hackathon',
      type: 'Hackathon',
      level: 'National',
      place: '2nd Place',
      date: 'February 2024',
      location: 'Tashkent, Uzbekistan',
      description:
        'Developed a prototype app for connecting local farmers to urban markets during this 48-hour hackathon.',
      teamSize: 4,
      role: 'Technical Lead',
      points: 3,
      certificate: '/certificates/hackathon.pdf',
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
    {
      id: 'co2',
      name: 'Science Project Competition',
      type: 'Science Fair',
      level: 'Regional',
      place: 'Finalist',
      date: 'October 2023',
      location: 'Bukhara, Uzbekistan',
      description:
        'Presented research on sustainable energy solutions for rural communities in Uzbekistan.',
      teamSize: 2,
      role: 'Lead Researcher',
      points: 1,
      certificate: '/certificates/competition.pdf',
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
  ],

  // Exchanges (up to 10 points)
  exchanges: [
    {
      id: 'ex1',
      name: 'Global Youth Leadership Program',
      type: 'Summer School',
      duration: 'Medium-term',
      institution: 'Harvard University',
      country: 'United States',
      startDate: 'June 2023',
      endDate: 'August 2023',
      description:
        'Participated in this intensive summer program focusing on leadership, global challenges, and cross-cultural communication. Attended lectures by renowned professors and worked on team projects with students from 25 countries.',
      learningOutcomes: [
        'Developed advanced leadership and team management skills',
        'Gained understanding of global sustainability challenges',
        'Improved English proficiency and presentation skills',
        'Established international network of peers',
      ],
      points: 6,
      certificate: '/certificates/harvard-program.pdf',
      images: [
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
      ],
    },
  ],
};
