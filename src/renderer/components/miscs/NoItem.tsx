import React from 'react';
import ActivityLayout from '../layouts/ActivityLayout';
import { Group, Stack, Text } from '@mantine/core';

const NoItem: React.FC<{}> = () => {
  return (
    <ActivityLayout maxWidth={500}>
      <Stack mb={'xl'}>
        <Group>
          <Text size={'32px'}>Not Found</Text>
        </Group>
        <Text>
          Object you are trying to open does not exist. You may have mistyped
          the address, or the object has been moved.
        </Text>
      </Stack>
    </ActivityLayout>
  );
};

export default NoItem;
