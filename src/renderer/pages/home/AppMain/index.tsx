import React from 'react';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import Jottings from '../Jottings';
import TodoList from '../TodoList';

const AppMain: React.FC<{}> = () => {
  const { type } = useGlobalStore((s) => s.activity);
  if (type === 'jottings') {
    return <Jottings />;
  }
  if (type === 'todo') {
    return <TodoList />;
  }
  return null;
};

export default AppMain;
