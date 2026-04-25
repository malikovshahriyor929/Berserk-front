import { z } from 'zod';
import { messages } from '@/config/messages';

// Define sub-schemas for nested objects
const testBreakdownSchema = z.object({
  Reading: z.string().optional(),
  Listening: z.string().optional(),
  Writing: z.string().optional(),
  Speaking: z.string().optional(),
});

const testScoreSchema = z.object({
  name: z.string().min(1, { message: 'Test name is required' }),
  date: z.string().optional(),
  score: z.string().optional(),
  breakdown: testBreakdownSchema,
});

const courseSchema = z.object({
  code: z.string().min(1, { message: 'Course code is required' }),
  name: z.string().min(1, { message: 'Course name is required' }),
  credits: z.string().min(1, { message: 'Credits are required' }),
  grade: z.string().optional(),
});

const certificateSchema = z.object({
  name: z.string().min(1, { message: 'Certificate name is required' }),
  date: z.string().optional(),
  expiry: z.string().optional(),
  file: z.any().optional(),
});

// Main schema for the entire student form
export const createStudentSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, { message: messages.nameIsRequired }),
  email: z.string().email({ message: messages.emailIsRequired }),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  profilePhoto: z.any().optional(),

  // Academic Information
  faculty: z.string().min(1, { message: 'Faculty is required' }),
  yearOfStudy: z.string().min(1, { message: 'Year of study is required' }),
  enrollmentDate: z.string().min(1, { message: 'Enrollment date is required' }),
  graduationDate: z.string().optional(),
  advisor: z.string().min(1, { message: 'Academic advisor is required' }),
  gpa: z.string().optional(),
  cefr: z.string().optional(),
  readinessScore: z.string().optional(),
  status: z.string().min(1, { message: 'Student status is required' }),

  // Nested arrays for additional data
  testScores: z.array(testScoreSchema).optional().default([]),
  courses: z.array(courseSchema).optional().default([]),
  certificates: z.array(certificateSchema).optional().default([]),
});

// Generate form types from zod validation schema
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
