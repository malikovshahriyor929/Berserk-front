import React from 'react';
import { InfoBadge, AlertBox } from '../shared-components';
import {
  PiStar,
  PiCheckCircleBold,
  PiUsersBold,
  PiSealCheckBold,
  PiNoteBold,
} from 'react-icons/pi';

export default function ProgramOverview() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-4">
        <InfoBadge
          color="blue"
          className="mb-2"
          icon={<PiStar className="h-3 w-3" />}
        >
          Program Mission
        </InfoBadge>
        <p>
          The student advising program is designed to provide personalized
          guidance and support to students throughout their academic journey. As
          an advisor, you play a crucial role in ensuring students develop the
          skills and mindset necessary for success.
        </p>
      </div>

      <p>
        This guide outlines the expectations, responsibilities, and best
        practices for advisors in our program.
      </p>

      <AlertBox type="info" title="Vision Statement">
        <p className="font-medium">
          To empower every student with the guidance, resources, and support
          they need to achieve their full potential academically, socially, and
          professionally.
        </p>
      </AlertBox>

      <div className="mt-4 flex flex-wrap gap-2">
        <InfoBadge
          color="green"
          icon={<PiCheckCircleBold className="h-3 w-3" />}
        >
          Evidence-based
        </InfoBadge>
        <InfoBadge color="blue" icon={<PiUsersBold className="h-3 w-3" />}>
          Student-centered
        </InfoBadge>
        <InfoBadge
          color="purple"
          icon={<PiSealCheckBold className="h-3 w-3" />}
        >
          Research-backed
        </InfoBadge>
        <InfoBadge color="amber" icon={<PiNoteBold className="h-3 w-3" />}>
          Comprehensive
        </InfoBadge>
      </div>
    </div>
  );
}
