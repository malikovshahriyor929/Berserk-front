import { routes } from '@/config/routes';

interface pageLinksType {
  name: string;
  id?: number;
  percentage?: number;
  description?: string;
  date?: string;
  avatar?: string;
  href?: string;
  venue?: string;
  taskDeadline?: string;
}
export const pageLinks: pageLinksType[] = [
  { name: 'Students' },
  {
    name: 'Alice Johnson',
    id: 101,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Robert Smith',
    id: 102,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Emily Davis',
    id: 103,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'James Wilson',
    id: 104,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Sophia Martinez',
    id: 105,
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Daniel Lee',
    id: 106,
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Grace Kim',
    id: 107,
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Michael Brown',
    id: 108,
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    href: routes.eCommerce.dashboard,
  },

  { name: 'Sessions' },
  {
    name: 'Mathematics: Calculus Workshop',
    date: '2025-10-03',
    avatar: 'https://img.freepik.com/free-photo/close-up-student-learning-math_23-2148906744.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'Physics: Quantum Mechanics',
    date: '2025-10-05',
    avatar: 'https://img.freepik.com/free-photo/physics-formulas-with-pencil-chalkboard_23-2148181342.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'IELTS Speaking Practice',
    date: '2025-10-10',
    avatar: 'https://img.freepik.com/free-photo/english-exam-test-education-concept_53876-123443.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'SAT Mock Test',
    date: '2025-10-12',
    avatar: 'https://img.freepik.com/free-photo/checklist-with-marker-planning-strategy-goals_53876-104345.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'University Application Seminar',
    date: '2025-10-15',
    avatar: 'https://img.freepik.com/free-photo/graduation-hat-with-diploma_1150-11036.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'Academic Writing Workshop',
    date: '2025-10-20',
    avatar: 'https://img.freepik.com/free-photo/open-book-with-light-bulb-creative-idea_53876-17403.jpg',
    href: routes.schedules.attendance,
  },
  {
    name: 'Career Guidance Session',
    date: '2025-10-25',
    avatar: 'https://img.freepik.com/free-photo/career-path-start-goals-choice-strategy_53876-126342.jpg',
    href: routes.schedules.attendance,
  },

  { name: 'Meetings' },
  {
    name: 'Advising with Alice Johnson',
    id: 101,
    venue: 'Zoom',
    avatar: 'https://img.freepik.com/free-photo/person-talking-computer_23-2149307350.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Check-in with Robert Smith',
    id: 102,
    venue: 'Microsoft Teams',
    avatar: 'https://img.freepik.com/free-photo/working-office-laptop-computer_1150-1051.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Progress Review with Emily Davis',
    id: 103,
    venue: 'Google Meet',
    avatar: 'https://img.freepik.com/free-photo/business-meeting-group-conference-room_53876-101783.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Feedback Session with James Wilson',
    id: 104,
    venue: 'UCA-112',
    avatar: 'https://img.freepik.com/free-photo/teacher-female-teaching-students-classroom_23-2148999116.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Career Planning with Sophia Martinez',
    id: 105,
    venue: 'Zoom',
    avatar: 'https://img.freepik.com/free-photo/meeting-planning-organization-appointment-concept_53876-164139.jpg',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Study Abroad Consultation',
    id: 106,
    venue: 'Google Meet',
    avatar: 'https://img.freepik.com/free-photo/young-student-study-abroad_53876-101013.jpg',
    href: routes.eCommerce.dashboard,
  },

  { name: 'Readiness' },
  {
    name: 'Overall Readiness',
    percentage: 78,
    avatar: 'https://img.freepik.com/free-photo/target-business-goals-achievement-strategy-success_53876-101252.jpg',
    href: routes.analyticsReports.readinessDashboard,
  },
  {
    name: 'Academic Readiness',
    percentage: 66,
    avatar: 'https://img.freepik.com/free-photo/young-man-studying-library_23-2149378430.jpg',
    href: routes.analyticsReports.readinessDashboard,
  },
  {
    name: 'Social Readiness',
    percentage: 55,
    avatar: 'https://img.freepik.com/free-photo/community-people-support-hand_53876-105466.jpg',
    href: routes.analyticsReports.readinessDashboard,
  },
  {
    name: 'Career Readiness',
    percentage: 49,
    avatar: 'https://img.freepik.com/free-photo/teamwork-people-achieving-business-goals_53876-126341.jpg',
    href: routes.analyticsReports.readinessDashboard,
  },

  { name: 'Tasks & Assignments' },
  {
    name: 'Draft Research Paper on AI',
    taskDeadline: '2025-10-20',
    avatar: 'https://img.freepik.com/free-photo/data-protection-privacy-concept_23-2149197193.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Design Engineering Prototype',
    taskDeadline: '2025-10-22',
    avatar: 'https://img.freepik.com/free-photo/engineer-planning-construction-project_53876-101287.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Portfolio Website Creation',
    taskDeadline: '2025-10-25',
    avatar: 'https://img.freepik.com/free-photo/creative-web-design-agency_53876-94835.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Essay: Future of Robotics',
    taskDeadline: '2025-10-28',
    avatar: 'https://img.freepik.com/free-photo/ai-robot-human-hand-connection-future-technology-innovation_53876-128209.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Prepare Personal Statement',
    taskDeadline: '2025-10-30',
    avatar: 'https://img.freepik.com/free-photo/hand-writing-text-paper-document_53876-32262.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Complete Academic CV',
    taskDeadline: '2025-11-02',
    avatar: 'https://img.freepik.com/free-photo/job-search-employment-recruitment-application-concept_53876-145671.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Finalize Application Documents',
    taskDeadline: '2025-11-05',
    avatar: 'https://img.freepik.com/free-photo/documents-paperwork_53876-87212.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Conduct User Interviews',
    taskDeadline: '2025-11-10',
    avatar: 'https://img.freepik.com/free-photo/job-interview-employment-career-concept_53876-146011.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Prepare Group Presentation',
    taskDeadline: '2025-11-12',
    avatar: 'https://img.freepik.com/free-photo/group-people-presenting-project_53876-128123.jpg',
    href: routes.tasks.allTasks,
  },
  {
    name: 'Submit Weekly Report',
    taskDeadline: '2025-11-15',
    avatar: 'https://img.freepik.com/free-photo/business-analytics-concept_53876-101876.jpg',
    href: routes.tasks.allTasks,
  },
];
