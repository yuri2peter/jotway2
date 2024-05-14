import { Button, List, Stack, Text } from '@mantine/core';
import React from 'react';
import { APP_NAME } from 'src/common/config';
import ActivityLayout from 'src/renderer/components/layouts/ActivityLayout';

const PageHome: React.FC<{}> = () => {
  return (
    <ActivityLayout header={<Text>Home / Welcome</Text>} maxWidth={600}>
      <Stack gap="lg">
        <Text size="32px">{APP_NAME}</Text>
        <Text c="gray">Your persnal assistant and knowledge base.</Text>
        <List type="ordered">
          <List.Item>Useful tools for daliy tasks</List.Item>
          <List.Item>Take notes with markdown</List.Item>
          <List.Item>Manage browser bookmarks</List.Item>
          <List.Item>Integrate with powerful AI support</List.Item>
        </List>
        <Button
          w="150px"
          mt={'md'}
          component="a"
          href="https://github.com/yuri2peter/jotway2"
          target="_blank"
        >
          Learn more
        </Button>
      </Stack>
    </ActivityLayout>
  );
};

export default PageHome;
