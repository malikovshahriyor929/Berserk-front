'use client';

import React, { useState } from 'react';
import {
  PiQuestionBold,
  PiMagnifyingGlassBold,
  PiBookOpenBold,
  PiUsersThreeBold,
  PiNotePencilBold,
  PiChartLineBold,
  PiArrowSquareOutBold,
  PiChatCenteredTextBold,
} from 'react-icons/pi';
import { Button, Input, Text, Title } from 'rizzui';

// Import components
import FaqItem from './advisor-faqs/faq-item';

// Import FAQ content components
import StudentRecordsUpdate from './advisor-faqs/student-records-update';
import StudentAttendanceIssues from './advisor-faqs/student-attendance-issues';
import CounselorReferral from './advisor-faqs/counselor-referral';

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

export default function AdvisorFaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0); // Default first FAQ open

  const faqItems = [
    {
      id: 0,
      question: 'How often should I update student records?',
      answer: <StudentRecordsUpdate />,
      category: 'records',
    },
    {
      id: 1,
      question: 'What do I do if a student is not attending advising sessions?',
      answer: <StudentAttendanceIssues />,
      category: 'students',
    },
    {
      id: 2,
      question: 'Can I refer a student to a counselor directly?',
      answer: <CounselorReferral />,
      category: 'referrals',
    },
    // Add more FAQ items here as needed
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Function to handle FAQ expansion - ensures only one is open at a time
  const handleFaqToggle = (faqId: number) => {
    setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
  };

  // Define categories for filtering
  const categories = [
    {
      id: 'all',
      name: 'All Questions',
      icon: <PiQuestionBold className="h-5 w-5" />,
    },
    {
      id: 'records',
      name: 'Records & Documentation',
      icon: <PiNotePencilBold className="h-5 w-5" />,
    },
    {
      id: 'students',
      name: 'Student Support',
      icon: <PiUsersThreeBold className="h-5 w-5" />,
    },
    {
      id: 'sessions',
      name: 'Advising Sessions',
      icon: <PiBookOpenBold className="h-5 w-5" />,
    },
    {
      id: 'metrics',
      name: 'Analytics',
      icon: <PiChartLineBold className="h-5 w-5" />,
    },
    {
      id: 'referrals',
      name: 'Referrals',
      icon: <PiArrowSquareOutBold className="h-5 w-5" />,
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: <PiChatCenteredTextBold className="h-5 w-5" />,
    },
  ];

  return (
    <div className="@container">
      <div className="mx-auto max-w-full px-2">
        <SectionTitle
          icon={<PiQuestionBold className="h-5 w-5" />}
          title="Advisor Help & FAQs"
        />

        <div className="mb-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for questions, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
              inputClassName="pl-12 h-12"
              prefix={
                <PiMagnifyingGlassBold className="h-5 w-5 text-gray-500" />
              }
              clearable={true}
              onClear={() => setSearchQuery('')}
            />
          </div>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max space-x-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'solid' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center"
                color={activeCategory === category.id ? 'secondary' : 'primary'}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isExpanded={expandedFaqId === faq.id}
                onToggle={() => handleFaqToggle(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-300 dark:bg-gray-100/50">
            <Title
              as="h3"
              className="mb-2 text-lg font-semibold dark:text-gray-600"
            >
              No FAQ items found
            </Title>
            <Text className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </Text>
            <Button
              color="primary"
              className="mt-4 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
