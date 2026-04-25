import React from 'react';
import { Text, Title } from 'rizzui';
import {
  PiHeadsetBold,
  PiClockBold,
  PiInfoBold,
  PiArrowCircleRightBold,
  PiQuestionBold,
  PiVideoBold,
} from 'react-icons/pi';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';

const SupportHeader: React.FC = () => {
  return (
    <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-300 dark:bg-gray-100/30">
      <div className="flex flex-col sm:flex-row">
        <div className="mb-6 sm:mb-0 sm:mr-6">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <PiHeadsetBold className="h-6 w-6" />
            </span>
            <Title
              as="h2"
              className="text-xl font-bold text-gray-800 dark:text-gray-600 sm:text-2xl"
            >
              Advisor Support Center
            </Title>
          </div>

          <Text className="mt-4 text-gray-600 dark:text-gray-500">
            Find answers to common questions, troubleshoot issues, and get the
            help you need to be successful in your advising role.
          </Text>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <PiClockBold className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-500">
                Support Hours: 8AM-6PM Monday-Friday
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PiInfoBold className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-500">
                Response Time: 12-24 hours
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 shrink-0">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/20">
            <Title
              as="h3"
              className="mb-2 text-lg font-semibold text-blue-700 dark:text-blue-400"
            >
              Quick Resources
            </Title>

            <ul className="space-y-2">
              <li>
                <Link
                  href={routes.resources.guidelines}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  <PiArrowCircleRightBold className="h-4 w-4" />
                  <span className="text-sm">Getting Started Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href={routes.resources.guidelines}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  <PiVideoBold className="h-4 w-4" />
                  <span className="text-sm">Guidelines & Videos</span>
                </Link>
              </li>
              <li>
                <Link
                  href={routes.resources.faqs}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  <PiQuestionBold className="h-4 w-4" />
                  <span className="text-sm">Advisor FAQs</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;
