import { useState } from 'react';
import { Input, Button, Text, Badge, ActionIcon, Title } from 'rizzui';
import { PiTagBold, PiXBold } from 'react-icons/pi';

interface TagsInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

export default function TagsInput({
  tags,
  onAddTag,
  onRemoveTag,
}: TagsInputProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="rounded-lg border border-mainBlue/50 dark:border-gray-300 p-5 shadow-sm">
      <Title
        as="h4"
        className="mb-5 flex text-mainBlue dark:text-gray-700 items-center gap-2 border-b border-dashed pb-3"
      >
        <span className="rounded-md bg-blue-50 p-2 text-mainBlue dark:text-blue-600">
          <PiTagBold className="h-5 w-5" />
        </span>
        Tags
      </Title>

      <div className="mb-4">
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            disabled={!newTag.trim()}
            className="flex-shrink-0"
          >
            Add
          </Button>
        </div>

        {tags && tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                size='sm'
                variant="outline"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm"
              >
                {tag}
                <ActionIcon
                  size="sm"
                  variant="text"
                  onClick={() => onRemoveTag(index)}
                >
                  <PiXBold className="h-3 w-3" />
                </ActionIcon>
              </Badge>
            ))}
          </div>
        ) : (
          <Text className="mt-2 text-sm text-gray-500">
            No tags added yet. Tags help with organizing tasks.
          </Text>
        )}
      </div>
    </div>
  );
}
