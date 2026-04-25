'use client';

import React, { useState } from 'react';
import { Badge, Text, Title, ActionIcon, Button } from 'rizzui';
import {
  PiRocketLaunch,
  PiCalendar,
  PiMapPin,
  PiStar,
  PiTrophy,
  PiUsers,
  PiBriefcase,
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import toast from 'react-hot-toast';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import Image from 'next/image';

interface Competition {
  id: string;
  name: string;
  type:
    | 'Hackathon'
    | 'Startup Competition'
    | 'Science Fair'
    | 'Case Competition'
    | 'Other'
    | string;
  level: 'Local' | 'Regional' | 'National' | 'International' | string;
  place: string;
  date: string;
  location: string;
  description: string;
  teamSize: number;
  role: string;
  points: number;
  certificate?: string;
  images?: string[];
}

export default function Competitions() {
  const competitions = portfolioData.competitions;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);

  // Calculate total points
  const totalPoints = competitions.reduce(
    (total, competition) => total + competition.points,
    0
  );

  // Handle delete function
  const handleDelete = (competition: Competition) => {
    setSelectedCompetition(competition);
    setIsDeleteModalOpen(true);
    toast.success(`Competition "${competition.name}" would be deleted`);
  };

  // Get badge color based on level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'International':
        return 'bg-purple-600 text-white';
      case 'National':
        return 'bg-blue-600 text-white';
      case 'Regional':
        return 'bg-green-600 text-white';
      case 'Local':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Get place badge style
  const getPlaceBadge = (place: string) => {
    if (place.includes('1')) return 'bg-amber-500 text-white';
    if (place.includes('2')) return 'bg-gray-400 text-white';
    if (place.includes('3')) return 'bg-amber-700 text-white';
    if (place.includes('Finalist')) return 'bg-blue-500 text-white';
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-2.5 dark:bg-red-900/30">
              <PiRocketLaunch className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Competitions</Text>
              <Title as="h4" className="text-xl font-bold">
                {competitions.length}
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
                {totalPoints}/5
              </Title>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="flat" color="danger" className="px-3 py-1">
              <PiTrophy className="mr-1 h-4 w-4" />
              Points Scale: Local (1), Regional/National (2-3), International
              (4-5)
            </Badge>
          </div>
        </div>
      </div>

      {/* Competitions List */}
      <div className="space-y-4">
        {competitions.map((competition, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-red-200 hover:shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:bg-gray-800/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={getLevelColor(competition.level)}>
                    {competition.level}
                  </Badge>
                  <Title as="h4" className="text-lg font-semibold">
                    {competition.name}
                  </Title>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getPlaceBadge(competition.place)}>
                    {competition.place}
                  </Badge>
                  <Badge
                    variant="flat"
                    color="success"
                    className="font-semibold"
                  >
                    {competition.points} points
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <PiBriefcase className="h-4 w-4" />
                  <span>{competition.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiCalendar className="h-4 w-4" />
                  <span>{competition.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiMapPin className="h-4 w-4" />
                  <span>{competition.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiUsers className="h-4 w-4" />
                  <span>Team Size: {competition.teamSize}</span>
                </div>
              </div>

              <Text className="mb-3">
                <span className="font-medium text-gray-700">Role: </span>
                {competition.role}
              </Text>

              <Text className="text-gray-700">{competition.description}</Text>

              {/* Check if images array exists before mapping over it */}
              {competition.images && competition.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {competition.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        width={200}
                        height={100}
                        src={img}
                        alt={`Competition ${competition.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between gap-2">
                {competition.certificate && (
                  <Badge
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    color="success"
                    className="cursor-pointer"
                    onClick={() => toast.success('Certificate viewed')}
                  >
                    <PiTrophy className="mr-1 h-4 w-4" />
                    View Certificate
                  </Badge>
                )}

                <div className="flex gap-2">
                  <ModalButton
                    customSize={700}
                    size="sm"
                    label=""
                    icon={<PiPencil className="h-4 w-4" />}
                    className="w-fit"
                    view={
                      <div className="grid place-content-center p-10">
                        Edit Competition Form
                      </div>
                    }
                  />
                  <ActionIcon
                    size="sm"
                    variant="flat"
                    rounded="lg"
                    color="danger"
                    onClick={() => handleDelete(competition)}
                    className="h-8 w-8 px-2"
                  >
                    <PiTrash className="h-4 w-4" />
                  </ActionIcon>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
