"use client";

import PageHeader from '@/app/shared/page-header';
import Card from '@/app/shared/card';
import PortfolioHeader from './portfolio-header';
import UniversityReadiness from './university-readiness';
import { portfolioData } from '@/data/portfolio-data';
import { metaObject } from '@/config/site.config';
export const metadata = {
  ...metaObject('Portfolio Overview'),
  description:
    'Overview of your academic profile, test scores, and university application readiness.',
};

export default function PortfolioOverviewPage() {
  // Calculate overall rating based on the platform's 100-point scale
  const overallRating = {
    total: portfolioData.ratings.total,
    breakdown: [
      { name: 'SAT', score: portfolioData.ratings.sat, maxScore: 30 },
      { name: 'IELTS', score: portfolioData.ratings.ielts, maxScore: 15 },
      {
        name: 'Social Projects',
        score: portfolioData.ratings.socialProjects,
        maxScore: 5,
      },
      {
        name: 'Additional Courses',
        score: portfolioData.ratings.additionalCourses,
        maxScore: 5,
      },
      {
        name: 'Olympiads',
        score: portfolioData.ratings.olympiads,
        maxScore: 10,
      },
      { name: 'Projects', score: portfolioData.ratings.projects, maxScore: 10 },
      { name: 'Sports', score: portfolioData.ratings.sports, maxScore: 5 },
      { name: 'Creative', score: portfolioData.ratings.creative, maxScore: 5 },
      {
        name: 'Competitions',
        score: portfolioData.ratings.competitions,
        maxScore: 5,
      },
      {
        name: 'Exchanges',
        score: portfolioData.ratings.exchanges,
        maxScore: 10,
      },
    ],
  };

  return (
    <>
      <div className="space-y-8">
        {/* Student Overview Card with Header */}
        <PortfolioHeader
          student={portfolioData}
          overallRating={overallRating}
        />

        {/* University Readiness Score */}
        <Card className="overflow-hidden p-6">
          <UniversityReadiness ratings={overallRating} />
        </Card>
      </div>
    </>
  );
}
