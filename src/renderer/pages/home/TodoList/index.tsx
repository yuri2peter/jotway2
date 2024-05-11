import React, { useCallback, useEffect } from 'react';
import { Breadcrumbs, Text, Stack, Group } from '@mantine/core';
import Item from './Item';
import ActivityLayout from 'src/renderer/components/layouts/ActivityLayout';
import { IconListCheck } from '@tabler/icons-react';
import AddTask from './AddTask';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import { useListState } from '@mantine/hooks';
import { TodoItem } from 'src/common/type/todo';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { nanoid } from 'nanoid';
import { now } from 'lodash';

const TodoList: React.FC<{}> = () => {
  const [values, { setState, prepend, applyWhere, filter }] = useListState(
    [] as TodoItem[]
  );
  useEffect(() => {
    api()
      .post('/api/todo/get-list')
      .then(({ data }) => {
        setState(data as TodoItem[]);
      });
  }, [setState]);
  const handleAddTask = useCallback(() => {
    const newTask: TodoItem = {
      id: nanoid(),
      title: '',
      completed: false,
      updatedAt: now(),
    };
    prepend(newTask);
    api().post('/api/todo/upsert-item', newTask).catch(apiErrorHandler);
  }, [prepend]);
  const handleUpdateTask = useCallback(
    (updatedItem: TodoItem) => {
      applyWhere(
        (item) => item.id === updatedItem.id,
        () => updatedItem
      );
      api().post('/api/todo/upsert-item', updatedItem).catch(apiErrorHandler);
    },
    [applyWhere]
  );
  const handleDeleteTask = useCallback(
    (itemId: string) => {
      filter((item) => item.id !== itemId);
      api()
        .post('/api/todo/delete-item', { id: itemId })
        .catch(apiErrorHandler);
    },
    [filter]
  );
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Stack gap={'xl'}>
          <Breadcrumbs>
            <Text c="gray">Tools</Text>
            <Text>To-Do List</Text>
          </Breadcrumbs>
        </Stack>
      }
    >
      <Stack mb={'lg'}>
        <Group>
          <IconListCheck size={32} />
          <Text size={'32px'}>To-Do List</Text>
          <FlexGrow />
          <AddTask onClick={handleAddTask} />
        </Group>
        <Text c={'gray'}>An intuitive task management solution.</Text>
      </Stack>
      {values.length === 0 && <Text>No Item. Click "Add" to add one.</Text>}
      <Stack gap={'lg'}>
        {values.map((item) => (
          <Item
            key={item.id}
            item={item}
            onChange={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </Stack>
    </ActivityLayout>
  );
};

export default TodoList;
