import React from 'react';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import Jottings from '../Jottings';
import TodoList from '../TodoList';
import FileDrop from '../FileDrop';

const AppMain: React.FC<{}> = () => {
  const { type } = useGlobalStore((s) => s.activity);
  if (type === 'jottings') {
    return <Jottings />;
  }
  if (type === 'todo') {
    return <TodoList />;
  }
  if (type === 'fileDrop') {
    return <FileDrop />;
  }
  return null;
};

export default AppMain;
