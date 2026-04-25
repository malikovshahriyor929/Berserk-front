'use client';

import React, { useState } from 'react';
import { Badge, Text, Title, Avatar, ActionIcon } from 'rizzui';
import {
  PiHandshake,
  PiCalendar,
  PiClock,
  PiUsersFour,
  PiMedal,
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';

interface SocialProject {
  id: string;
  name: string;
  organization: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  hours: number;
  impact: string;
  points: number;
  participants: number;
  images?: string[];
}

export default function SocialProjects() {
  const projects = portfolioData.socialProjects;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<SocialProject | null>(
    null
  );

  // Handle delete function
  const handleDelete = (project: SocialProject) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
    toast.success(`Social project "${project.name}" would be deleted`);
  };

  // Calculate total volunteer hours
  const totalHours = projects.reduce(
    (total, project) => total + project.hours,
    0
  );

  // Calculate total points
  const totalPoints = projects.reduce(
    (total, project) => total + project.points,
    0
  );

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/30">
              <PiHandshake className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Total Projects</Text>
              <Title as="h4" className="text-xl font-bold">
                {projects.length}
              </Title>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <PiClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Volunteer Hours</Text>
              <Title as="h4" className="text-xl font-bold">
                {totalHours}
              </Title>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
              <PiMedal className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Rating Points</Text>
              <Title as="h4" className="text-xl font-bold">
                {totalPoints}/5
              </Title>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-pink-200 hover:shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:bg-gray-800/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Title as="h4" className="text-lg font-semibold">
                  {project.name}
                </Title>
                <Badge variant="flat" color="success" className="font-semibold">
                  {project.points} points
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <PiCalendar className="h-4 w-4" />
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiClock className="h-4 w-4" />
                  <span>{project.hours} hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiUsersFour className="h-4 w-4" />
                  <span>{project.participants} participants</span>
                </div>
              </div>

              <Text className="mb-4">
                <span className="font-medium text-gray-700">Role: </span>
                {project.role} at {project.organization}
              </Text>

              <Text className="text-gray-700">{project.description}</Text>

              <div className="mt-4 flex flex-col gap-1">
                <Text className="font-medium text-gray-700">Impact:</Text>
                <Text className="italic text-gray-600">{project.impact}</Text>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {project.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100 object-cover"
                    >
                      <img
                        src={img}
                        alt={`Project ${project.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <ModalButton
                  customSize={700}
                  size="sm"
                  label=""
                  icon={<PiPencil className="h-4 w-4" />}
                  className="w-fit"
                  view={
                    <div className="grid place-content-center p-10">
                      Edit Form
                    </div>
                  }
                />
                <ActionIcon
                  size="sm"
                  rounded="lg"
                  variant="flat"
                  color="danger"
                  onClick={() => handleDelete(project)}
                  className="h-8 w-8 px-2"
                >
                  <PiTrash className="h-4 w-4" />
                </ActionIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
