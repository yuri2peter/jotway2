import React from 'react';
import { AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../Header';
import NavBar from '../Navbar';
import TodoList from '../TodoList';

const MyAppShell: React.FC<{}> = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" style={{ overflow: 'auto' }}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="dimmed"
          />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavBar />
      </AppShell.Navbar>
      <AppShell.Main style={{ height: '100dvh', overflow: 'hidden' }}>
        <TodoList />
      </AppShell.Main>
    </AppShell>
  );
};

export default MyAppShell;
