import { Text } from 'rizzui';
import Card from '@/app/shared/card';
import { PiMedalDuotone, PiTrophyDuotone } from 'react-icons/pi';
import Section from '@/app/shared/section';
interface CourseIncludesProps {
  includes: Array<{ icon: string; text: string }>;
}

const CourseIncludes: React.FC<CourseIncludesProps> = ({ includes }) => {
  return (
    <Card className="p-6">
      <Section
        title="What This Course Includes"
        icon={<PiTrophyDuotone className="h-5 w-5" />}
        className="mb-6"
      >
        <div className="space-y-4">
          {includes.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mainBlue/10 text-mainBlue">
                <PiMedalDuotone className="h-5 w-5 text-mainBlue" />
              </div>
              <Text className="text-sm font-medium">{item.text}</Text>
            </div>
          ))}
        </div>
      </Section>
    </Card>
  );
};

export default CourseIncludes;
