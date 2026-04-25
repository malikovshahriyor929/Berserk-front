'use client';

import React, { useState } from 'react';
import { Badge, Text, Title, ActionIcon } from 'rizzui';
import {
  PiLightbulb,
  PiCalendar,
  PiUsers,
  PiLink,
  PiStar,
  PiArrowsClockwise,
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  startDate: string;
  endDate?: string;
  teamSize: number;
  role: string;
  achievements: string[];
  url?: string;
  points: number;
  images?: string[];
}

export default function Projects() {
  const projects = portfolioData.projects;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Calculate total points
  const totalPoints = projects.reduce(
    (total, project) => total + project.points,
    0
  );

  // Handle delete function
  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // In a real application, you would call an API to delete the project
    toast.success(`Successfully deleted ${selectedProject?.name} project`);
    setIsDeleteModalOpen(false);
    // In a real app, you would refresh the data after deletion
  };

  // Get badge color based on project type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research':
        return 'bg-blue-600 text-white';
      case 'Startup':
        return 'bg-green-600 text-white';
      case 'Development':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white';
      case 'In Progress':
        return 'bg-amber-600 text-white';
      case 'Published':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Get points description based on score
  const getPointsDescription = (points: number) => {
    if (points <= 3) return 'School-level project';
    if (points <= 7) return 'Significant project with confirmed results';
    return 'Project with significant funding/awards';
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cyan-100 p-2.5 dark:bg-cyan-900/30">
              <PiLightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Total Projects</Text>
              <Title as="h4" className="text-xl font-bold">
                {projects.length}
              </Title>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-2.5 dark:bg-purple-900/30">
              <PiStar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Rating Points</Text>
              <Title as="h4" className="text-xl font-bold">
                {totalPoints}/10
              </Title>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="flat" color="info" className="px-3 py-1 text-white">
              <PiArrowsClockwise className="mr-1 h-4 w-4" />
              Points Scale: 0-3 (School), 4-7 (Significant), 8-10
              (International)
            </Badge>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-cyan-200 hover:shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:bg-gray-800/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(project.type)}>
                    {project.type}
                  </Badge>
                  <Title as="h4" className="text-lg font-semibold">
                    {project.name}
                  </Title>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge
                    variant="flat"
                    color="success"
                    className="font-semibold"
                  >
                    {project.points} points
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <PiCalendar className="h-4 w-4" />
                  <span>
                    {project.startDate}
                    {project.endDate ? ` - ${project.endDate}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiUsers className="h-4 w-4" />
                  <span>Team Size: {project.teamSize}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiLightbulb className="h-4 w-4" />
                  <span>Role: {project.role}</span>
                </div>
              </div>

              <Text className="mb-4 text-gray-700">{project.description}</Text>

              {project.achievements && project.achievements.length > 0 && (
                <div className="mb-4">
                  <Text className="mb-2 font-medium text-gray-700">
                    Achievements:
                  </Text>
                  <ul className="list-inside list-disc space-y-1 text-gray-600">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex flex-wrap justify-between gap-2">
                <Badge variant="outline" color="info" className="px-3 py-1">
                  {getPointsDescription(project.points)}
                </Badge>

                <div className="flex items-center gap-2">
                  {project.url && (
                    <Badge
                      rounded='lg'
                      variant="outline"
                      className="cursor-pointer border-cyan-400 px-3 py-1 text-cyan-700"
                      onClick={() => toast.success(`Opening ${project.name} project link...`)}
                    >
                      <PiLink className="mr-1 h-4 w-4" />
                      View Project
                    </Badge>
                  )}
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {project.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        width={200}
                        height={100}
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
                  className='w-fit'
                  view={
                    <div className="grid place-content-center p-10">
                      Edit  Form
                    </div>
                  }
                />
                <ActionIcon
                  size="sm"
                  rounded='lg'
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

      {/* <DeleteDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title={`Delete ${selectedProject?.name}`}
        description="Are you sure you want to delete this project? This action cannot be undone."
      /> */}
    </div>
  );
}
