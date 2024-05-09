import { Stack, Breadcrumbs, Group, Text } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';
import React from 'react';
import ActivityLayout from 'src/renderer/components/layouts/ActivityLayout';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import Editor from './Editor';

const Jottings: React.FC<{}> = () => {
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Stack gap={'xl'}>
          <Breadcrumbs>
            <Text c="gray">Tools</Text>
            <Text>Jottings</Text>
          </Breadcrumbs>
        </Stack>
      }
    >
      <Group mb={'lg'}>
        <IconBulb size={32} />
        <Text size={'32px'}>Jottings</Text>
        <FlexGrow />
      </Group>
      <Editor />
    </ActivityLayout>
  );
};

export default Jottings;
