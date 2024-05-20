import React from 'react';
import {
  IconBulb,
  IconFile,
  IconListCheck,
  IconRobot,
  IconSettings,
  IconTools,
  IconTerminal2,
  IconNetwork,
} from '@tabler/icons-react';
import TodoList from './TodoList';
import Jottings from './Jottings';
import FileDrop from './FileDrop';
import Settings from './Settings';
import NetworkTest from './NetworkTest';

// The registere table of activities
export const activityRegister: Record<
  string,
  | { name: string; renderer: React.FC | null; icon: typeof IconTools }
  | undefined
> = {
  tools: { name: 'Tools', renderer: null, icon: IconTools },
  jottings: {
    name: 'Jottings',
    renderer: Jottings,
    icon: IconBulb,
  },
  todo: {
    name: 'To-Do List',
    renderer: TodoList,
    icon: IconListCheck,
  },
  fileDrop: {
    name: 'File Drop',
    renderer: FileDrop,
    icon: IconFile,
  },
  ai: {
    name: 'AI Assistant',
    renderer: null,
    icon: IconRobot,
  },
  system: {
    name: 'System',
    renderer: null,
    icon: IconTerminal2,
  },
  settings: {
    name: 'Settings',
    renderer: Settings,
    icon: IconSettings,
  },
  networkTest: {
    name: 'Network Test',
    renderer: NetworkTest,
    icon: IconNetwork,
  },
};
