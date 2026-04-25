'use client';

import {
  Avatar,
  Badge,
  Button,
  Select,
  Tooltip,
  Title,
  Text,
  Modal, Input, ActionIcon,
} from 'rizzui';
import {
  PiEyeBold,
  PiFunnelBold,
  PiPaperclipBold,
  PiXBold,
} from 'react-icons/pi';
import { useState } from 'react';
import ModalButton from "@shared//modal-button.tsx";
import RubricChangeRequestReview from "@shared//assessments/history/view-history";

const categories = [
  { id: 'sat', name: 'SAT', description: 'Standardized test result (max 30 pts)', maxPoint: 30 },
  { id: 'ielts', name: 'IELTS', description: 'English proficiency exam (max 15 pts)', maxPoint: 15 },
  { id: 'volunteering', name: 'Volunteering', description: 'Social impact activities (max 5 pts)', maxPoint: 5 },
  { id: 'extraCourses', name: 'Extra Courses', description: 'Additional academic subjects (max 5 pts)', maxPoint: 5 },
  { id: 'olympiads', name: 'Olympiads', description: 'Academic competitions (max 10 pts)', maxPoint: 10 },
  { id: 'projects', name: 'Projects', description: 'Startups or research (max 10 pts)', maxPoint: 10 },
  { id: 'sports', name: 'Sports', description: 'Athletic achievements (max 5 pts)', maxPoint: 5 },
  { id: 'arts', name: 'Arts', description: 'Creative works and awards (max 5 pts)', maxPoint: 5 },
  { id: 'hackathons', name: 'Hackathons', description: 'Innovation & tech competitions (max 5 pts)', maxPoint: 5 },
  { id: 'exchanges', name: 'Exchanges', description: 'Exchange/internship programs (max 10 pts)', maxPoint: 10 },
];

const changeRequests = [
  {
    id: 'R001',
    student: {
      id: 'N001',
      name: 'Ali Karimov',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
    },
    category: 'sat',
    from: 20,
    to: 25,
    reason: 'Retook SAT with higher score, attached certificate.',
    status: 'pending',
    date: '2025-07-24',
    attachment: true,
  },
  {
    id: 'R002',
    student: {
      id: 'N003',
      name: 'Bobur Soliyev',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-03.webp',
    },
    category: 'volunteering',
    from: 2,
    to: 4,
    reason: 'Submitted new hours with supervisor approval.',
    status: 'approved',
    date: '2025-07-23',
    attachment: true,
  },
  {
    id: 'R003',
    student: {
      id: 'N005',
      name: 'Timur Aliyev',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
    },
    category: 'arts',
    from: 3,
    to: 5,
    reason: 'Won international music competition.',
    status: 'rejected',
    date: '2025-07-22',
    attachment: false,
  },
  {
    id: 'R004',
    student: {
      id: 'N006',
      name: 'Dilorom Yusupova',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp',
    },
    category: 'extraCourses',
    from: 3,
    to: 5,
    reason: 'Completed two additional online courses.',
    status: 'approved',
    date: '2025-07-21',
    attachment: true,
  },
  {
    id: 'R005',
    student: {
      id: 'N007',
      name: 'Shaxzod Mirzayev',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    },
    category: 'projects',
    from: 5,
    to: 9,
    reason: 'Submitted a new startup project with pitch deck.',
    status: 'pending',
    date: '2025-07-20',
    attachment: true,
  },
  {
    id: 'R006',
    student: {
      id: 'N008',
      name: 'Lola Ergasheva',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-08.webp',
    },
    category: 'hackathons',
    from: 2,
    to: 5,
    reason: 'Won 1st place at international hackathon.',
    status: 'approved',
    date: '2025-07-19',
    attachment: false,
  },
  {
    id: 'R007',
    student: {
      id: 'N009',
      name: 'Ismoil Saidov',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-09.webp',
    },
    category: 'exchanges',
    from: 0,
    to: 8,
    reason: 'Completed 3-week internship at German university.',
    status: 'pending',
    date: '2025-07-18',
    attachment: true,
  },
  {
    id: 'R008',
    student: {
      id: 'N010',
      name: 'Madina Qosimova',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-10.webp',
    },
    category: 'olympiads',
    from: 6,
    to: 10,
    reason: 'Gold medal in national math olympiad.',
    status: 'approved',
    date: '2025-07-17',
    attachment: true,
  },
];

export default function RubricChangeRequests() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<(typeof changeRequests)[number] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = changeRequests.filter(
      (r) => filterStatus === 'all' || r.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'info';
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
      <div className="space-y-6">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Score (from → to)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Attachment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
            </thead>
            <tbody>
            {filtered.map((r) => (
                <tr
                    key={r.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={r.student.avatar} name={r.student.name} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900">{r.student.name}</div>
                        <div className="text-xs text-gray-500">ID: {r.student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{categories.find((c) => c.id === r.category)?.name}</td>
                  <td className="px-4 py-3">{r.from} → {r.to}</td>
                  <td className="px-4 py-3">
                    <Badge color={getStatusColor(r.status)}>{capitalize(r.status)}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{r.date}</td>
                  <td className="px-4 py-3">
                    {r.attachment ? (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <PiPaperclipBold className="h-4 w-4" /> Attached
                        </div>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3">

                    <ModalButton
                        label="View"
                        icon={<PiEyeBold className="w-4 h-4" />}
                        view={<RubricChangeRequestReview request={r} />}
                        customSize={600}
                        className="w-25 h-9 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-mainBlue bg-white text-mainBlue hover:bg-mainBlue/10 transition-colors rounded-md shadow-sm"
                    />
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>



      </div>
  );
}
