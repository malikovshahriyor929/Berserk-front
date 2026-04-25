'use client';

import { Badge, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { initialState } from '@/app/shared/explore-courses/courses-filter-utils';
import { useFilterControls } from '@core/hooks/use-filter-control';

export const tags = [
  {
    name: 'All',
    value: '245',
  },
  {
    name: 'Business',
    value: '53',
  },
  {
    name: 'Computer Science',
    value: '64',
  },
  {
    name: 'Personal Statement',
    value: '9',
  },
  {
    name: 'IELTS',
    value: '7',
  },
  {
    name: 'Writing',
    value: '16',
  },
];

interface TagProps {
  name: string;
  value: string;
}

function Tag({ name, value }: TagProps) {
  const { state, applyFilter } = useFilterControls<typeof initialState, any>(
    initialState
  );

  const isActive = state['tag'] === name || (name === 'All' && !state['tag']);

  return (
    <Button
      rounded="pill"
      variant={isActive ? 'solid' : 'outline'}
      className={cn(
        'group flex cursor-pointer items-center text-xs gap-2 px-2 py-1.5 h-fit transition-colors duration-200',
        isActive
          ? 'bg-mainBlue text-white hover:bg-mainBlue/90'
          : 'hover:border-mainBlue hover:text-mainBlue'
      )}
      onClick={() => applyFilter('tag', name === 'All' ? '' : name)}
    >
      {name}
      <Badge
        size="sm"
        rounded="lg"
        variant="flat"
        className={cn(
          'bg-gray-900/10 text-gray-600 transition duration-150 dark:bg-gray-900/20',
          isActive && 'bg-white/20 text-white'
        )}
      >
        {value}
      </Badge>
    </Button>
  );
}

export function CoursesFilterTags({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div>
      {title && <p className="mb-1.5">{title}</p>}
      <div className={cn('flex gap-3 py-1 overflow-auto', className)}>
        {tags.map((tag, index) => (
          <Tag {...tag} key={'tag-' + index + tag.name} />
        ))}
      </div>
    </div>
  );
}
