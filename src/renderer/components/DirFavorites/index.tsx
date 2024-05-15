import React from 'react';
import ActivityLayout from '../layouts/ActivityLayout';
import { Anchor, Breadcrumbs, Group, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconStar } from '@tabler/icons-react';
import FlexGrow from '../miscs/FlexGrow';

const DirFavorites: React.FC = () => {
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Breadcrumbs>
          <></>
          <Anchor to={'/d/favorites'} component={Link} c="blue">
            Favorites
          </Anchor>
        </Breadcrumbs>
      }
    >
      <Stack mb={'lg'}>
        <Group>
          <IconStar size={32} />
          <Text size={'32px'}>Favorites</Text>
          <FlexGrow />
        </Group>
      </Stack>
    </ActivityLayout>
  );
};

export default DirFavorites;
