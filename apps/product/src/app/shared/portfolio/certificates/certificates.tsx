'use client';

import React, { useState } from 'react';
import { Badge, Title, Text, ActionIcon } from 'rizzui';
import {
  PiCertificate,
  PiPencil,
  PiTrash,
  PiCalendarBlank,
  PiClockCountdown,
  PiDownload,
  PiTrophy,
  PiStar,
  PiMedal,
} from 'react-icons/pi';
import Card from '@/app/shared/card';
import { portfolioData } from '@/data/portfolio-data';
import ModalButton from '@/app/shared/modal-button';
import toast from 'react-hot-toast';

interface Certificate {
  name: string;
  date: string;
  expiry: string;
  issuer: string;
  url?: string;
}

export default function Certificates() {
  const certificates = portfolioData.certificates;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  // Handle delete function
  const handleDelete = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteModalOpen(true);
    toast.success(`Certificate "${certificate.name}" would be deleted`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Summary Section */}
      <div className="col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2.5 dark:bg-amber-900/30">
              <PiMedal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <Text className="text-sm text-gray-500">Total Certificates</Text>
              <Title as="h4" className="text-xl font-bold">
                {certificates.length}
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
                7/10
              </Title>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="flat" color="warning" className="px-3 py-1">
              <PiTrophy className="mr-1 h-4 w-4" />
              Points Scale: 0-4 (School), 5-8 (Regional), 9-10 (International)
            </Badge>
          </div>
        </div>
      </div>

      {certificates.map((cert, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <PiCertificate className="h-6 w-6" />
                </div>
                <div>
                  <Title as="h4" className="text-base font-medium">
                    {cert.name}
                  </Title>
                  <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <PiCalendarBlank className="mr-1 inline-block h-4 w-4" />
                    Issued: {cert.date}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    <PiClockCountdown className="mr-1 inline-block h-4 w-4" />
                    Valid until: {cert.expiry}
                  </Text>
                  <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Issuer: {cert.issuer}
                  </Text>
                </div>
              </div>
              <Badge size="sm" color="success">
                5 points
              </Badge>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Badge
                rounded="lg"
                size="sm"
                variant="outline"
                className="cursor-pointer border-blue-400 text-blue-700"
                onClick={() => toast.success(`Downloading ${cert.name}`)}
              >
                <PiDownload className="mr-1 h-4 w-4" />
                Download
              </Badge>

              <div className="flex gap-2">
                <ModalButton
                  customSize={700}
                  size="sm"
                  label=""
                  icon={<PiPencil className="h-4 w-4" />}
                  className="w-fit"
                  view={
                    <div className="grid place-content-center p-10">
                      Edit Certificate Form
                    </div>
                  }
                />
                <ActionIcon
                  size="sm"
                  variant="flat"
                  color="danger"
                  rounded="lg"
                  onClick={() => handleDelete(cert)}
                  className="h-8 w-8 px-2"
                >
                  <PiTrash className="h-4 w-4" />
                </ActionIcon>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
