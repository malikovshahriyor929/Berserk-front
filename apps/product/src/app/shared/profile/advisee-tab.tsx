import React from 'react';
import {Link} from '@/i18n/routing';
import { Avatar, Badge, Text, Button } from 'rizzui';
import { PiArrowRight, PiEnvelopeSimple } from 'react-icons/pi';

interface Advisee {
  id: string;
  name: string;
  program: string;
  avatar: string;
  status: string;
}

interface AdviseeTabProps {
  advisees: Advisee[];
}

const AdviseeTab: React.FC<AdviseeTabProps> = ({ advisees }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {advisees.map((advisee, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
            <Avatar src={advisee.avatar} name={advisee.name} size="md" />
            <div className="flex-1 overflow-hidden">
              <Text className="truncate font-medium">{advisee.name}</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {advisee.id}
              </Text>
            </div>
            <Badge
              color={
                advisee.status === 'On-Track'
                  ? 'success'
                  : advisee.status === 'Review Needed'
                    ? 'warning'
                    : advisee.status === 'New Student'
                      ? 'info'
                      : 'secondary'
              }
              className="h-6 px-2 text-xs"
            >
              {advisee.status}
            </Badge>
          </div>

          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Program
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {advisee.program}
              </Text>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <Button
                variant="text"
                color="primary"
                size="sm"
                className="h-8"
                onClick={() =>
                  window.open(
                    `mailto:student-${advisee.id.toLowerCase()}@newuu.uz`
                  )
                }
              >
                <PiEnvelopeSimple className="h-4 w-4" />
                <span className="ml-1 text-xs">Email</span>
              </Button>

              <Link href={`/mystudents/${advisee.id}/`}>
                <Button
                  variant="outline"
                  color="primary"
                  size="sm"
                  className="h-8"
                >
                  <span className="text-xs">View Profile</span>
                  <PiArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdviseeTab;
