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

const buttonProps = {
  color: 'gray',
};
const iconProps = {
  size: '1rem',
  stroke: 1.5,
};

const NavBar: React.FC<{}> = () => {
  return (
    <Stack gap="xs" style={{ overflow: 'auto' }} className={styles.root}>
      <Text c="dimmed" fw={700}>
        Tools
      </Text>
      <Stack gap="0" pt={8} pb={8}>
        <NavLink
          {...buttonProps}
          leftSection={<IconBulb {...iconProps} />}
          label="Jottings"
        />
        <NavLink
          active
          {...buttonProps}
          leftSection={<IconListCheck {...iconProps} />}
          label=" To-Do List"
        />
        <NavLink
          {...buttonProps}
          leftSection={<IconBrandHipchat {...iconProps} />}
          label="AI Assistant"
        />
        <NavLink
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
