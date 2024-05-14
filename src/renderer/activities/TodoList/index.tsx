import React, { useCallback, useEffect, useState } from 'react';
import { Text, Stack } from '@mantine/core';
import Item from './Item';
import AddTask from './AddTask';
import { useListState } from '@mantine/hooks';
import { TodoItem } from 'src/common/type/todo';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { nanoid } from 'nanoid';
import { now } from 'lodash';
import { ActvityTitleRightSideSlot } from '../ActivityRender';

const TodoList: React.FC<{}> = () => {
  const [loading, setLoading] = useState(true);
  const [values, { setState, prepend, applyWhere, filter }] = useListState(
    [] as TodoItem[]
  );
  useEffect(() => {
    api()
      .post('/api/todo/get-list')
      .then(({ data }) => {
        setState(data as TodoItem[]);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
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
    <>
      <ActvityTitleRightSideSlot>
        <AddTask onClick={handleAddTask} />
      </ActvityTitleRightSideSlot>
      <Text c={'gray'}>An intuitive task management solution.</Text>
      {values.length === 0 && !loading && (
        <Text>No Item. Click "Add" to add one.</Text>
      )}
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
    </>
  );
};

export default TodoList;
