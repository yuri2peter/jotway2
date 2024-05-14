import React, { useMemo } from 'react';
import {
  Checkbox,
  Group,
  Stack,
  Text,
  Input,
  Tooltip,
  CloseButton,
} from '@mantine/core';
import dayjs from 'dayjs';
import { TodoItem } from 'src/common/type/todo';
import { debounce, now } from 'lodash';

const Item: React.FC<{
  item: TodoItem;
  onChange: (item: TodoItem) => void;
  onDelete: (itemId: string) => void;
}> = ({ item, onChange, onDelete }) => {
  const handleChange = useMemo(() => debounce(onChange, 500), [onChange]);
  return (
    <Group pr={'xl'} wrap="nowrap">
      <Checkbox
        size="lg"
        color="gray"
        variant="outline"
        checked={item.completed}
        onChange={(e) =>
          onChange({ ...item, completed: e.target.checked, updatedAt: now() })
        }
      />
      <Stack gap={0} style={{ flex: 1 }}>
        <Input
          style={{ opacity: !item.completed ? 1 : 0.4 }}
          variant="unstyled"
          size="md"
          placeholder="Task Name"
          spellCheck={false}
          defaultValue={item.title}
          onChange={(e) => {
            handleChange({ ...item, title: e.target.value });
          }}
        />
        <Tooltip label={dayjs(item.updatedAt).format('MMM-DD HH:mm')}>
          <Text size="xs" c="gray" lh={'inherit'}>
            {dayjs(item.updatedAt).fromNow()}
          </Text>
        </Tooltip>
      </Stack>
      <CloseButton onClick={() => onDelete(item.id)} />
    </Group>
  );
};

export default Item;
