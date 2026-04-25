'use client';

import {
  Avatar,
  Badge,
  Title,
  Text,
  Tooltip,
  Progressbar,
} from 'rizzui';
import { PiInfoFill } from 'react-icons/pi';
type CategoryId =
    | 'sat'
    | 'ielts'
    | 'volunteering'
    | 'extraCourses'
    | 'olympiads'
    | 'projects'
    | 'sports'
    | 'arts'
    | 'hackathons'
    | 'exchanges';

type ScoreMap = Record<CategoryId, number>;
const categories: {
  id: CategoryId;
  name: string;
  description: string;
  maxPoint: number;
}[] = [
  { id: 'sat', name: 'SAT', description: 'Standardized test result (max 30 pts)', maxPoint: 30 },
  { id: 'ielts', name: 'IELTS', description: 'English proficiency exam (max 15 pts)', maxPoint: 15 },
  { id: 'volunteering', name: 'Volunteering', description: 'Social projects and volunteer hours (max 5 pts)', maxPoint: 5 },
  { id: 'extraCourses', name: 'Extra Courses', description: 'Additional subjects/courses (max 5 pts)', maxPoint: 5 },
  { id: 'olympiads', name: 'Olympiads', description: 'Academic competitions (max 10 pts)', maxPoint: 10 },
  { id: 'projects', name: 'Projects', description: 'Startups or research projects (max 10 pts)', maxPoint: 10 },
  { id: 'sports', name: 'Sports', description: 'Athletic achievements (max 5 pts)', maxPoint: 5 },
  { id: 'arts', name: 'Arts', description: 'Creative achievements (max 5 pts)', maxPoint: 5 },
  { id: 'hackathons', name: 'Hackathons', description: 'Hackathons and contests (max 5 pts)', maxPoint: 5 },
  { id: 'exchanges', name: 'Exchanges', description: 'Exchange programs and internships (max 10 pts)', maxPoint: 10 },
];

const students: {
  id: string;
  name: string;
  avatar: string;
  scores: ScoreMap;
}[] = [
  {
    id: 'N001',
    name: 'Ali Karimov',
    avatar: '/images/avatar/avatar-1.webp',
    scores: {
      sat: 25, ielts: 12, volunteering: 4, extraCourses: 5, olympiads: 9,
      projects: 8, sports: 3, arts: 4, hackathons: 3, exchanges: 7,
    },
  },
  {
    id: 'N002',
    name: 'Dildora Yoqubova',
    avatar: '/images/avatar/avatar-2.webp',
    scores: {
      sat: 20, ielts: 10, volunteering: 5, extraCourses: 5, olympiads: 10,
      projects: 9, sports: 4, arts: 3, hackathons: 4, exchanges: 8,
    },
  },
  {
    id: 'N003',
    name: 'Bobur Soliyev',
    avatar: '/images/avatar/avatar-3.webp',
    scores: {
      sat: 15, ielts: 6, volunteering: 3, extraCourses: 2, olympiads: 6,
      projects: 4, sports: 1, arts: 1, hackathons: 1, exchanges: 3,
    },
  },
  {
    id: 'N004',
    name: 'Kamola Rakhimova',
    avatar: '/images/avatar/avatar-4.webp',
    scores: {
      sat: 30, ielts: 15, volunteering: 5, extraCourses: 5, olympiads: 10,
      projects: 10, sports: 5, arts: 5, hackathons: 5, exchanges: 10,
    },
  },
  {
    id: 'N005',
    name: 'Timur Aliyev',
    avatar: '/images/avatar/avatar-5.webp',
    scores: {
      sat: 10, ielts: 5, volunteering: 1, extraCourses: 2, olympiads: 3,
      projects: 2, sports: 1, arts: 2, hackathons: 1, exchanges: 2,
    },
  },
  {
    id: 'N006',
    name: 'Shahnoza Saidova',
    avatar: '/images/avatar/avatar-6.webp',
    scores: {
      sat: 22, ielts: 10, volunteering: 3, extraCourses: 4, olympiads: 7,
      projects: 7, sports: 4, arts: 3, hackathons: 2, exchanges: 6,
    },
  },
  {
    id: 'N007',
    name: 'Jasur Bekmurodov',
    avatar: '/images/avatar/avatar-7.webp',
    scores: {
      sat: 28, ielts: 14, volunteering: 5, extraCourses: 5, olympiads: 9,
      projects: 9, sports: 5, arts: 4, hackathons: 5, exchanges: 9,
    },
  },
];

export default function StudentRubricGrid() {
  return (
      <div className="space-y-6">
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-50">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 w-[250px]">
                Student
              </th>
              {categories.map((category) => (
                  <th
                      key={category.id}
                      className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 min-w-[140px]"
                  >
                    <Tooltip
                        content={category.description}
                        placement="top"
                        className="max-w-xs"
                    >
                    <span className="flex items-center gap-1 cursor-help">
                      {category.name}
                      <PiInfoFill className="h-4 w-4 text-gray-400" />
                    </span>
                    </Tooltip>
                  </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 min-w-[120px]">
                Total Points
              </th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => {
              const total = Object.values(student.scores).reduce((sum, val) => sum + val, 0);
              return (
                  <tr
                      key={student.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="sticky left-0 z-10 bg-white px-4 py-3 min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} src={student.avatar} />
                        <div>
                          <div className="font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-xs text-gray-500">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>
                    {categories.map((category) => (
                        <td key={category.id} className="px-4 py-3">
                          <div className="text-xs font-medium text-gray-600">
                            {student.scores[category.id]} / {category.maxPoint} pts
                          </div>
                          <Progressbar
                              value={Math.round((student.scores[category.id] / category.maxPoint) * 100)}
                              size="sm"
                              color={getProgressColor(
                                  Math.round((student.scores[category.id] / category.maxPoint) * 100)
                              )}
                              className="mt-1 w-[120px]"
                          />
                        </td>
                    ))}
                    <td className="px-4 py-3 text-gray-700 font-semibold">
                      {total} / 100 pts
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
  );
}

function getProgressColor(score: number): 'success' | 'info' | 'warning' | 'danger' {
  if (score >= 85) return 'success';
  if (score >= 70) return 'info';
  if (score >= 50) return 'warning';
  return 'danger';
}
