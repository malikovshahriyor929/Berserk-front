'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { AtRiskStudent } from './at-risk-data';
import { Badge, Button, Title, Text } from 'rizzui';
import {
  PiXBold,
  PiEnvelopeBold,
  PiFlagBold,
  PiUserCircleBold,
  PiShapesBold,
  PiClockBold,
  PiCheckCircleBold,
} from 'react-icons/pi';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import TableAvatar from '@core/ui/avatar-card';

export default function StudentRiskDetail({
  student,
  onClose,
}: {
  student: AtRiskStudent;
  onClose: () => void;
}) {
  const radarData = [
    {
      subject: 'Rubric Average',
      A: student.indicators.rubricAverage,
      fullMark: 100,
    },
    {
      subject: 'Task Completion',
      A: student.indicators.taskCompletion,
      fullMark: 100,
    },
    {
      subject: 'Attendance',
      A: Math.max(0, 100 - student.indicators.missedSessions * 33.3),
      fullMark: 100,
    },
  ];

  // Format dates for the chart
  const historyData = student.history.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    riskScore: item.riskScore,
  }));

  // Get color based on risk level
  const getRiskColor = () => {
    switch (student.riskLevel) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  // Section title component for form sections
  interface SectionTitleProps {
    icon: React.ReactNode;
    title: string;
  }

  const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
    <div className="my-3 mr-2 flex flex-1 items-center border-b border-dashed border-gray-500 pb-3">
      <span className="mr-2 rounded-md bg-[#043764]/10 dark:bg-gray-100 p-2 text-[#043764] dark:text-blue-600">
        {icon}
      </span>
      <h3 className="text-lg font-bold text-gray-600">{title}</h3>
    </div>
  );

  // Render the student risk detail card
  return (
    <WidgetCard
      title={
        <div className="flex items-center gap-5">
          <TableAvatar src={student.avatar} name={student.name} />
          <span>Risk Assessment: {student.name}</span>
        </div>
      }
      action={
        <Button
          variant="text"
          onClick={onClose}
          className="h-auto p-0 text-gray-500 hover:text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </Button>
      }
      headerClassName="mb-4"
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <SectionTitle
                icon={<PiCheckCircleBold className="h-5 w-5" />}
                title="Risk Score"
              />
              <div className="flex items-center gap-2">
                <Title as="h3" className="ml-4 text-2xl font-semibold">
                  {student.riskScore}/100
                </Title>
                <Badge
                  className={`${
                    student.riskLevel === 'high'
                      ? 'bg-red-100 text-red-600'
                      : student.riskLevel === 'medium'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-green-100 text-green-600'
                  }`}
                >
                  {student.riskLevel === 'high'
                    ? 'High Risk'
                    : student.riskLevel === 'medium'
                      ? 'Medium Risk'
                      : 'Low Risk'}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                <PiEnvelopeBold className="me-1.5 h-4 w-4" />
                Message
              </Button>
              <Button size="sm" variant="outline">
                <PiFlagBold className="me-1.5 h-4 w-4" />
                Flag
              </Button>
              <Button size="sm">
                <PiUserCircleBold className="me-1.5 h-4 w-4" />
                Assign Support
              </Button>
            </div>
          </div>

          <div className="pb-5 pt-3">
            <Text className="mb-2 text-sm font-bold text-gray-600">
              Risk Indicators
            </Text>
            <div className="mx-4 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <Text className="text-sm">Rubric Average</Text>
                  <Badge
                    className={`${student.indicators.rubricAverage < 60 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {student.indicators.rubricAverage}%
                  </Badge>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${student.indicators.rubricAverage}%`,
                      backgroundColor:
                        student.indicators.rubricAverage < 60
                          ? '#EF4444'
                          : '#10B981',
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Text className="text-sm">Task Completion</Text>
                  <Badge
                    className={`${student.indicators.taskCompletion < 60 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {student.indicators.taskCompletion}%
                  </Badge>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${student.indicators.taskCompletion}%`,
                      backgroundColor:
                        student.indicators.taskCompletion < 60
                          ? '#EF4444'
                          : '#10B981',
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Text className="text-sm">Missed Sessions</Text>
                  <Badge
                    className={`${student.indicators.missedSessions > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {student.indicators.missedSessions}
                  </Badge>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, student.indicators.missedSessions * 33.3)}%`,
                      backgroundColor:
                        student.indicators.missedSessions > 0
                          ? '#EF4444'
                          : '#10B981',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <SectionTitle
              icon={<PiClockBold className="h-5 w-5" />}
              title="Risk Score History"
            />
            <div className="h-60 w-full pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.5}
                  />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    content={(props) => {
                      const { active, payload, label } = props;
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md">
                            <p className="text-sm">{`${label}`}</p>
                            <p className="text-sm font-semibold">
                              Risk Score: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="riskScore"
                    stroke={getRiskColor()}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle
            icon={<PiShapesBold className="h-5 w-5" />}
            title="Risk Factors Analysis"
          />
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Risk Factors"
                  dataKey="A"
                  stroke={getRiskColor()}
                  fill={getRiskColor()}
                  fillOpacity={0.6}
                />
                <Tooltip
                  content={(props) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md">
                          <p className="text-sm">
                            {payload[0].payload.subject}
                          </p>
                          <p className="text-sm font-semibold">
                            Score: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <SectionTitle
              icon={<PiEnvelopeBold className="h-5 w-5" />}
              title="Recommended Actions"
            />
            <div className="space-y-4">
              {student.riskScore > 70 && (
                <div className="relative rounded-md border border-red-200 bg-red-50/80 p-4 pl-12 dark:border-red-900/50 dark:bg-red-900/20">
                  <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-md dark:bg-red-600">
                    1
                  </div>
                  <Title
                    as="h4"
                    className="mb-1 text-base font-bold text-red-700 dark:text-red-400"
                  >
                    Schedule Immediate Meeting
                  </Title>
                  <Text className="text-sm text-red-600 dark:text-red-300">
                    Student needs immediate intervention. Schedule a one-on-one
                    meeting
                    {student.indicators.missedSessions > 0 && (
                      <span>
                        {' '}
                        to address{' '}
                        <Badge
                          variant="flat"
                          className="ml-1 bg-red-100 text-red-700 dark:bg-red-800/50 dark:text-red-200"
                        >
                          {student.indicators.missedSessions}
                        </Badge>{' '}
                        missed sessions.
                      </span>
                    )}
                  </Text>
                </div>
              )}

              {student.indicators.rubricAverage < 60 && (
                <div className="relative rounded-md border border-amber-200 bg-amber-50/80 p-4 pl-12 dark:border-amber-900/50 dark:bg-amber-900/20">
                  <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white shadow-md dark:bg-amber-600">
                    {student.riskScore > 70 ? '2' : '1'}
                  </div>
                  <Title
                    as="h4"
                    className="mb-1 text-base font-bold text-amber-700 dark:text-amber-400"
                  >
                    Academic Support
                  </Title>
                  <Text className="text-sm text-amber-600 dark:text-amber-300">
                    Consider tutoring or additional academic resources to
                    improve rubric score of{' '}
                    <Badge
                      variant="flat"
                      className="ml-1 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                    >
                      {student.indicators.rubricAverage}%
                    </Badge>
                  </Text>
                </div>
              )}

              {student.indicators.missedSessions > 0 &&
                student.riskScore <= 70 && (
                  <div className="relative rounded-md border border-blue-200 bg-blue-50/80 p-4 pl-12 dark:border-blue-900/50 dark:bg-blue-900/20">
                    <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white shadow-md dark:bg-blue-600">
                      {student.riskScore > 70 ||
                      student.indicators.rubricAverage < 60
                        ? student.riskScore > 70 &&
                          student.indicators.rubricAverage < 60
                          ? '3'
                          : '2'
                        : '1'}
                    </div>
                    <Title
                      as="h4"
                      className="mb-1 text-base font-bold text-blue-700 dark:text-blue-400"
                    >
                      Attendance Follow-up
                    </Title>
                    <Text className="text-sm text-blue-600 dark:text-blue-300">
                      Follow up about{' '}
                      <Badge
                        variant="flat"
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      >
                        {student.indicators.missedSessions}
                      </Badge>{' '}
                      missed sessions to understand underlying issues.
                    </Text>
                  </div>
                )}

              {student.indicators.taskCompletion < 60 && (
                <div className="relative rounded-md border border-indigo-200 bg-indigo-50/80 p-4 pl-12 dark:border-indigo-900/50 dark:bg-indigo-900/20">
                  <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white shadow-md dark:bg-indigo-600">
                    {(() => {
                      let count = 1;
                      if (student.riskScore > 70) count++;
                      if (student.indicators.rubricAverage < 60) count++;
                      if (
                        student.indicators.missedSessions > 0 &&
                        student.riskScore <= 70
                      )
                        count++;
                      return count;
                    })()}
                  </div>
                  <Title
                    as="h4"
                    className="mb-1 text-base font-bold text-indigo-700 dark:text-indigo-400"
                  >
                    Task Completion Plan
                  </Title>
                  <Text className="text-sm text-indigo-600 dark:text-indigo-300">
                    Create a structured plan to improve task completion rate
                    from current{' '}
                    <Badge
                      variant="flat"
                      className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                    >
                      {student.indicators.taskCompletion}%
                    </Badge>
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
