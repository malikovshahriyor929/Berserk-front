'use client';

import React, { useState } from 'react';
import {
  PiHeadsetBold,
  PiQuestionBold,
  PiBugBold,
  PiLightbulbBold,
  PiCheckCircleBold,
  PiClockClockwiseBold,
} from 'react-icons/pi';
import { Button, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';

// Import components
import SupportHeader from './help-support/support-header';
import SupportCategory from './help-support/support-category';
import FAQSection from './help-support/faq-section';
import ContactForm from './help-support/contact-form';
import StatusBadge from './help-support/status-badge';

// Section title component for form sections
interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
  <div className="mb-6 mr-2 flex flex-1 items-center border-b border-dashed border-gray-500 pb-3">
    <span className="mr-2 rounded-md bg-[#043764]/10 p-2 text-[#043764] dark:bg-gray-100 dark:text-blue-600">
      {icon}
    </span>
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-500">
      {title}
    </h3>
  </div>
);

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Support request history - in a real app, this would come from an API
  const supportRequests = [
    {
      id: 'SR-2023-0012',
      title: 'Access issue with student records',
      date: '2023-12-15',
      status: 'resolved',
      lastUpdate: '2 days ago',
    },
    {
      id: 'SR-2023-0008',
      title: 'Question about advising dashboard',
      date: '2023-12-05',
      status: 'in-progress',
      lastUpdate: '8 hours ago',
    },
    {
      id: 'SR-2023-0005',
      title: 'Feature request for reporting tool',
      date: '2023-11-28',
      status: 'pending',
      lastUpdate: '5 days ago',
    },
  ];

  // Handle form submission
  const handleSubmit = (formData: any) => {
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Reset after showing success message
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="@container">
      <div className="mx-auto max-w-full px-4">
        <SectionTitle
          icon={<PiHeadsetBold className="h-5 w-5" />}
          title="Help & Support"
        />

        <SupportHeader />

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            <SupportCategory
              icon={<PiQuestionBold className="h-6 w-6" />}
              title="FAQs"
              description="Browse our frequently asked questions"
              onClick={() => setActiveTab('faq')}
              active={activeTab === 'faq'}
            />

            <SupportCategory
              icon={<PiBugBold className="h-6 w-6" />}
              title="Contact Support"
              description="Get help from our support team"
              onClick={() => setActiveTab('contact')}
              active={activeTab === 'contact'}
            />
          </div>
        </div>

        {activeTab === 'faq' ? (
          <FAQSection />
        ) : (
          <>
            {submitted ? (
              <div className="rounded-lg border border-green-100 bg-green-50 p-6 text-center shadow-sm dark:border-green-800/30 dark:bg-green-900/20">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-300">
                  <PiCheckCircleBold className="h-8 w-8" />
                </div>
                <Title
                  as="h3"
                  className="mb-2 text-lg font-semibold text-green-700 dark:text-green-300"
                >
                  Support Request Submitted
                </Title>
                <Text className="mb-4 text-green-700 dark:text-green-300">
                  Thank you for your request. Our support team will review it
                  and respond within 24 hours.
                </Text>
                <Button
                  variant="outline"
                  color="secondary"
                  onClick={() => setActiveTab('faq')}
                >
                  Back to FAQs
                </Button>
              </div>
            ) : (
              <ContactForm onSubmit={handleSubmit} isSubmitting={submitting} />
            )}
          </>
        )}

        {/* Recent Support Requests Section */}
        {supportRequests.length > 0 && activeTab === 'contact' && (
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                Recent Support Requests
              </h3>
              <Button variant="text" color="primary" className="text-sm">
                View All
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-300 dark:bg-gray-100/50">
              <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-500 dark:border-gray-300 dark:bg-gray-200/40 dark:text-gray-600">
                <div className="col-span-2">ID</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Last Update</div>
              </div>

              {supportRequests.map((request, index) => (
                <div
                  key={request.id}
                  className={cn(
                    'grid grid-cols-12 items-center px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-200/20',
                    index < supportRequests.length - 1 &&
                      'border-b border-gray-100 dark:border-gray-300/30'
                  )}
                >
                  <div className="col-span-2 font-medium text-blue-600 dark:text-blue-500">
                    {request.id}
                  </div>
                  <div className="col-span-5">{request.title}</div>
                  <div className="col-span-2 text-sm text-gray-500 dark:text-gray-600">
                    {request.date}
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={request.status} />
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-1 text-sm text-gray-500 dark:text-gray-600">
                    <PiClockClockwiseBold className="h-3.5 w-3.5" />
                    <span>{request.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add padding at the bottom */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}
