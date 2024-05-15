import React from 'react';
import ActivityLayout from '../layouts/ActivityLayout';
import { Anchor, Breadcrumbs, Button, Group, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconRecycle } from '@tabler/icons-react';
import FlexGrow from '../miscs/FlexGrow';

const DirRecycle: React.FC = () => {
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Breadcrumbs>
          <></>
          <Anchor to={'/d/recycle}'} component={Link} c="blue">
            Recycle Bin
          </Anchor>
        </Breadcrumbs>
      }
    >
      <Stack mb={'lg'}>
        <Group>
          <IconRecycle size={32} />
          <Text size={'32px'}>Recycle Bin</Text>
          <FlexGrow />
          <Button color="red" variant="outline">
            Clear All
          </Button>
        </Group>
      </Stack>
    </ActivityLayout>
  );
};

export default DirRecycle;
