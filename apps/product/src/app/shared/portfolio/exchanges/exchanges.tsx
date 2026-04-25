'use client';

import React, { useState } from 'react';
import { Badge, Text, Title, ActionIcon } from 'rizzui';
import {
  PiGlobe,
  PiCalendar,
  PiMapPin,
  PiStar,
  PiGraduationCap,
  PiBuildings,
  PiClock,
  PiPencil,
  PiTrash,
} from 'react-icons/pi';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Exchange {
  id: string;
  name: string;
  type: string;
  duration: string;
  institution: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  learningOutcomes: string[];
  points: number;
  certificate?: string;
  images?: string[];
}

export default function Exchanges() {
  const exchanges = portfolioData.exchanges;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );

  // Handle delete function
  const handleDelete = (exchange: Exchange) => {
    setSelectedExchange(exchange);
    setIsDeleteModalOpen(true);
    toast.success(`Exchange program "${exchange.name}" would be deleted`);
  };

  // Calculate total points
  const totalPoints = exchanges.reduce(
    (total, exchange) => total + exchange.points,
    0
  );

  // Get badge color based on duration
  const getDurationColor = (duration: string) => {
    switch (duration) {
      case 'Short-term':
        return 'bg-amber-600 text-white';
      case 'Medium-term':
        return 'bg-blue-600 text-white';
      case 'Long-term':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Get point description based on duration
  const getPointDescription = (duration: string) => {
    switch (duration) {
      case 'Short-term':
        return '2-3 points (1-2 weeks)';
      case 'Medium-term':
        return '4-6 points (1-3 months)';
      case 'Long-term':
        return '7-10 points (6+ months)';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-300/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green/30 p-2.5 dark:bg-lime-900/30">
              <PiGlobe className="h-5 w-5 text-green dark:text-lime-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">
                Exchanges & Programs
              </Text>
              <Title as="h4" className="text-xl font-bold">
                {exchanges.length}
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
            <Badge variant="flat" color="success" className="px-3 py-1">
              <PiGlobe className="mr-1 h-4 w-4" />
              Points Scale based on program duration
            </Badge>
          </div>
        </div>
      </div>

      {/* Exchanges List */}
      <div className="space-y-4">
        {exchanges.map((exchange, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-lime-200 hover:shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:bg-gray-800/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={getDurationColor(exchange.duration)}>
                    {exchange.duration}
                  </Badge>
                  <Title as="h4" className="text-lg font-semibold">
                    {exchange.name}
                  </Title>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="flat"
                    color="success"
                    className="font-semibold"
                  >
                    {exchange.points} points
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {exchange.type}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <PiBuildings className="h-4 w-4" />
                  <span>{exchange.institution}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiMapPin className="h-4 w-4" />
                  <span>{exchange.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiCalendar className="h-4 w-4" />
                  <span>
                    {exchange.startDate} - {exchange.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PiClock className="h-4 w-4" />
                  <span>{getPointDescription(exchange.duration)}</span>
                </div>
              </div>

              <Text className="mb-4 text-gray-700">{exchange.description}</Text>

              {exchange.learningOutcomes &&
                exchange.learningOutcomes.length > 0 && (
                  <div className="mb-4">
                    <Text className="mb-2 font-medium text-gray-700">
                      Learning Outcomes:
                    </Text>
                    <ul className="list-inside list-disc space-y-1 text-gray-600">
                      {exchange.learningOutcomes.map((outcome, i) => (
                        <li key={i}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {exchange.images && exchange.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {exchange.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        width={200}
                        height={100}
                        src={img}
                        alt={`Exchange ${exchange.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex justify-between gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                {exchange.certificate && (
                  <Badge
                    variant="outline"
                    color="success"
                    rounded="lg"
                    size="sm"
                    className="cursor-pointer border-green text-green"
                    onClick={() => toast.success('Certificate viewed')}
                  >
                    <PiGraduationCap className="mr-1 h-4 w-4" />
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
                        Edit Exchange Program Form
                      </div>
                    }
                  />
                  <ActionIcon
                    size="sm"
                    rounded="lg"
                    variant="flat"
                    color="danger"
                    onClick={() => handleDelete(exchange)}
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
