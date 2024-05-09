import React from 'react';
import { NavLink, Stack, Text } from '@mantine/core';
import {
  IconListCheck,
  IconBulb,
  IconBrandHipchat,
  IconSettings,
} from '@tabler/icons-react';
import NoteTree from '../NoteTree';
import styles from './styles.module.css';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const buttonProps = {
  color: 'gray',
};
const iconProps = {
  size: '1rem',
  stroke: 1.5,
};

const NavBar: React.FC<{}> = () => {
  const { type } = useGlobalStore((s) => s.activity);
  const { setActivity } = useGlobalStore((s) => s.actions);
  return (
    <Stack gap="xs" style={{ overflow: 'auto' }} className={styles.root}>
      <Text c="dimmed" fw={700}>
        Tools
      </Text>
      <Stack gap="0" pt={8} pb={8}>
        <NavLink
          active={type === 'jottings'}
          onClick={() => setActivity('jottings')}
          {...buttonProps}
          leftSection={<IconBulb {...iconProps} />}
          label="Jottings"
        />
        <NavLink
          active={type === 'todo'}
          onClick={() => setActivity('todo')}
          {...buttonProps}
          leftSection={<IconListCheck {...iconProps} />}
          label=" To-Do List"
        />
        <NavLink
          active={type === 'ai'}
          onClick={() => setActivity('ai')}
          {...buttonProps}
          leftSection={<IconBrandHipchat {...iconProps} />}
          label="AI Assistant"
        />
        <NavLink
          active={type === 'settings'}
          onClick={() => setActivity('settings')}
          {...buttonProps}
          leftSection={<IconSettings {...iconProps} />}
          label="Settings"
        />
      </Stack>
      <Text c="dimmed" fw={700}>
        Notes
      </Text>
      <NoteTree />
    </Stack>
  );
};

export default NavBar;
