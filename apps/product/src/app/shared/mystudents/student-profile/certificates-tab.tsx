import React from 'react';
import { Badge, Title, Text } from 'rizzui';
import { PiCertificate } from 'react-icons/pi';
import Card from '../../card';

interface CertificatesTabProps {
  certificates: any[]; // Replace with proper type
}

const CertificatesTab: React.FC<CertificatesTabProps> = ({ certificates }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    Issued: {cert.date}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Valid until: {cert.expiry}
                  </Text>
                </div>
              </div>
              <Badge color="success">Verified</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CertificatesTab;
