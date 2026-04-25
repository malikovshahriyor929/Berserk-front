import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// Define education schema
const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
});

// Define a schema for research interest
const researchInterestSchema = z.object({
  value: z.string(),
});

// form zod validation schema
export const profileFormSchema = z.object({
  // Basic information
  username: z.string().min(1, { message: messages.usernameIsRequired }),
  name: z.string().min(1, { message: messages.nameIsRequired }),
  website: z.string().optional(),

  // Contact information
  email: validateEmail,
  phone: z.string().optional(),
  office: z.string().optional(),
  officeHours: z.string().optional(),

  // Professional information
  department: z.string().optional(),
  position: z.string().optional(),
  specialization: z.string().optional(),
  joinDate: z.string().optional(),

  // Academic information
  bio: z.string().optional(),
  education: z.array(educationSchema).optional(),
  researchInterests: z.array(researchInterestSchema).optional(),

  // Media and files
  avatar: fileSchema.optional(),
  portfolios: z.array(fileSchema).optional(),
});

// generate form types from zod validation schema
export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export const defaultValues = {
  username: 'mbarrows',
  name: 'Dr. Maryam Barrows',
  website: 'https://faculty.newuu.uz/mbarrows',
  email: 'maryam.barrows@newuu.uz',
  phone: '+998(93)765-43-21',
  office: 'Building B, Room 305',
  officeHours: 'Mon, Wed: 13:00-15:00, Thu: 10:00-12:00',
  department: 'Computer Science',
  position: 'Associate Professor',
  specialization: 'Machine Learning & AI Systems',
  joinDate: '15 Aug 2018',
  bio: 'Dr. Maryam Barrows is an Associate Professor of Computer Science specializing in artificial intelligence and machine learning. With over 15 years of academic and industry experience, she leads research on ethical AI applications in healthcare and education.',
  education: [
    {
      degree: 'Ph.D in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      year: '2012',
    },
    {
      degree: 'M.Sc in Artificial Intelligence',
      institution: 'Stanford University',
      year: '2008',
    },
    {
      degree: 'B.Sc in Computer Engineering',
      institution: 'California Institute of Technology',
      year: '2006',
    },
  ],
  researchInterests: [
    { value: 'Ethical AI Development' },
    { value: 'Machine Learning Applications in Healthcare' },
    { value: 'Computer Vision' },
    { value: 'Natural Language Processing' },
    { value: 'Educational Technology' },
  ],
  avatar: undefined,
  portfolios: undefined,
};
