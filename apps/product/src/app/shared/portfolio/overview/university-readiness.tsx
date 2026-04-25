import React from 'react';
import { Text, Title, Progressbar } from 'rizzui';
import {
  PiChartPie,
  PiBrain,
  PiTranslate,
  PiHandshake,
  PiBooks,
  PiMedal,
  PiLightbulb,
  PiSoccerBall,
  PiPaintBrush,
  PiRocketLaunch,
  PiGlobe,
} from 'react-icons/pi';

interface RatingProps {
  ratings: {
    total: number;
    breakdown: {
      name: string;
      score: number;
      maxScore: number;
    }[];
  };
}

const UniversityReadiness: React.FC<RatingProps> = ({ ratings }) => {
  // Map of icons for each category
  const categoryIcons: Record<string, React.ReactElement> = {
    SAT: <PiBrain className="h-5 w-5" />,
    IELTS: <PiTranslate className="h-5 w-5" />,
    'Social Projects': <PiHandshake className="h-5 w-5" />,
    'Additional Courses': <PiBooks className="h-5 w-5" />,
    Olympiads: <PiMedal className="h-5 w-5" />,
    Projects: <PiLightbulb className="h-5 w-5" />,
    Sports: <PiSoccerBall className="h-5 w-5" />,
    Creative: <PiPaintBrush className="h-5 w-5" />,
    Competitions: <PiRocketLaunch className="h-5 w-5" />,
    Exchanges: <PiGlobe className="h-5 w-5" />,
  };

  // Map of colors for each category
  const categoryColors: Record<string, string> = {
    SAT: 'bg-blue-600',
    IELTS: 'bg-emerald-600',
    'Social Projects': 'bg-pink-600',
    'Additional Courses': 'bg-violet-600',
    Olympiads: 'bg-amber-600',
    Projects: 'bg-cyan-600',
    Sports: 'bg-orange-600',
    Creative: 'bg-fuchsia-600',
    Competitions: 'bg-red-600',
    Exchanges: 'bg-lime-600',
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-mainBlue p-2.5 text-white">
          <PiChartPie className="h-6 w-6" />
        </div>
        <div>
          <Title as="h3" className="text-xl font-bold">
            University Application Readiness Score
          </Title>
          <Text className="text-gray-500">
            Based on the National Program&apos;s 100-point rating system
          </Text>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-8 rounded-lg bg-gray-50 p-5 dark:bg-gray-800/30">
        <div className="mb-2 flex items-center justify-between">
          <Text className="text-lg font-semibold">Overall Score</Text>
          <Text className="text-2xl font-bold text-mainBlue">
            {ratings.total} / 100
          </Text>
        </div>
        <Progressbar
          value={ratings.total}
          color="success"
          label="points"
          size="xl"
          className="h-3 rounded-full"
        />
        <Text className="mt-2 text-sm text-gray-500">
          Your overall score determines your competitiveness for university
          applications.
        </Text>
      </div>

      {/* Score Breakdown */}
      <Title as="h4" className="mb-4 text-lg font-semibold">
        Score Breakdown
      </Title>
      <div className="grid gap-4 md:grid-cols-2">
        {ratings.breakdown.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-mainBlue hover:shadow-sm dark:border-gray-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full p-1.5 text-white ${categoryColors[item.name] || 'bg-gray-600'}`}
                >
                  {categoryIcons[item.name] || (
                    <PiChartPie className="h-5 w-5" />
                  )}
                </div>
                <Text className="font-medium">{item.name}</Text>
              </div>
              <Text className="font-bold">
                {item.score} / {item.maxScore}
              </Text>
            </div>
            <Progressbar
              value={(item.score / item.maxScore) * 100}
              color={
                item.score >= item.maxScore * 0.7
                  ? 'success'
                  : item.score >= item.maxScore * 0.4
                    ? 'warning'
                    : 'danger'
              }
              size="md"
              label="points"
              className="h-1.5 rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityReadiness;
