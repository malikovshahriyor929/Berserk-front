'use client';

import React, { useState } from 'react';
import { Badge, Text, Title, ActionIcon } from 'rizzui';
import {
  PiPaintBrush,
  PiCalendar,
  PiMapPin,
  PiStar,
  PiTrophy,
  PiMusicNote,
  PiFilmReel,
  PiMicrophoneStage,
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface CreativeAchievement {
  id: string;
  title: string;
  type: string;
  level: string;
  place: string;
  date: string;
  location: string;
  description: string;
  points: number;
  certificate?: string;
  images?: string[];
}

export default function Creative() {
  const achievements = portfolioData.creativeAchievements;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<CreativeAchievement | null>(null);

  // Handle delete function
  const handleDelete = (achievement: CreativeAchievement) => {
    setSelectedAchievement(achievement);
    setIsDeleteModalOpen(true);
    toast.success(
      `Creative achievement "${achievement.title}" would be deleted`
    );
  };

  // Calculate total points
  const totalPoints = achievements.reduce(
    (total, achievement) => total + achievement.points,
    0
  );

  // Get badge color based on level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'International':
        return 'bg-purple-600 text-white';
      case 'National':
        return 'bg-blue-600 text-white';
      case 'Regional':
        return 'bg-green-600 text-white';
      case 'District':
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
    if (place.includes('Participant')) return 'bg-blue-500 text-white';
    return 'bg-blue-500 text-white';
  };

  // Get icon based on creative type
  const getCreativeIcon = (type: string) => {
    switch (type) {
      case 'Music':
        return <PiMusicNote className="h-4 w-4" />;
      case 'Art':
        return <PiPaintBrush className="h-4 w-4" />;
      case 'Drama':
        return <PiMicrophoneStage className="h-4 w-4" />;
      case 'Film':
        return <PiFilmReel className="h-4 w-4" />;
      default:
        return <PiPaintBrush className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-fuchsia-100 p-2.5 dark:bg-fuchsia-900/30">
              <PiPaintBrush className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">
                Creative Achievements
              </Text>
              <Title as="h4" className="text-xl font-bold">
                {achievements.length}
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
            <Badge
              variant="flat"
              color="primary"
              className="px-3 py-1 text-white"
            >
              <PiTrophy className="mr-1 h-4 w-4" />
              Points Scale: School (1), Regional (2-3), International (4-5)
            </Badge>
          </div>
        </div>
      </div>

      {/* Creative Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-fuchsia-200 hover:shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:bg-gray-800/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={getLevelColor(achievement.level)}>
                    {achievement.level}
                  </Badge>
                  <Title as="h4" className="text-lg font-semibold">
                    {achievement.title}
                  </Title>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getPlaceBadge(achievement.place)}>
                    {achievement.place}
                  </Badge>
                  <Badge
                    variant="flat"
                    color="success"
                    className="font-semibold"
                  >
                    {achievement.points} points
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  {getCreativeIcon(achievement.type)}
                  <span>{achievement.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiCalendar className="h-4 w-4" />
                  <span>{achievement.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiMapPin className="h-4 w-4" />
                  <span>{achievement.location}</span>
                </div>
              </div>

              <Text className="text-gray-700">{achievement.description}</Text>

              {achievement.images && achievement.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {achievement.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        width={200}
                        height={100}
                        src={img}
                        alt={`Achievement ${achievement.title}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex justify-between gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                {achievement.certificate && (
                  <Badge
                    variant="outline"
                    color="secondary"
                    rounded="lg"
                    size="sm"
                    className="cursor-pointer border-fuchsia-400 text-fuchsia-700"
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
                        Edit Achievement
                      </div>
                    }
                  />
                  <ActionIcon
                    size="sm"
                    variant="flat"
                    color="danger"
                    rounded="lg"
                    onClick={() => handleDelete(achievement)}
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
