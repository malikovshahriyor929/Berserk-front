import React from 'react';
import {
  PiMapPin,
  PiFlag,
  PiHouse,
  PiBuildings,
  PiCalendar,
} from 'react-icons/pi';
import Section from '../shared/section';
import InfoBlock from '../shared/info-block';

interface LocationSectionProps {
  student: any; // Replace with proper type
}

const LocationSection: React.FC<LocationSectionProps> = ({ student }) => {
  return (
    <Section
      title="Location Information"
      icon={<PiMapPin className="h-5 w-5" />}
    >
      <div className="grid gap-5 md:grid-cols-1">
        <InfoBlock
          icon={<PiFlag className="h-5 w-5 text-blue-600" />}
          title="Place of Birth"
          value={student.birthplace}
        />
        <InfoBlock
          icon={<PiHouse className="h-5 w-5 text-green-600" />}
          title="Permanent Address"
          value={student.address}
        />
        <InfoBlock
          icon={<PiBuildings className="h-5 w-5 text-amber-600" />}
          title="Current Residence"
          value={student.residentialAddress}
        />
        <InfoBlock
          icon={<PiCalendar className="h-5 w-5 text-purple-600" />}
          title="Date of Birth"
          value={student.dateOfBirth}
        />
      </div>
    </Section>
  );
};

export default LocationSection;
