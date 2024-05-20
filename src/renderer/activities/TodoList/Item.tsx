import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [innerItem, setInnerItem] = useState(item);
  const pushChanges = useMemo(() => debounce(onChange, 500), [onChange]);
  const handleChange = useCallback(
    (newItem: TodoItem) => {
      setInnerItem(newItem);
      pushChanges(newItem);
    },
    [pushChanges]
  );
  useEffect(() => {
    setInnerItem(item);
  }, [item]);
  return (
    <Group pr={'xl'} wrap="nowrap">
      <Checkbox
        size="lg"
        color="gray"
        variant="outline"
        checked={innerItem.completed}
        onChange={(e) =>
          handleChange({
            ...innerItem,
            completed: e.target.checked,
            updatedAt: now(),
          })
        }
      />
      <Stack gap={0} style={{ flex: 1 }}>
        <Input
          style={{ opacity: !innerItem.completed ? 1 : 0.4 }}
          variant="unstyled"
          size="md"
          placeholder="Task Name"
          spellCheck={false}
          value={innerItem.title}
          onChange={(e) => {
            handleChange({ ...innerItem, title: e.target.value });
          }}
        />
        <Tooltip label={dayjs(innerItem.updatedAt).format('MMM-DD HH:mm')}>
          <Text size="xs" c="gray" lh={'inherit'}>
            {dayjs(innerItem.updatedAt).fromNow()}
          </Text>
        </Tooltip>
      </Stack>
      <CloseButton onClick={() => onDelete(item.id)} />
    </Group>
  );
};

export default Item;
