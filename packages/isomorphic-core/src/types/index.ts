import { CouponType } from "../config/enums";

export interface Lesson {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'text' | 'quiz';
  duration: string;
  thumbnail?: string;
  videoUrl?: string;
  pdfUrl?: string;
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  topics?: string[];
  completed: boolean;
  comingSoon?: boolean;
  progressPercentage: number;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  level: string;
  slug: string;
  duration: string;
  totalHours: number;
  totalDays: number;
  registeredUpcoming: number;
  language: string;
  startDate: string;
  instructor: Instructor;
  assignedStudents: Student[];
  students: Student[];
  courseContent: string;
  thumbnail: string;
  category?: string;
  videoPreview?: string;
  rating: number;
  reviews: number;
  tags: string[];
  includes: Array<{
    icon: string;
    text: string;
  }>;
  syllabus: Array<{
    day: number;
    title: string;
    duration: string;
    time: string;
    topics: string[];
  }>;
  lessons: Lesson[]; // New field for lessons
};

export interface Instructor {
  name: string;
  username: string;
  title: string;
  avatar: string;
  id: string;
  email?: string;
  rating?: number;
  totalStudents?: number;
  education?: string;
  degree?: string;
  joinedDate?: string;
  specialization?: string;
}
export interface Student {
  id: string;
  avatar: string;
  username: string;
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  color: string;
  buttonColor: string;
  questions: number;
  duration: number; // in minutes
  isCompleted?: boolean; 
}

export interface PracticeTest {
  id: string;
  sections: Section[];
  isCompleted: boolean;
  progress: number; // 0-100 percentage
}

export interface MockExam {
  id: string;
  title: string;
  type: "IELTS" | "SAT";
  month: string;
  year: string;
  thumbnail: string;
  rating: number;
  votes: number;
  publishedDate: string;
  testsTaken: number;
  practiceSets: PracticeTest[];
  sections: Section[];
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

export type TestMode = "practice" | "simulation";

export interface TestOptions {
  mode: TestMode;
  selectedSections: string[];
  timeLimit?: number;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface TestProgress {
  examId: string;
  practiceId: string;
  section: string;
  currentQuestionIndex: number;
  answers: Answer[];
  timeRemaining: number;
}


export interface Coupon {
  id: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export type Product = {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
};

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
};
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}

export type LayoverAirPortOptionType = {
  id: number;
  name: string;
  isGroupTitle?: boolean;
  checked?: boolean;
  disabled?: boolean;
};

export type TanTableProductsDataType = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
};
